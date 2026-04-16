"""SmartAssist AI - FastAPI application.

Hlavní vstupní bod aplikace. Obsluhuje API endpointy pro chatbot,
správu konverzací a integraci se Zendesk.
"""

import json
import logging
import uuid
from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from smartassist.agent import SmartAssistAgent
from smartassist.config import get_settings
from smartassist.knowledge.retriever import QdrantRetriever

logger = logging.getLogger(__name__)

settings = get_settings()
agent: SmartAssistAgent | None = None
retriever: QdrantRetriever | None = None


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None]:
    """Application lifespan - initialize and cleanup resources."""
    global agent, retriever

    logging.basicConfig(level=getattr(logging, settings.log_level.upper()))
    logger.info("Starting SmartAssist AI v0.3.0")

    # Initialize Qdrant retriever
    try:
        retriever = QdrantRetriever(
            collection_name=settings.qdrant_collection,
            qdrant_url=settings.qdrant_url,
            openai_api_key=settings.openai_api_key,
            in_memory=settings.qdrant_in_memory,
        )
        await retriever.ensure_collection(vector_size=settings.embedding_dimensions)
        logger.info("Qdrant collection '%s' ready", settings.qdrant_collection)
    except Exception:
        logger.exception("Failed to initialize Qdrant - RAG will not be available")
        retriever = None

    # Initialize the AI agent
    try:
        agent = SmartAssistAgent(
            model_name=settings.model_name,
            retriever=retriever,
        )
        logger.info("SmartAssist agent initialized with model: %s", settings.model_name)
    except Exception:
        logger.warning("Failed to initialize AI agent (missing API key?) - chat will return mock responses")
        agent = None

    yield

    # Cleanup
    logger.info("Shutting down SmartAssist AI")
    if retriever:
        retriever.close()


app = FastAPI(
    title="SmartAssist AI",
    description="Intelligent customer support chatbot for NovaTech",
    version="0.3.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Models ---


class ChatMessage(BaseModel):
    """Incoming chat message from user."""

    message: str
    conversation_id: str | None = None
    language: str = "cs"


class HealthResponse(BaseModel):
    """Health check response."""

    status: str
    version: str
    qdrant_connected: bool
    agent_ready: bool


# --- Endpoints ---


@app.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """Health check endpoint for monitoring and load balancer."""
    return HealthResponse(
        status="ok",
        version="0.3.0",
        qdrant_connected=retriever is not None,
        agent_ready=agent is not None,
    )


async def _generate_sse_response(message: str, conversation_id: str) -> AsyncGenerator[str]:
    """Generate SSE stream for chat response.

    Streams tokens from the agent as Server-Sent Events.
    """
    try:
        if agent is None:
            yield f"data: {json.dumps({'error': 'Agent not initialized'})}\n\n"
            return

        # Stream response from agent
        full_response = ""
        async for token in agent.stream_response(message):
            full_response += token
            event_data = json.dumps(
                {
                    "token": token,
                    "conversation_id": conversation_id,
                    "done": False,
                }
            )
            yield f"data: {event_data}\n\n"

        # Send completion event
        done_data = json.dumps(
            {
                "token": "",
                "conversation_id": conversation_id,
                "done": True,
                "full_response": full_response,
            }
        )
        yield f"data: {done_data}\n\n"

    except Exception as e:
        logger.exception("Error generating response")
        error_data = json.dumps({"error": str(e), "conversation_id": conversation_id})
        yield f"data: {error_data}\n\n"


@app.post("/api/chat")
async def chat(request: ChatMessage) -> StreamingResponse:
    """Chat endpoint with SSE streaming.

    Accepts a user message and streams back the AI response
    token by token using Server-Sent Events.
    """
    conversation_id = request.conversation_id or str(uuid.uuid4())

    logger.info(
        "Chat request: conversation=%s, lang=%s, message_length=%d",
        conversation_id,
        request.language,
        len(request.message),
    )

    return StreamingResponse(
        _generate_sse_response(request.message, conversation_id),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Conversation-ID": conversation_id,
        },
    )


@app.get("/api/conversations")
async def list_conversations() -> list[dict]:
    """List recent conversations.

    Returns mock data for now - conversation persistence
    will be implemented with PostgreSQL in Sprint 3.
    """
    # TODO: Napojit na databázi - zatím vracíme mock data
    # Plán: PostgreSQL + SQLAlchemy, Sprint 3 (duben)
    return [
        {
            "id": "conv-001",
            "started_at": "2026-04-10T10:30:00Z",
            "last_message_at": "2026-04-10T10:35:22Z",
            "message_count": 6,
            "status": "resolved",
            "summary": "Dotaz na stav objednávky #NT-2024-1582",
            "language": "cs",
        },
        {
            "id": "conv-002",
            "started_at": "2026-04-10T11:02:00Z",
            "last_message_at": "2026-04-10T11:08:45Z",
            "message_count": 4,
            "status": "escalated",
            "summary": "Reklamace - nefunkční notebook po 2 týdnech",
            "language": "cs",
        },
        {
            "id": "conv-003",
            "started_at": "2026-04-10T14:15:00Z",
            "last_message_at": "2026-04-10T14:16:30Z",
            "message_count": 2,
            "status": "open",
            "summary": "Question about international shipping to Germany",
            "language": "en",
        },
    ]


# Static files for frontend SPA
_frontend_dist = Path(__file__).parent / "frontend" / "dist"
if _frontend_dist.exists():
    app.mount("/", StaticFiles(directory=str(_frontend_dist), html=True), name="frontend")
else:

    @app.get("/")
    async def root() -> dict:
        """Root endpoint - frontend not built yet."""
        return {
            "message": "SmartAssist AI API is running. Frontend not built yet.",
            "docs": "/docs",
            "health": "/health",
        }

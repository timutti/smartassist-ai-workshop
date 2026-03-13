"""SmartAssist AI chatbot agent.

Wraps PydanticAI to provide an intelligent customer support agent
for NovaTech e-shop. Uses RAG to retrieve relevant knowledge base
articles before generating responses.
"""

import logging
from collections.abc import AsyncIterator

from pydantic_ai import Agent

from smartassist.knowledge.retriever import QdrantRetriever

logger = logging.getLogger(__name__)

# System prompt pro NovaTech support chatbot
SYSTEM_PROMPT = """\
Jsi SmartAssist, inteligentní zákaznický asistent pro NovaTech - český e-shop \
s elektronikou a příslušenstvím.

Tvoje hlavní úkoly:
1. Odpovídat na dotazy zákazníků ohledně produktů, objednávek a reklamací
2. Pomáhat s řešením technických problémů
3. Eskalovat složité případy na lidského operátora

Pravidla:
- Odpovídej v jazyce, ve kterém se zákazník ptá (primárně čeština)
- Buď zdvořilý, profesionální a vstřícný
- Pokud si nejsi jistý, raději eskaluj na operátora než abys dal špatnou odpověď
- Nikdy nevymýšlej informace o produktech - používej pouze poskytnutý kontext
- U objednávek a reklamací vždy požádej o číslo objednávky

Kontext z knowledge base (pokud je k dispozici) bude přidán ke každé zprávě.
"""

# TODO: Implement conversation memory - currently each message is independent
# TODO: Add confidence scoring - client wants to know when bot isn't sure
# TODO: Implementovat eskalační logiku - pokud bot 2x neodpoví, předat operátorovi


class SmartAssistAgent:
    """Customer support agent powered by PydanticAI.

    Combines LLM capabilities with RAG retrieval from the knowledge base
    to provide accurate, context-aware responses.
    """

    def __init__(
        self,
        model_name: str = "claude-sonnet-4-6",
        retriever: QdrantRetriever | None = None,
    ) -> None:
        self.model_name = model_name
        self.retriever = retriever

        self.agent = Agent(
            model=model_name,
            system_prompt=SYSTEM_PROMPT,
        )

        logger.info("SmartAssistAgent initialized with model=%s", model_name)

    async def _retrieve_context(self, query: str) -> str:
        """Retrieve relevant knowledge base articles for the query.

        Returns formatted context string to inject into the prompt.
        """
        if self.retriever is None:
            logger.warning("No retriever available - responding without RAG context")
            return ""

        try:
            results = await self.retriever.search(query, top_k=5)
            if not results:
                return ""

            context_parts = []
            for i, result in enumerate(results, 1):
                context_parts.append(
                    f"[Dokument {i}] (relevance: {result['score']:.2f})\n{result['text']}"
                )

            context = "\n\n---\n\n".join(context_parts)
            logger.debug("Retrieved %d context documents for query", len(results))
            return context

        except Exception:
            logger.exception("Failed to retrieve context")
            return ""

    def _build_user_message(self, message: str, context: str) -> str:
        """Build the full user message with RAG context."""
        if context:
            return (
                f"Kontext z knowledge base:\n{context}\n\n"
                f"---\n\n"
                f"Zpráva zákazníka: {message}"
            )
        return f"Zpráva zákazníka: {message}"

    async def get_response(self, message: str) -> str:
        """Get a complete response for a user message.

        Retrieves context from knowledge base and generates response.
        """
        context = await self._retrieve_context(message)
        full_message = self._build_user_message(message, context)

        result = await self.agent.run(full_message)
        return result.output

    async def stream_response(self, message: str) -> AsyncIterator[str]:
        """Stream response tokens for a user message.

        Used by the SSE endpoint for real-time streaming to the frontend.
        """
        context = await self._retrieve_context(message)
        full_message = self._build_user_message(message, context)

        async with self.agent.run_stream(full_message) as stream:
            async for token in stream.stream_text(delta=True):
                yield token

    # TODO: Add method to detect when escalation is needed
    # Návrh: pokud confidence < 0.3, nebo pokud uživatel 2x řekne "chci mluvit s operátorem"
    # Viz ticket SMART-42

    # TODO: Implement feedback loop - store user ratings for responses
    # Klient chce dashboard s metrikami (CSAT, resolution rate)
    # Zatím nemáme databázi na konverzace - Sprint 3

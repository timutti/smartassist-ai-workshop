"""Tests for SmartAssist AI API endpoints.

Testuje HTTP endpointy - health check, chat, konverzace.
"""

# TODO: Chybí testy pro Zendesk endpointy
# TODO: Chybí testy pro admin dashboard API
# TODO: Zátěžové testy - SLA vyžaduje 200+ dotazů/min
# TODO: Testy pro WebSocket endpoint (pokud se rozhodneme SSE nahradit za WS)

from unittest.mock import AsyncMock, MagicMock, patch

import pytest
from fastapi.testclient import TestClient


@pytest.fixture
def client() -> TestClient:
    """Create a test client with mocked dependencies."""
    # Patch agent and retriever before importing app
    with (
        patch("smartassist.main.QdrantRetriever") as mock_retriever_cls,
        patch("smartassist.main.SmartAssistAgent") as mock_agent_cls,
    ):
        mock_retriever = AsyncMock()
        mock_retriever.ensure_collection = AsyncMock()
        mock_retriever.close = MagicMock()
        mock_retriever_cls.return_value = mock_retriever

        mock_agent = MagicMock()
        mock_agent_cls.return_value = mock_agent

        from smartassist.main import app

        with TestClient(app) as test_client:
            yield test_client


def test_health_check(client: TestClient) -> None:
    """Test that health endpoint returns correct status."""
    response = client.get("/health")
    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "ok"
    assert data["version"] == "0.3.0"
    assert "qdrant_connected" in data
    assert "agent_ready" in data


def test_chat_endpoint(client: TestClient) -> None:
    """Test that chat endpoint accepts messages and returns SSE stream."""
    with patch("smartassist.main.agent") as mock_agent:
        # Mock the streaming response
        async def mock_stream(message: str):
            for token in ["Dobrý ", "den, ", "jak ", "vám ", "mohu ", "pomoci?"]:
                yield token

        mock_agent.stream_response = mock_stream

        response = client.post(
            "/api/chat",
            json={"message": "Ahoj", "language": "cs"},
        )

        assert response.status_code == 200
        assert response.headers["content-type"].startswith("text/event-stream")

        # Verify we got SSE data
        content = response.text
        assert "data:" in content


def test_chat_endpoint_with_conversation_id(client: TestClient) -> None:
    """Test that chat endpoint preserves conversation ID."""
    with patch("smartassist.main.agent") as mock_agent:
        async def mock_stream(message: str):
            yield "OK"

        mock_agent.stream_response = mock_stream

        response = client.post(
            "/api/chat",
            json={
                "message": "Test",
                "conversation_id": "conv-test-123",
                "language": "cs",
            },
        )

        assert response.status_code == 200
        assert response.headers.get("x-conversation-id") == "conv-test-123"


def test_conversations_list(client: TestClient) -> None:
    """Test that conversations endpoint returns list of conversations."""
    response = client.get("/api/conversations")

    assert response.status_code == 200

    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0

    # Check structure of first conversation
    conv = data[0]
    assert "id" in conv
    assert "started_at" in conv
    assert "status" in conv
    assert "message_count" in conv
    assert conv["status"] in ("open", "resolved", "escalated")


def test_chat_endpoint_missing_message(client: TestClient) -> None:
    """Test that chat endpoint validates required fields."""
    response = client.post("/api/chat", json={})
    assert response.status_code == 422  # Validation error

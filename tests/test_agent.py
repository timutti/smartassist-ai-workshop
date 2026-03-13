"""Tests for SmartAssist AI agent.

Testuje základní funkčnost chatbot agenta - generování odpovědí,
práci s kontextem a okrajové případy.
"""

from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from smartassist.agent import SmartAssistAgent


@pytest.fixture
def mock_retriever() -> AsyncMock:
    """Create a mock retriever that returns sample documents."""
    retriever = AsyncMock()
    retriever.search.return_value = [
        {
            "text": "NovaTech ProBook 15 - cena 24 990 Kč, procesor Intel Core i7, 16 GB RAM",
            "filename": "produkty.md",
            "score": 0.92,
        },
        {
            "text": "Záruka 24 měsíců na všechny produkty. Rozšířená záruka Care+ dostupná.",
            "filename": "produkty.md",
            "score": 0.78,
        },
    ]
    return retriever


@pytest.fixture
def agent_without_retriever() -> SmartAssistAgent:
    """Create an agent without RAG retriever."""
    return SmartAssistAgent(model_name="test", retriever=None)


@pytest.fixture
def agent_with_retriever(mock_retriever: AsyncMock) -> SmartAssistAgent:
    """Create an agent with mock retriever."""
    return SmartAssistAgent(model_name="test", retriever=mock_retriever)


@pytest.mark.asyncio
async def test_agent_responds(agent_without_retriever: SmartAssistAgent) -> None:
    """Test that agent can generate a basic response."""
    with patch.object(agent_without_retriever.agent, "run", new_callable=AsyncMock) as mock_run:
        mock_result = MagicMock()
        mock_result.output = "Dobrý den, jak vám mohu pomoci?"
        mock_run.return_value = mock_result

        response = await agent_without_retriever.get_response("Ahoj")

        assert response is not None
        assert len(response) > 0
        assert isinstance(response, str)
        mock_run.assert_called_once()


@pytest.mark.asyncio
async def test_agent_uses_context(agent_with_retriever: SmartAssistAgent, mock_retriever: AsyncMock) -> None:
    """Test that agent retrieves and uses knowledge base context."""
    with patch.object(agent_with_retriever.agent, "run", new_callable=AsyncMock) as mock_run:
        mock_result = MagicMock()
        mock_result.output = "NovaTech ProBook 15 stojí 24 990 Kč a má procesor Intel Core i7."
        mock_run.return_value = mock_result

        response = await agent_with_retriever.get_response("Kolik stojí ProBook?")

        # Verify retriever was called
        mock_retriever.search.assert_called_once_with("Kolik stojí ProBook?", top_k=5)

        # Verify context was included in the message
        call_args = mock_run.call_args[0][0]
        assert "knowledge base" in call_args.lower() or "Kontext" in call_args
        assert "ProBook" in call_args


@pytest.mark.asyncio
async def test_agent_handles_unknown(agent_with_retriever: SmartAssistAgent, mock_retriever: AsyncMock) -> None:
    """Test that agent properly handles questions it can't answer.

    When the retriever returns no relevant results (low scores),
    the agent should indicate uncertainty and offer to escalate.

    FIXME: This test fails because confidence scoring is not implemented yet.
    The agent currently responds even when it has no relevant context,
    without indicating uncertainty. See TODO in agent.py.
    """
    # Simulate no relevant results
    mock_retriever.search.return_value = []

    with patch.object(agent_with_retriever.agent, "run", new_callable=AsyncMock) as mock_run:
        mock_result = MagicMock()
        # Agent currently doesn't indicate uncertainty - it just responds normally
        mock_result.output = "Bohužel k tomu nemám informace."
        mock_run.return_value = mock_result

        response = await agent_with_retriever.get_response(
            "Jaké máte podmínky pro velkoobchodní odběratele v Japonsku?"
        )

        # This assertion fails because the agent doesn't add confidence metadata
        # When confidence scoring is implemented, response should contain
        # an indication that the bot is not confident in its answer
        assert hasattr(mock_result, "confidence_score"), (
            "Agent should return confidence score with response. "
            "Confidence scoring not yet implemented - see SMART-42."
        )
        assert mock_result.confidence_score < 0.5


@pytest.mark.asyncio
async def test_agent_multilang(agent_with_retriever: SmartAssistAgent, mock_retriever: AsyncMock) -> None:
    """Test that agent responds in the language of the user's message.

    When user writes in English, agent should respond in English.
    Knowledge base is in Czech, so translation or cross-lingual
    retrieval must work.

    FIXME: This test fails because multilingual support is not fully implemented.
    See src/smartassist/integrations/multilang.py for current status.
    """
    with patch.object(agent_with_retriever.agent, "run", new_callable=AsyncMock) as mock_run:
        mock_result = MagicMock()
        mock_result.output = "The NovaTech ProBook 15 costs 24,990 CZK."
        mock_run.return_value = mock_result

        response = await agent_with_retriever.get_response(
            "How much does the ProBook cost?"
        )

        # Verify the response is in English
        # This is a basic heuristic - check for English words
        assert response is not None

        # FIXME: Language detection should be applied to the response
        # to verify it matches the input language. Currently there's no
        # mechanism to enforce response language.
        from smartassist.integrations.multilang import detect_language

        detected_lang = detect_language(response)
        assert detected_lang == "en", (
            f"Expected English response, but detected '{detected_lang}'. "
            f"Response: {response[:100]}. "
            "Multilingual response enforcement not implemented."
        )

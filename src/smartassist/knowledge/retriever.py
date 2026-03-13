"""RAG retriever for SmartAssist knowledge base.

Searches Qdrant for documents relevant to the user's query
using semantic similarity via OpenAI embeddings.
"""

import logging

from openai import AsyncOpenAI
from qdrant_client import AsyncQdrantClient, models

logger = logging.getLogger(__name__)


class QdrantRetriever:
    """Retrieves relevant knowledge base documents from Qdrant.

    Used by the SmartAssistAgent to provide RAG context
    for generating accurate customer support responses.
    """

    def __init__(
        self,
        collection_name: str,
        qdrant_url: str = "http://localhost:6333",
        openai_api_key: str = "",
        embedding_model: str = "text-embedding-3-small",
        in_memory: bool = True,
    ) -> None:
        self.collection_name = collection_name
        self.embedding_model = embedding_model

        if in_memory:
            self.qdrant = AsyncQdrantClient(location=":memory:")
        else:
            self.qdrant = AsyncQdrantClient(url=qdrant_url)

        self.openai = AsyncOpenAI(api_key=openai_api_key)

    async def ensure_collection(self, vector_size: int = 1536) -> None:
        """Create the Qdrant collection if it doesn't exist."""
        collections = await self.qdrant.get_collections()
        existing = [c.name for c in collections.collections]

        if self.collection_name not in existing:
            await self.qdrant.create_collection(
                collection_name=self.collection_name,
                vectors_config=models.VectorParams(
                    size=vector_size,
                    distance=models.Distance.COSINE,
                ),
            )
            logger.info("Created collection: %s (vector_size=%d)", self.collection_name, vector_size)

    async def _get_query_embedding(self, query: str) -> list[float]:
        """Generate embedding for a search query."""
        response = await self.openai.embeddings.create(
            model=self.embedding_model,
            input=query,
        )
        return response.data[0].embedding

    async def search(self, query: str, top_k: int = 5) -> list[dict]:
        """Search for relevant documents.

        Args:
            query: User's question or search query.
            top_k: Number of results to return.

        Returns:
            List of dicts with 'text', 'filename', 'score' keys,
            sorted by relevance (highest first).
        """
        try:
            query_embedding = await self._get_query_embedding(query)

            results = await self.qdrant.query_points(
                collection_name=self.collection_name,
                query=query_embedding,
                limit=top_k,
                with_payload=True,
            )

            documents = []
            for point in results.points:
                documents.append({
                    "text": point.payload.get("text", ""),
                    "filename": point.payload.get("filename", ""),
                    "score": point.score,
                })

            logger.debug("Search returned %d results for query: %s", len(documents), query[:80])
            return documents

        except Exception:
            logger.exception("Search failed for query: %s", query[:80])
            return []

    def close(self) -> None:
        """Close the Qdrant client connection."""
        # AsyncQdrantClient handles cleanup internally
        pass

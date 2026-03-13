"""Document indexer for the SmartAssist knowledge base.

Reads documents from the knowledge/documents/ directory, chunks them,
generates embeddings via OpenAI, and stores them in Qdrant.
"""

# FIXME: Klient dodal dokumenty v 3 různých formátech (PDF, Word, HTML) - zatím řešíme jen .md a .txt

import logging
import uuid
from pathlib import Path

from openai import AsyncOpenAI
from qdrant_client import AsyncQdrantClient, models

logger = logging.getLogger(__name__)

DOCUMENTS_DIR = Path(__file__).parent / "documents"


class DocumentIndexer:
    """Indexes knowledge base documents into Qdrant.

    Workflow:
    1. Read .md and .txt files from the documents directory
    2. Split into overlapping chunks
    3. Generate embeddings via OpenAI text-embedding-3-small
    4. Upsert into Qdrant collection
    """

    def __init__(
        self,
        collection_name: str,
        qdrant_url: str = "http://localhost:6333",
        openai_api_key: str = "",
        embedding_model: str = "text-embedding-3-small",
        chunk_size: int = 512,
        chunk_overlap: int = 64,
        in_memory: bool = True,
    ) -> None:
        self.collection_name = collection_name
        self.embedding_model = embedding_model
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap

        if in_memory:
            self.qdrant = AsyncQdrantClient(location=":memory:")
        else:
            self.qdrant = AsyncQdrantClient(url=qdrant_url)

        self.openai = AsyncOpenAI(api_key=openai_api_key)

    def _read_documents(self, directory: Path | None = None) -> list[dict]:
        """Read all supported documents from the directory.

        Returns list of dicts with 'filename', 'content', and 'path' keys.
        """
        doc_dir = directory or DOCUMENTS_DIR
        documents = []

        if not doc_dir.exists():
            logger.warning("Documents directory does not exist: %s", doc_dir)
            return documents

        supported_extensions = {".md", ".txt"}

        for file_path in sorted(doc_dir.iterdir()):
            if file_path.suffix.lower() in supported_extensions:
                try:
                    content = file_path.read_text(encoding="utf-8")
                    documents.append({
                        "filename": file_path.name,
                        "content": content,
                        "path": str(file_path),
                    })
                    logger.info("Read document: %s (%d chars)", file_path.name, len(content))
                except Exception:
                    logger.exception("Failed to read document: %s", file_path.name)

        logger.info("Read %d documents from %s", len(documents), doc_dir)
        return documents

    def _chunk_text(self, text: str, filename: str = "") -> list[dict]:
        """Split text into overlapping chunks.

        Uses simple character-based chunking with overlap.
        Tries to break at paragraph boundaries when possible.
        """
        chunks = []
        start = 0
        text_length = len(text)

        while start < text_length:
            end = min(start + self.chunk_size, text_length)

            # Try to break at a paragraph boundary
            if end < text_length:
                # Look for double newline near the end of chunk
                paragraph_break = text.rfind("\n\n", start + self.chunk_size // 2, end)
                if paragraph_break != -1:
                    end = paragraph_break + 2

            chunk_text = text[start:end].strip()
            if chunk_text:
                chunks.append({
                    "text": chunk_text,
                    "filename": filename,
                    "start_char": start,
                    "end_char": end,
                })

            start = end - self.chunk_overlap
            if start >= text_length:
                break

        return chunks

    async def _generate_embeddings(self, texts: list[str]) -> list[list[float]]:
        """Generate embeddings for a batch of texts via OpenAI API."""
        response = await self.openai.embeddings.create(
            model=self.embedding_model,
            input=texts,
        )
        return [item.embedding for item in response.data]

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
            logger.info("Created Qdrant collection: %s", self.collection_name)
        else:
            logger.info("Qdrant collection already exists: %s", self.collection_name)

    async def index_documents(self, directory: Path | None = None, batch_size: int = 32) -> int:
        """Index all documents from the directory into Qdrant.

        Returns the number of indexed chunks.
        """
        documents = self._read_documents(directory)
        if not documents:
            logger.warning("No documents found to index")
            return 0

        # Chunk all documents
        all_chunks = []
        for doc in documents:
            chunks = self._chunk_text(doc["content"], doc["filename"])
            all_chunks.extend(chunks)

        logger.info("Created %d chunks from %d documents", len(all_chunks), len(documents))

        # Process in batches
        total_indexed = 0
        for i in range(0, len(all_chunks), batch_size):
            batch = all_chunks[i : i + batch_size]
            texts = [chunk["text"] for chunk in batch]

            # Generate embeddings
            embeddings = await self._generate_embeddings(texts)

            # Prepare points for Qdrant
            points = [
                models.PointStruct(
                    id=str(uuid.uuid4()),
                    vector=embedding,
                    payload={
                        "text": chunk["text"],
                        "filename": chunk["filename"],
                        "start_char": chunk["start_char"],
                        "end_char": chunk["end_char"],
                    },
                )
                for chunk, embedding in zip(batch, embeddings, strict=True)
            ]

            # Upsert into Qdrant
            await self.qdrant.upsert(
                collection_name=self.collection_name,
                points=points,
            )

            total_indexed += len(points)
            logger.info("Indexed batch %d-%d (%d chunks)", i, i + len(batch), len(batch))

        logger.info("Indexing complete: %d total chunks indexed", total_indexed)
        return total_indexed

    def close(self) -> None:
        """Close the Qdrant client connection."""
        # AsyncQdrantClient handles cleanup internally
        pass

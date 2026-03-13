"""Application configuration using pydantic-settings.

Loads settings from environment variables and .env file.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """SmartAssist AI application settings."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # OpenAI
    openai_api_key: str = "sk-placeholder"
    embedding_model: str = "text-embedding-3-small"
    embedding_dimensions: int = 1536

    # LLM
    model_name: str = "claude-sonnet-4-6"

    # Qdrant
    qdrant_url: str = "http://localhost:6333"
    qdrant_collection: str = "smartassist"
    qdrant_in_memory: bool = True  # Dev mode - in-memory, no persistence

    # RAG
    retriever_top_k: int = 5
    chunk_size: int = 512
    chunk_overlap: int = 64

    # Zendesk (optional)
    zendesk_subdomain: str | None = None
    zendesk_api_token: str | None = None
    zendesk_email: str | None = None

    # Salesforce CRM (optional, zatím neimplementováno)
    salesforce_client_id: str | None = None
    salesforce_client_secret: str | None = None
    salesforce_instance_url: str | None = None

    # Application
    log_level: str = "info"
    app_host: str = "0.0.0.0"
    app_port: int = 8000
    cors_origins: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    # Multilingual support
    default_language: str = "cs"
    supported_languages: list[str] = ["cs", "en"]


def get_settings() -> Settings:
    """Get application settings singleton."""
    return Settings()

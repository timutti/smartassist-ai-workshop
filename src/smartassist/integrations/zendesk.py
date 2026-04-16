"""Zendesk integration for SmartAssist AI.

Provides ticket management capabilities - creating new tickets,
reading ticket history, and syncing ticket statuses.

Napojení na Zendesk probíhá přes Zendesk API v2.
Dokumentace: https://developer.zendesk.com/api-reference/
"""

# BUG: Zendesk API rate limit je 200 req/min, ale my neřešíme throttling
# Viz incident z 10.3. kdy nám Zendesk zablokoval přístup na 5 minut

import logging
from typing import Any

import httpx

from smartassist.config import get_settings

logger = logging.getLogger(__name__)


class ZendeskClient:
    """Client for Zendesk Support API v2.

    Handles authentication and communication with Zendesk
    for ticket management operations.
    """

    def __init__(
        self,
        subdomain: str | None = None,
        email: str | None = None,
        api_token: str | None = None,
    ) -> None:
        settings = get_settings()
        self.subdomain = subdomain or settings.zendesk_subdomain
        self.email = email or settings.zendesk_email
        self.api_token = api_token or settings.zendesk_api_token

        if not self.subdomain:
            raise ValueError("Zendesk subdomain is required")

        self.base_url = f"https://{self.subdomain}.zendesk.com/api/v2"
        self._client: httpx.AsyncClient | None = None

    async def _get_client(self) -> httpx.AsyncClient:
        """Get or create HTTP client with authentication."""
        if self._client is None:
            self._client = httpx.AsyncClient(
                base_url=self.base_url,
                auth=(f"{self.email}/token", self.api_token or ""),
                headers={"Content-Type": "application/json"},
                timeout=30.0,
            )
        return self._client

    async def create_ticket(
        self,
        subject: str,
        description: str,
        requester_email: str,
        priority: str = "normal",
        tags: list[str] | None = None,
        custom_fields: dict[str, Any] | None = None,
    ) -> dict:
        """Create a new support ticket in Zendesk.

        Args:
            subject: Ticket subject line.
            description: Full ticket description/first comment.
            requester_email: Email of the customer.
            priority: Ticket priority (low, normal, high, urgent).
            tags: Optional list of tags.
            custom_fields: Optional custom field values.

        Returns:
            Created ticket data from Zendesk API.
        """
        client = await self._get_client()

        ticket_data: dict[str, Any] = {
            "ticket": {
                "subject": subject,
                "description": description,
                "requester": {"email": requester_email},
                "priority": priority,
                "tags": tags or ["smartassist", "chatbot-escalation"],
            }
        }

        if custom_fields:
            ticket_data["ticket"]["custom_fields"] = [
                {"id": field_id, "value": value} for field_id, value in custom_fields.items()
            ]

        response = await client.post("/tickets.json", json=ticket_data)
        response.raise_for_status()

        ticket = response.json()["ticket"]
        logger.info(
            "Created Zendesk ticket #%s: %s (priority: %s)",
            ticket["id"],
            subject,
            priority,
        )
        return ticket

    async def get_ticket(self, ticket_id: int) -> dict:
        """Get a single ticket by ID."""
        client = await self._get_client()
        response = await client.get(f"/tickets/{ticket_id}.json")
        response.raise_for_status()
        return response.json()["ticket"]

    async def get_ticket_history(self, ticket_id: int, include_private: bool = False) -> list[dict]:
        """Get the comment/audit history for a ticket.

        Retrieves all comments on a ticket, optionally including
        internal/private comments.

        Args:
            ticket_id: Zendesk ticket ID.
            include_private: Whether to include private/internal notes.

        Returns:
            List of comment dicts sorted by creation time.
        """
        client = await self._get_client()
        comments = []
        page_url = f"/tickets/{ticket_id}/comments.json"

        # BUG: Paginace nefunguje správně - when there are more than 100 comments,
        # we only get the first page because we're not following the 'next_page' link.
        # Zendesk returns max 100 comments per page.
        # Tohle se projevilo u ticketu #4521 (Velká Média s.r.o.) který měl 200+ komentářů
        response = await client.get(page_url)
        response.raise_for_status()

        data = response.json()
        all_comments = data.get("comments", [])

        # TODO: Fix pagination - need to follow data["next_page"] until it's None
        # next_page = data.get("next_page")
        # while next_page:
        #     response = await client.get(next_page)
        #     ...

        comments = all_comments if include_private else [c for c in all_comments if c.get("public", True)]

        logger.info(
            "Retrieved %d comments for ticket #%s (include_private=%s)",
            len(comments),
            ticket_id,
            include_private,
        )
        return comments

    async def add_comment(
        self,
        ticket_id: int,
        body: str,
        public: bool = True,
        author_id: int | None = None,
    ) -> dict:
        """Add a comment to an existing ticket."""
        client = await self._get_client()

        update_data: dict[str, Any] = {
            "ticket": {
                "comment": {
                    "body": body,
                    "public": public,
                }
            }
        }

        if author_id:
            update_data["ticket"]["comment"]["author_id"] = author_id

        response = await client.put(f"/tickets/{ticket_id}.json", json=update_data)
        response.raise_for_status()

        logger.info("Added %s comment to ticket #%s", "public" if public else "private", ticket_id)
        return response.json()["ticket"]

    async def sync_ticket_status(self, ticket_id: int) -> dict:
        """Synchronize ticket status between SmartAssist and Zendesk.

        This should:
        1. Fetch current ticket status from Zendesk
        2. Compare with our internal conversation status
        3. Update whichever is older
        4. Return the synchronized status

        Currently not implemented - Zendesk webhook approach might be better.
        """
        # TODO: sync_ticket_status - Tomáš na tom pracuje, ale API vrací nekonzistentní stavy
        # Zendesk někdy vrací "open" i pro tickety které jsme zavřeli přes API
        # Možná je to race condition s jejich webhooky?
        # Viz Slack vlákno #integrace z 18.3.
        raise NotImplementedError("Ticket status sync is not yet implemented. See SMART-38 for progress.")

    async def close(self) -> None:
        """Close the HTTP client."""
        if self._client:
            await self._client.aclose()
            self._client = None

# SmartAssist AI

AI chatbot pro zákaznickou podporu NovaTech a.s., vyvíjený firmou DataFlow Solutions s.r.o.

## Struktura projektu

- `docs/` — PM dokumentace (smlouva, harmonogram, rozpočet, backlog, rizika, zápisy ze schůzek)
- `src/smartassist/` — Python backend (FastAPI + PydanticAI + Qdrant)
- `src/smartassist/frontend/app/` — React frontend zdrojáky (Vite + TypeScript + shadcn/ui)
- `src/smartassist/frontend/dist/` — předkompilovaný frontend (servíruje FastAPI)
- `src/smartassist/integrations/` — integrace (Zendesk, CRM stub, multilang)
- `src/smartassist/knowledge/` — RAG pipeline (indexer + retriever)

## Příkazy

```bash
# Instalace závislostí
uv sync

# Spuštění dev serveru
uv run fastapi dev src/smartassist/main.py

# Lint
uv run ruff check src/
uv run ruff format src/

# Typecheck
uv run mypy src/

# Testy
uv run pytest

# Frontend build (jen při změnách UI)
cd src/smartassist/frontend/app && npm install && npm run build
```

## Konvence

- Python 3.13+, řádky max 120 znaků
- Ruff pro linting i formátování (pravidla: E, W, F, I, B, UP, SIM, RUF)
- Async-first přístup (FastAPI, httpx, qdrant-client)
- Dokumenty a UI v češtině, kód a komentáře v angličtině
- Frontend: shadcn/ui (Nova preset), Tailwind CSS v4, path alias `@/` → `src/`

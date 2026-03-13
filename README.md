# SmartAssist AI

AI chatbot pro zákaznickou podporu e-shopu **NovaTech a.s.**

Projekt vyvíjí **DataFlow Solutions s.r.o.** na zakázku. Chatbot odpovídá zákazníkům na dotazy ohledně produktů, objednávek a reklamací na základě firemní znalostní báze.

## Workshop: Vibecoding v project managementu

> **Situace:** Vedoucí projektu Martin Novák nečekaně onemocněl. Vy ho zastupujete. Dostali jste přístup k repozitáři projektu a musíte se rychle zorientovat.
>
> **Vaše úkoly:**
> 1. Pomocí AI se zorientujte v projektu — co je hotovo, co ne, kde jsou problémy
> 2. Vytvořte si přehled (dashboard) o stavu projektu
> 3. Připravte seznam úkolů pro další postup

### Co v projektu najdete

```
docs/               — Projektová dokumentace
  smlouva.md           Smlouva o dílo s klientem
  harmonogram.md       Plánovaný harmonogram
  rozpocet.md          Rozpočet a čerpání
  odhady-pracnosti.md  Odhady jednotlivých funkcí
  backlog.md           Seznam úkolů
  rizika.md            Registr rizik
  architektura.md      Technická architektura
  zapisy/              Zápisy ze schůzek s klientem

src/                — Zdrojový kód aplikace
tests/              — Testy
```

## Spuštění projektu

### 1. Nainstalujte uv (správce balíčků pro Python)

**macOS / Linux:**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Windows (PowerShell):**
```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### 2. Spusťte projekt

**macOS / Linux:**
```bash
./start.sh
```

**Windows:**
```
start.bat
```

Nebo ručně:
```bash
uv sync
uv run fastapi dev src/smartassist/main.py
```

Aplikace poběží na **http://localhost:8000**

### 3. Nastavení AI (volitelné)

Pro plnou funkčnost chatbota zkopírujte `.env.example` do `.env` a vyplňte API klíče:

```bash
cp .env.example .env
```

> **Poznámka:** Pro účely workshopu (analýza projektu pomocí AI) není nutné mít chatbot funkční. Stačí prozkoumat kód a dokumenty.

## Tech stack

- **Python 3.13** + **FastAPI**
- **PydanticAI** — AI agent framework
- **Qdrant** — vektorová databáze
- **React + shadcn/ui** — frontend (pre-built)
- **uv** — správce balíčků

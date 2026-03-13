# SmartAssist AI — Workshop projekt

## Situace

Je 17. března 2026. Váš kolega **Martin Novák**, projektový manažer ve firmě **DataFlow Solutions s.r.o.**, nečekaně onemocněl. Martin vedl projekt **SmartAssist AI** — inteligentní chatbot pro zákaznickou podporu e-shopu **NovaTech a.s.**

Vedení vás požádalo, abyste projekt dočasně převzali. Máte přístup k tomuto repozitáři — je to vše, co od Martina máte. Termín dodání se blíží a klient je nervózní.

## Vaše úkoly

1. **Zorientujte se v projektu** — pomocí AI nástrojů prozkoumejte dokumentaci i zdrojový kód. Co je hotovo? Co ne? Kde jsou problémy?
2. **Vytvořte si přehledový dashboard** — shrňte stav projektu tak, abyste ho mohli prezentovat vedení
3. **Připravte akční plán** — co je potřeba udělat jako první? Jaká rozhodnutí musíte udělat?

## Co v projektu najdete

```
docs/                       — Projektová dokumentace
  smlouva.md                   Smlouva o dílo s klientem NovaTech a.s.
  harmonogram.md               Harmonogram sprintů a milníků
  rozpocet.md                  Rozpočet projektu a čerpání
  odhady-pracnosti.md          Odhady pracnosti jednotlivých funkcí
  backlog.md                   Product backlog — co je hotovo, co zbývá
  rizika.md                    Registr rizik projektu
  architektura.md              Technická architektura řešení
  zapisy/                      Zápisy ze schůzek s klientem (5 zápisů)

src/                        — Zdrojový kód aplikace (Python + React)
```

## Tipy pro práci s AI

- Nechte AI přečíst a analyzovat všechny dokumenty najednou
- Ptejte se na konkrétní věci: *„Jaký je stav rozpočtu?"*, *„Jsou v projektu nějaká rizika, která nejsou v registru?"*
- Požádejte AI o porovnání informací mezi dokumenty — *„Odpovídá harmonogram tomu, co říkají zápisy ze schůzek?"*
- Nechte AI prozkoumat i zdrojový kód — *„V jakém stavu jsou jednotlivé moduly?"*

## Spuštění aplikace (volitelné)

Pro analýzu projektu **není nutné aplikaci spouštět** — stačí prozkoumat dokumenty a kód. Pokud ale chcete vidět frontend:

1. Nainstalujte [uv](https://docs.astral.sh/uv/) (správce balíčků pro Python):
   ```bash
   # macOS / Linux
   curl -LsSf https://astral.sh/uv/install.sh | sh

   # Windows (PowerShell)
   powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
   ```

2. Spusťte server:
   ```bash
   # macOS / Linux
   ./start.sh

   # Windows
   start.bat
   ```

3. Otevřete **http://localhost:8000**

## Tech stack

- **Python 3.13** + **FastAPI** — backend
- **PydanticAI** — AI agent framework
- **Qdrant** — vektorová databáze (in-memory)
- **React + TypeScript + shadcn/ui** — frontend (předkompilovaný)
- **uv** — správce balíčků a runtime

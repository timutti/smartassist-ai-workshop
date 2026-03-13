# SmartAssist AI — Workshop projekt

## Jak začít

**Varianta A — Stáhnout ZIP (nejjednodušší):**
1. Klikněte na [**Download ZIP**](https://github.com/timutti/smartassist-ai-workshop/archive/refs/heads/main.zip)
2. Rozbalte složku a otevřete ji ve svém AI nástroji (Cursor, VS Code, apod.)

**Varianta B — Klonovat přes terminál:**
```bash
git clone https://github.com/timutti/smartassist-ai-workshop.git
cd smartassist-ai-workshop
```

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

## Tipy a ukázkové prompty

Začněte tím, že AI nástroji řeknete, ať si přečte celý projekt. Pak se ptejte:

**Orientace v projektu:**
> *Přečti si všechny dokumenty v docs/ a zdrojový kód v src/. Shrň mi aktuální stav projektu — co je hotovo, co ne, a jaké vidíš problémy.*

**Dashboard pro vedení:**
> *Připrav mi přehledový dashboard o stavu projektu. Použij tabulky, traffic light indikátory (🟢🟡🔴) a stručné komentáře. Dashboard musí pokrývat harmonogram, rozpočet, rizika a stav deliverables.*

**Akční plán:**
> *Na základě analýzy projektu navrhni prioritizovaný akční plán — co musím vyřešit tento týden, co tento měsíc a co je strategické. Ke každému úkolu uveď proč je důležitý.*

**Status report pro klienta:**
> *Napiš profesionální status report e-mail pro klienta NovaTech. Buď transparentní, ale konstruktivní — ukaž problémy i návrhy řešení.*

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

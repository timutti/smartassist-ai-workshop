# Architektura řešení — SmartAssist AI

**Projekt:** SmartAssist AI — inteligentní chatbot pro zákaznickou podporu
**Klient:** NovaTech a.s.
**Autor:** Petra Černá, senior vývojářka
**Vytvořeno:** 22. 2. 2026
**Poslední aktualizace:** 22. 2. 2026

---

## Přehled řešení

SmartAssist je AI chatbot, který odpovídá zákazníkům na dotazy o produktech a službách NovaTech. Chatbot využívá technologii RAG — to znamená, že neodpovídá „z hlavy", ale vždy si nejprve vyhledá relevantní informace v produktové dokumentaci a na jejich základě sestaví odpověď. Díky tomu jsou odpovědi přesné a aktuální.

---

## Hlavní komponenty systému

```
┌─────────────────────────────────────────────────────────────────────┐
│                        UŽIVATEL (zákazník)                         │
└─────────────────────┬───────────────────────────────────────────────┘
                      │ píše dotaz v prohlížeči
                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│              CHAT WIDGET (React komponenta)                        │
│                                                                     │
│  Webová komponenta integrovaná do stránek NovaTech.                │
│  Zobrazuje konverzaci a odesílá dotazy na backend.                 │
│  Podporuje real-time streaming odpovědí.                           │
└─────────────────────┬───────────────────────────────────────────────┘
                      │ HTTP / WebSocket
                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│              BACKEND API (FastAPI, Python)                          │
│                                                                     │
│  Přijímá dotazy z widgetu, zpracovává je a vrací odpovědi.         │
│  Spravuje konverzace, historii, session management.                │
│  Poskytuje REST API pro admin dashboard.                           │
└──────────┬──────────────────┬───────────────────┬───────────────────┘
           │                  │                   │
           ▼                  ▼                   ▼
┌──────────────────┐ ┌────────────────┐ ┌─────────────────────────────┐
│  PYDANTIC AI     │ │  QDRANT        │ │  ZENDESK API                │
│  AGENT           │ │  (vektorová DB)│ │                             │
│                  │ │                │ │  Vytváření ticketů z         │
│  „Mozek" chat-   │ │  Zde jsou      │ │  konverzací. Čtení stavu   │
│  botu. Rozhoduje,│ │  uložené       │ │  existujících ticketů.     │
│  jak odpovědět,  │ │  produktové    │ │                             │
│  které dokumenty │ │  dokumenty     │ │  🟡 Probíhá implementace   │
│  použít, zda     │ │  v podobě      │ │                             │
│  přepojit na     │ │  vektorů pro   │ │                             │
│  operátora.      │ │  rychlé        │ │                             │
│                  │ │  vyhledávání.  │ │                             │
└──────────────────┘ └───────┬────────┘ └─────────────────────────────┘
                             │
                             │ indexuje dokumenty
                             │
                    ┌────────┴────────┐
                    │  INDEXER         │
                    │  (pipeline)      │
                    │                  │
                    │  Zpracovává      │
                    │  produktovou     │
                    │  dokumentaci     │
                    │  NovaTech do     │
                    │  vektorové DB.   │
                    │  Běží při změně  │
                    │  dokumentů.      │
                    └─────────────────┘
```

---

## Jak to funguje — krok za krokem

### Když se zákazník zeptá:

1. **Zákazník napíše dotaz** do chat widgetu na webu NovaTech (např. „Jaká je záruka na model X500?")
2. **Chat widget odešle dotaz** přes API na backend server
3. **Backend předá dotaz AI agentovi** (PydanticAI), který:
   - Převede dotaz na vektorovou reprezentaci (embedding)
   - Vyhledá v Qdrant databázi nejrelevantnější části dokumentace
   - Na základě nalezených dokumentů sestaví odpověď v přirozeném jazyce
4. **Odpověď se vrátí** přes API zpět do chat widgetu a zobrazí se zákazníkovi
5. **Pokud chatbot nedokáže odpovědět** s dostatečnou jistotou, nabídne přepojení na živého operátora

### Když chatbot vytvoří ticket:

1. Pokud zákazník potřebuje osobní řešení (reklamace, technický problém), chatbot automaticky vytvoří ticket v Zendesku
2. Operátor v admin dashboardu vidí nový ticket s kontextem konverzace
3. Operátor může převzít konverzaci a pokračovat přímo

### Jak se plní znalostní báze:

1. NovaTech dodá produktovou dokumentaci (PDF, Word, HTML)
2. Indexer pipeline dokumenty zpracuje — rozdělí na menší části, vytvoří vektory
3. Vektory se uloží do Qdrant databáze
4. Při aktualizaci dokumentace se spustí reindexace

---

## Administrátorský dashboard

Webové rozhraní pro operátory podpory NovaTech:

- **Přehled konverzací** — historie všech chatů, možnost filtrování
- **Statistiky** — počet dotazů, úspěšnost odpovědí, nejčastější témata
- **Převzetí konverzace** — operátor může vstoupit do chatu a odpovídat přímo
- **Správa znalostní báze** — přehled indexovaných dokumentů, spuštění reindexace

🟡 *Dashboard je rozpracovaný — základní obrazovky existují, napojení na live data je v řešení.*

---

## Vícejazyčnost (CZ/EN)

📋 *Dosud neimplementováno (Sprint 4)*

Plánovaný přístup:
- Automatická detekce jazyka zákazníka (čeština vs. angličtina)
- Odpovědi chatbotu ve stejném jazyce, v jakém se zákazník ptá
- UI widgetu a admin dashboardu ve dvou jazykových verzích

---

## Co NENÍ součástí aktuální architektury

Následující komponenty **nejsou ve smlouvě** a nejsou zahrnuty v architektuře:

```
┌─────────────────────────────────────────────────────────┐
│  ❌ SALESFORCE CRM                                       │
│     Klient by chtěl, aby chatbot viděl zákaznická data  │
│     (historie objednávek, kontaktní údaje).              │
│     Vyžaduje nové API napojení + bezpečnostní řešení.   │
│     Odhad: 20 MD / 280 000 Kč                           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ❌ DALŠÍ JAZYKY (DE, SK)                                │
│     Rozšíření nad rámec CZ/EN. Není jen „přepnutí       │
│     jazyka" — vyžaduje překlad dokumentace, testování   │
│     kvality odpovědí v každém jazyce, překlad UI.       │
│     Odhad: 8 MD / 110 000 Kč                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ❌ HOSTING V AZURE TENANTU NOVATECH                     │
│     IT oddělení NovaTech požaduje provoz v jejich Azure  │
│     prostředí. Aktuálně plánujeme deploy na našem        │
│     cloudu. Migrace do Azure klienta vyžaduje úpravy    │
│     infrastruktury a konfiguraci.                        │
│     Odhad: 6 MD / 85 000 Kč                             │
└─────────────────────────────────────────────────────────┘
```

---

## Technologie (pro orientaci)

| Komponenta | Technologie | Proč jsme ji zvolili |
|------------|-------------|----------------------|
| Chat widget | React | Moderní, snadno integrovatelný do libovolného webu |
| Backend API | FastAPI (Python) | Rychlý, asynchronní, skvělá podpora pro AI/ML ekosystém |
| AI agent | PydanticAI | Strukturované, typově bezpečné volání AI modelů |
| Vektorová DB | Qdrant | Optimalizovaná pro sémantické vyhledávání, open-source |
| Ticketing | Zendesk API | Stávající systém klienta |

---

*Zpracovala: Petra Černá, 22. 2. 2026*

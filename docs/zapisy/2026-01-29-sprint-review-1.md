# Zápis z jednání — Sprint Review 1

**Datum:** 29. 1. 2026, 14:00–15:00
**Místo:** Online (MS Teams)
**Projekt:** SmartAssist AI

---

## Účastníci

| Jméno | Role | Společnost |
|-------|------|------------|
| Martin Novák | Projektový manažer | DataFlow Solutions |
| Petra Černá | Senior vývojářka | DataFlow Solutions |
| Jan Kříž | Obchodní ředitel | NovaTech |
| Lucie Malá | Manažerka zákaznické podpory | NovaTech |

---

## Stav sprintu

**Sprint 1: Jádro chatbotu (RAG)** — 27. 1. – 7. 2. 2026

Sprint ještě běží (review uprostřed sprintu), ale klíčové funkcionality jsou funkční.

---

## Demo

Petra předvedla první funkční prototyp chatbotu:
- Chatbot odpovídá na jednoduché dotazy z testovacích dat (FAQ, základní produktové specifikace)
- Odpovědi jsou relevantní, chatbot cituje zdroj (odkud odpověď pochází)
- Pokud neví, řekne to — nehalucinuje (nevymýšlí si odpovědi)
- Zatím pracujeme s nekompletními daty — čekáme na zbývající dokumentaci od NovaTech

Martin: *„Toto je první verze. Jakmile dostaneme kompletní dokumentaci, provedeme plnou indexaci a kvalita odpovědí se výrazně zlepší."*

---

## Zpětná vazba klienta

**Lucie Malá:** *„Tohle je přesně to, co potřebujeme! Odpovědi jsou srozumitelné a přesné. Mám ale otázku — šlo by to napojit i na náš CRM? Někdy potřebujeme vidět historii zákazníka, jeho objednávky, a bylo by skvělé, kdyby to chatbot uměl."*

**Martin:** *„CRM integrace není v aktuálním rozsahu projektu, ale určitě se o tom můžeme bavit jako o rozšíření. Připravil bych odhad, kolik by to stálo a jak dlouho by to trvalo."*

**Jan Kříž:** *„Teď se tím nezabývejme. Soustřeďme se na to, co je dohodnuté. CRM můžeme řešit později."*

---

## Stav dokumentace

NovaTech dosud nedodal kompletní produktovou dokumentaci. Termín byl 31. 1., ale Lucie avizovala, že specifikace nové produktové řady ještě nejsou hotové.

**Lucie:** *„Většinu jsem poslala, ale specifikace na řadu X500 a příslušenství ještě finalizujeme. Budou do konce příštího týdne."*

**Petra:** *„Prozatím pracujeme s tím, co máme. Ale pro kvalitní odpovědi na dotazy k novým produktům ty dokumenty potřebujeme."*

---

## Diskuse

- Sprint 1 probíhá dle plánu, indexace dokumentů a RAG pipeline fungují
- Chatbot jádro je náročnější na ladění promptů, než jsme čekali — Petra potřebovala víc času na optimalizaci kvality odpovědí
- Testovací data ukazují dobrou přesnost odpovědí (>85 % na vzorových dotazech)

---

## Akční body

| # | Úkol | Zodpovědný | Termín | Stav |
|---|------|------------|--------|------|
| A1 | Dodat zbývající produktovou dokumentaci (řada X500, příslušenství) | Lucie Malá | 5. 2. 2026 | ⚠️ Dodáno 12. 2. (další zpoždění!) |
| A2 | Dokončit Sprint 1 — RAG pipeline + chatbot jádro | Petra Černá | 7. 2. 2026 | ✅ Hotovo |

---

## Další schůzka

Sprint Review 2: **12. 2. 2026, 14:00** (po dokončení Sprintu 2)

---

*Zapsal: Martin Novák, 29. 1. 2026*

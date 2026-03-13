# Zápis z jednání — Sprint Review 2

**Datum:** 12. 2. 2026, 14:00–15:15
**Místo:** Online (MS Teams)
**Projekt:** SmartAssist AI

---

## Účastníci

| Jméno | Role | Společnost |
|-------|------|------------|
| Martin Novák | Projektový manažer | DataFlow Solutions |
| Petra Černá | Senior vývojářka | DataFlow Solutions |
| Tomáš Vrba | Junior vývojář | DataFlow Solutions |
| Jan Kříž | Obchodní ředitel | NovaTech |
| Lucie Malá | Manažerka zákaznické podpory | NovaTech |

**Pozn.:** Tomáš Vrba se účastní poprvé — nastoupil do projektu na začátku Sprintu 2 (10. 2.).

---

## Stav sprintu

**Sprint 2: Chat widget + API** — 10. 2. – 21. 2. 2026

Sprint právě začal, ale ukazujeme první výsledky z rozpracovaného widgetu + dokončený Sprint 1.

---

## Demo

### Chat widget (Tomáš)
Tomáš předvedl rozpracovaný chat widget:
- Zákazník otevře chatovací okno na webu, napíše dotaz a dostane odpověď v reálném čase
- Odpovědi se zobrazují postupně (streaming) — působí přirozeně, zákazník nemusí čekat na celou odpověď
- Widget je vizuálně čistý, do budoucna se přizpůsobí brandingu NovaTech

**Jan Kříž:** *„Vypadá to skvěle. Přesně takhle si to představuji. Mimochodem, naši němečtí partneři se ptali — uměl by to chatbot i v němčině? A slovenštinu bychom taky potřebovali, máme slovenské zákazníky."*

**Martin:** *„Další jazyky nad rámec češtiny a angličtiny jsou rozšíření mimo současný scope. Není to jen přepnutí jazyka v AI — je potřeba přeložit i UI, otestovat kvalitu odpovědí v každém jazyce, případně přeložit dokumentaci. Můžu připravit odhad nákladů."*

**Jan:** *„Dobře, připravte odhad pro němčinu a slovenštinu."*

### Stav chatbotu po reindexaci (Petra)
- Lucie dnes ráno dodala zbývající dokumentaci (řada X500, příslušenství)
- Petra provedla reindexaci — chatbot teď odpovídá i na dotazy k novým produktům
- Kvalita odpovědí se zlepšila díky kompletním datům

---

## Zpětná vazba klienta

**Lucie Malá:** *„K tomu CRM — ještě se k tomu vracím, protože přístup k zákaznickým datům by nám opravdu hodně pomohl. Operátoři teď musí přepínat mezi chatbotem a Salesforce. Kdyby chatbot viděl zákaznický kontext přímo v konverzaci, ušetřilo by to spoustu času."*

**Martin:** *„Rozumím, je to rozumný požadavek. Ale je to mimo smlouvu. Připravím odhad i pro CRM integraci, ať víte, s čím počítat."*

**Jan:** *„Dobře, ale hlavně ať se nezpozdí to, co je dohodnuté."*

---

## Nový člen týmu — Tomáš Vrba

Tomáš nastoupil do projektu 10. 2. jako junior vývojář. Bude se zaměřovat na frontend (chat widget, admin dashboard) a později na Zendesk integraci.

Petra poznamenala, že onboarding Tomáše zabral víc času, než čekala — první 3 dny strávila vysvětlováním architektury a codebase, což zpomalilo její vlastní práci na API.

**Petra:** *„Tomáš se učí rychle, ale musela jsem mu vysvětlit celou architekturu od základů. Další sprint už by měl být samostatnější."*

---

## Diskuse

- Zbývající dokumentace konečně dodána (12. 2.) — původní termín byl 31. 1., tedy celkem 12 dní zpoždění
- Sprint 2 probíhá dle plánu, ale onboarding juniora stojí čas senior vývojářky
- Klient vznesl dva nové požadavky mimo scope: další jazyky (DE/SK) a CRM integrace

---

## Akční body

| # | Úkol | Zodpovědný | Termín | Stav |
|---|------|------------|--------|------|
| A1 | Připravit odhad nákladů pro DE/SK lokalizaci | Martin Novák | 21. 2. 2026 | ❌ Neodesláno (k 13. 3.) |
| A2 | Připravit odhad pro CRM (Salesforce) integraci | Martin Novák | 21. 2. 2026 | ⚠️ Odesláno 8. 3. (se zpožděním) |
| A3 | Dokončit Sprint 2 — widget + API | Tomáš, Petra | 21. 2. 2026 | ✅ Hotovo |

---

## Další schůzka

Sprint Review 3: **26. 2. 2026, 14:00**

---

*Zapsal: Martin Novák, 12. 2. 2026*

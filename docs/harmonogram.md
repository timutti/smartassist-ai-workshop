# Harmonogram projektu SmartAssist AI

**Projekt:** SmartAssist AI — inteligentní chatbot pro zákaznickou podporu
**Klient:** NovaTech a.s.
**Projektový manažer:** Martin Novák
**Vytvořeno:** 15. 1. 2026
**Poslední aktualizace:** 4. 3. 2026

---

## Přehled fází projektu

| Fáze | Období | Stav | Poznámka |
|------|--------|------|----------|
| Kickoff + příprava prostředí | 15. 1. – 24. 1. 2026 | ✅ Hotovo | — |
| Sprint 1 — Jádro chatbotu (RAG) | 27. 1. – 7. 2. 2026 | ✅ Hotovo | — |
| Sprint 2 — Chat widget + API | 10. 2. – 21. 2. 2026 | ✅ Hotovo | — |
| Sprint 3 — Zendesk + admin panel | 24. 2. – 7. 3. 2026 | 🟡 Probíhá | Zpoždění! |
| Sprint 4 — Vícejazyčnost + testy | 10. 3. – 21. 3. 2026 | 📋 Nezahájeno | Měl začít 10. 3.! |
| Sprint 5 — Stabilizace + nasazení | 24. 3. – 4. 4. 2026 | 📋 Plán | — |
| UAT (akceptační testování) | 7. 4. – 25. 4. 2026 | 📋 Plán | — |
| Go-live | 15. 5. 2026 | 📋 Plán | Smluvní termín |

---

## Detailní popis fází

### Fáze 0: Kickoff + příprava prostředí ✅
**15. 1. – 24. 1. 2026**

- Úvodní schůzka se zákazníkem (kickoff meeting)
- Nastavení vývojového prostředí, repozitářů, CI/CD
- Návrh architektury řešení
- Příprava projektového plánu a backlogu

**Výstup:** Projektový plán, architektura řešení, nastavené prostředí

---

### Sprint 1: Jádro chatbotu (RAG) ✅
**27. 1. – 7. 2. 2026**

- Implementace RAG pipeline — indexace dokumentů do vektorové databáze
- Napojení na AI model (PydanticAI agent)
- Základní konverzační logika — chatbot odpovídá na dotazy z dokumentace
- Testování na vzorových datech

**Výstup:** Funkční prototyp chatbotu odpovídajícího na dotazy z testovací dokumentace

**Pozn.:** NovaTech dodal kompletní dokumentaci až 5. 2. (termín byl 31. 1.), částečně se pracovalo s nekompletními daty.

---

### Sprint 2: Chat widget + API ✅
**10. 2. – 21. 2. 2026**

- Vývoj webového chat widgetu (React komponenta)
- REST API pro komunikaci widgetu s backendem (FastAPI)
- Real-time zobrazení odpovědí chatbotu
- Základní stylování widgetu pro integraci do webu NovaTech

**Výstup:** Funkční chat widget integrovaný s backendem, demo prostředí

**Pozn.:** Zbývající produktová dokumentace dodána 12. 2. (měla být 31. 1.). Reindexace provedena 13. 2.

---

### Sprint 3: Zendesk + admin panel 🟡
**24. 2. – 7. 3. 2026** → ⚠️ Nedokončeno k plánovanému datu

- Integrace se Zendesk API — vytváření ticketů z konverzací
- Integrace se Zendesk API — čtení stavu ticketů
- Administrátorský dashboard — přehled konverzací, statistiky

**Stav k 10. 3.:**
- Vytváření ticketů v Zendesku — rozpracováno (Zendesk API má rate limity, které jsme neočekávali)
- Čtení ticketů — rozpracováno
- Admin dashboard — rozpracováno, základní obrazovky hotové, chybí napojení na data

**Důvody zpoždění:**
1. Petra Černá na dovolené 26. 2. – 5. 3. (plánováno, ale dopad podceněn)
2. Zendesk API rate limity — nutná implementace queuing mechanismu
3. Tomáš Vrba (junior) pracuje na Zendesk integraci poprvé, potřebuje více času

---

### Sprint 4: Vícejazyčnost (CZ/EN) + testy 📋
**10. 3. – 21. 3. 2026** → ⚠️ Nezahájeno!

- Implementace detekce jazyka (čeština / angličtina)
- Odpovědi chatbotu ve správném jazyce
- Překlad UI widgetu a admin panelu
- Integrační testy celého řešení
- Performance testy

**Blokováno:** Sprint 3 není dokončen, tým nemůže paralelně pracovat na více frontách.

---

### Sprint 5: Stabilizace + nasazení 📋
**24. 3. – 4. 4. 2026**

- Opravy chyb nalezených při testování
- Optimalizace výkonu (SLA: odezva do 2 sekund)
- Příprava produkčního prostředí
- Nasazení do produkce
- Technická a uživatelská dokumentace

---

### UAT (akceptační testování) 📋
**7. 4. – 25. 4. 2026**

- Testování Objednatelem dle akceptačních kritérií
- Opravy nalezených vad (max. 5 pracovních dní na opravu)
- Opakované testování po opravách
- Podpis akceptačního protokolu

---

### Go-live 📋
**15. 5. 2026** — smluvní termín

- Spuštění chatbotu na produkčním webu NovaTech
- Monitoring prvních dní provozu
- Předání dokumentace a zdrojových kódů

---

## Požadavky mimo harmonogram

Klient v průběhu projektu vznesl požadavky, které **nejsou součástí smlouvy** a nejsou zahrnuty v tomto harmonogramu:

| Požadavek | Vzneseno | Stav |
|-----------|----------|------|
| Integrace se Salesforce CRM | Sprint Review 1 (29. 1.) | Odhad odeslán 8. 3. — 280 000 Kč, 3-4 týdny |
| Podpora dalších jazyků (DE, SK) | Sprint Review 2 (12. 2.) | Odhad nepřipraven |
| Hosting v Azure tenantu NovaTech | Sprint Review 3 (26. 2.) | Neřešeno, blokuje go-live! |

⚠️ **Tyto požadavky nemají alokovaný čas ani rozpočet. Pokud budou schváleny, harmonogram a rozpočet se musí přepracovat.**

---

## Milníky a stav

| Milník | Plánovaný termín | Skutečnost | Stav |
|--------|-------------------|------------|------|
| Kickoff | 15. 1. 2026 | 15. 1. 2026 | ✅ Splněno |
| Dokumentace od klienta | 31. 1. 2026 | 5. 2. + 12. 2. 2026 | ⚠️ Zpožděno |
| MVP (chatbot + widget) | 21. 2. 2026 | 21. 2. 2026 | ✅ Splněno |
| Zendesk + admin | 7. 3. 2026 | ??? | 🟡 Zpožděno |
| Vícejazyčnost + testy | 21. 3. 2026 | — | 📋 Nezahájeno |
| Nasazení | 4. 4. 2026 | — | 📋 Plán |
| UAT dokončení | 25. 4. 2026 | — | 📋 Plán |
| Go-live | 15. 5. 2026 | — | 📋 Plán |

---

*Zpracoval: Martin Novák, 4. 3. 2026*

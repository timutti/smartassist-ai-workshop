# Backlog projektu SmartAssist AI

**Projekt:** SmartAssist AI — inteligentní chatbot pro zákaznickou podporu
**Klient:** NovaTech a.s.
**Poslední aktualizace:** 4. 3. 2026, Martin Novák

---

## ✅ Hotovo (Done)

| # | Úkol | Přiřazeno | Dokončeno | Poznámka |
|---|------|-----------|-----------|----------|
| B-001 | Nastavení vývojového prostředí a repozitáře | Petra Černá | 17. 1. 2026 | Git, CI/CD, dev/staging prostředí |
| B-002 | Návrh architektury řešení | Petra Černá | 24. 1. 2026 | Schváleno na kickoffu |
| B-003 | Implementace RAG pipeline — indexace dokumentů | Petra Černá | 3. 2. 2026 | Qdrant vektorová DB, indexer pipeline |
| B-004 | Implementace chatbot jádra — konverzační logika | Petra Černá | 7. 2. 2026 | PydanticAI agent, prompt engineering |
| B-005 | Vývoj chat widgetu (React frontend) | Tomáš Vrba | 19. 2. 2026 | React komponenta, real-time odpovědi |
| B-006 | REST API pro komunikaci widget ↔ backend | Petra Černá | 18. 2. 2026 | FastAPI, WebSocket pro streaming |
| B-007 | Reindexace dokumentů po dodání kompletní doc. | Petra Černá | 13. 2. 2026 | Dokumentace dodána se zpožděním |

---

## 🟡 Probíhá (In Progress)

| # | Úkol | Přiřazeno | Zahájeno | Plánované dokončení | Poznámka |
|---|------|-----------|----------|---------------------|----------|
| B-008 | Zendesk integrace — vytváření ticketů | Tomáš Vrba | 24. 2. 2026 | 7. 3. 2026 ⚠️ | Zendesk API má rate limity, řeší se queuing. Tomáš potřebuje podporu Petry. |
| B-009 | Zendesk integrace — čtení stavu ticketů | Tomáš Vrba | 28. 2. 2026 | 7. 3. 2026 ⚠️ | Závisí na B-008 (sdílená logika pro API komunikaci) |
| B-010 | Administrátorský dashboard | Petra Černá | 24. 2. 2026 | 7. 3. 2026 ⚠️ | Základní UI screens hotové, chybí napojení na live data a historie konverzací. Petra byla na dovolené 26. 2. – 5. 3. |

⚠️ Všechny tři úkoly měly být hotové 7. 3. — jsou zpožděné!

---

## 📋 K realizaci (To Do)

| # | Úkol | Přiřazeno | Plánovaný start | Plánované dokončení | Poznámka |
|---|------|-----------|-----------------|---------------------|----------|
| B-011 | Detekce jazyka (CZ/EN) | Petra Černá | 10. 3. 2026 | 14. 3. 2026 | ⚠️ Mělo začít 10. 3., nezahájeno |
| B-012 | Vícejazyčné odpovědi chatbotu | Petra Černá | 14. 3. 2026 | 18. 3. 2026 | Závisí na B-011 |
| B-013 | Překlad UI widgetu a admin panelu | Tomáš Vrba | 14. 3. 2026 | 19. 3. 2026 | |
| B-014 | Integrační testy (end-to-end) | Petra Černá | 18. 3. 2026 | 24. 3. 2026 | |
| B-015 | Performance testy (SLA: 2s odezva) | Tomáš Vrba | 20. 3. 2026 | 26. 3. 2026 | |
| B-016 | Nasazení do produkčního prostředí | Petra Černá | 27. 3. 2026 | 2. 4. 2026 | ⚠️ Kam nasadit? Otázka hostingu neřešena! |
| B-017 | Technická a uživatelská dokumentace | Martin Novák, Petra Černá | 30. 3. 2026 | 4. 4. 2026 | |

---

## ❓ Mimo scope — požadavky klienta (Out of Scope)

Tyto požadavky **nejsou součástí smlouvy**. Klient je opakovaně zmiňuje na review schůzkách.

| # | Požadavek | Vzneseno kým | Kdy | Odhad (MD) | Odhad (Kč) | Stav |
|---|-----------|-------------|-----|-----------|------------|------|
| X-001 | Integrace se Salesforce CRM — zobrazení zákaznických dat v chatu | Lucie Malá (NovaTech) | 29. 1. 2026 | 20 MD | 280 000 Kč | Odhad odeslán klientovi 8. 3. Čeká se na rozhodnutí. |
| X-002 | Podpora dalších jazyků (němčina, slovenština) | Jan Kříž (NovaTech) | 12. 2. 2026 | 8 MD | 110 000 Kč | Martin měl připravit odhad, dosud nepřipraven. |
| X-003 | Hosting v Azure tenantu NovaTech | Pavel Horák (NovaTech IT) | 26. 2. 2026 | 6 MD | 85 000 Kč | Neřešeno. Pavel a Martin se měli domluvit — schůzka se neuskutečnila. |

---

## Závislosti a blokátory

| Blokátor | Dopad | Zodpovědný |
|----------|-------|------------|
| Sprint 3 nedokončen → Sprint 4 nemůže začít | Celý harmonogram se posouvá | Martin Novák |
| Hosting — Azure vs. náš cloud | Nelze nasadit do produkce, dokud se nevyřeší | Martin Novák + Pavel Horák |
| CRM rozhodnutí klienta | Pokud se schválí, ovlivní harmonogram i rozpočet | Jan Kříž (NovaTech) |

---

## Poznámky

- Backlog je veden v jednoduchém formátu, protože tým je malý (3 lidi) a používáme ho hlavně pro přehled na schůzkách s klientem.
- Úkoly B-008 až B-010 měly být hotové 7. 3. — jejich nedokončení blokuje start Sprintu 4.
- Požadavky X-001 až X-003 je nutné formálně vyřešit — buď zamítnout, nebo dojednat změnový dodatek ke smlouvě.

---

*Aktualizoval: Martin Novák, 4. 3. 2026*

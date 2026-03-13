# Odhady pracnosti — SmartAssist AI

**Projekt:** SmartAssist AI — inteligentní chatbot pro zákaznickou podporu
**Klient:** NovaTech a.s.
**Jednotka:** MD (člověkoden / manday)
**Poslední aktualizace:** 10. 3. 2026

---

## Souhrnný přehled

| Ukazatel | Hodnota |
|----------|---------|
| Celková plánovaná pracnost | 90 MD |
| Odpracováno k 10. 3. 2026 | 77 MD |
| Zbývající plánovaná pracnost | 13 MD (zbývá na dokončení smluvního rozsahu) |
| Odhadovaná skutečná zbývající pracnost | ~40 MD |
| Změnové požadavky (mimo scope) | 34 MD |

---

## Plánované vs. skutečné odpracované MD — dle funkčních celků

### ✅ Dokončené

| Funkční celek | Plán (MD) | Skutečnost (MD) | Rozdíl | Poznámka |
|---------------|-----------|-----------------|--------|----------|
| Projektový setup + architektura | 3 | 3 | 0 | — |
| Chatbot jádro (RAG, konverzační logika) | 15 | 18 | +3 | Složitější ladění promptů a retrieval pipeline |
| Indexace dokumentů | 5 | 7 | +2 | Reindexace kvůli opožděnému dodání docs |
| Chat widget (React frontend) | 8 | 10 | +2 | Úpravy po zpětné vazbě klienta na demo |
| REST API (FastAPI backend) | 5 | 5 | 0 | — |

**Dokončeno celkem:** 36 MD plán → 43 MD skutečnost (+7 MD = +19 % překročení)

### 🟡 Rozpracované

| Funkční celek | Plán (MD) | Odpracováno (MD) | Zbývá (odhad) | Poznámka |
|---------------|-----------|-------------------|----------------|----------|
| Zendesk — vytváření ticketů | 6 | 8 | 3 | Rate limity API, nutný queuing |
| Zendesk — čtení ticketů | 4 | 5 | 2 | Navázáno na queuing řešení |
| Admin dashboard | 8 | 7 | 4 | Základní UI hotové, chybí napojení na live data |
| Řízení projektu (průběžné) | 14 | 14 | 6 | Běží celou dobu projektu |

**Rozpracováno:** 32 MD plán → 34 MD odpracováno, zbývá ještě ~15 MD

### 📋 Nezahájené

| Funkční celek | Plán (MD) | Odpracováno (MD) | Realistický odhad (MD) |
|---------------|-----------|-------------------|------------------------|
| Vícejazyčnost CZ/EN — detekce jazyka | 3 | 0 | 3 |
| Vícejazyčnost CZ/EN — překlad UI | 3 | 0 | 4 |
| Integrační testy | 5 | 0 | 6 |
| Performance testy | 3 | 0 | 3 |
| Nasazení do produkce | 3 | 0 | 4 |
| Dokumentace (technická + uživatelská) | 4 | 0 | 5 |

**Nezahájeno:** 21 MD plán → realistický odhad ~25 MD

---

## Přehled čerpání po rolích

| Člen týmu | Role | Odpracováno (MD) | Poznámka |
|-----------|------|------------------|----------|
| Martin Novák | Projektový manažer | 14 | Řízení, komunikace s klientem, odhady |
| Petra Černá | Senior vývojářka | 42 | Chatbot jádro, API, architektura |
| Tomáš Vrba | Junior vývojář | 21 | Widget, Zendesk (od Sprintu 2) |
| **Celkem** | | **77** | |

Pozn.: Petra byla na dovolené 26. 2. – 5. 3. (6 pracovních dní). Tomáš byl v projektu od 10. 2. (Sprint 2), první 3 dny onboarding.

---

## Analýza: stíháme dokončit ve zbývajícím rozpočtu?

### Smluvní rozsah — zbývající práce

| Položka | Zbývající MD (realistický odhad) |
|---------|----------------------------------|
| Dokončení Zendesk integrace | 5 |
| Dokončení admin dashboardu | 4 |
| Vícejazyčnost CZ/EN | 7 |
| Testování (integrační + performance) | 9 |
| Nasazení do produkce | 4 |
| Dokumentace | 5 |
| Řízení projektu (zbývající) | 6 |
| **Celkem zbývá** | **~40 MD** |

### Kapacitní situace

| Ukazatel | Hodnota |
|----------|---------|
| Plánováno celkem | 90 MD |
| Odpracováno | 77 MD |
| Zbývá dle původního plánu | 13 MD |
| Zbývá realisticky | ~40 MD |
| **Překročení** | **~27 MD** |

### Finanční dopad překročení

Průměrná sazba na projektu: ~10 300 Kč/MD

Překročení 27 MD × 10 300 Kč = **~278 000 Kč**

⚠️ **Projekt se nevejde do původního rozpočtu ani pracnosti.** Již teď je vyčerpáno 85 % plánované kapacity, ale odhadujeme, že je hotovo pouze 55 % práce.

---

## Změnové požadavky — odhad pracnosti

| Požadavek | Odhad (MD) | Odhad (Kč) | Stav odhadu |
|-----------|-----------|------------|-------------|
| Integrace Salesforce CRM | 20 | 280 000 | Odhad odeslán klientovi 8. 3. |
| Další jazyky (DE, SK) | 8 | 110 000 | Odhad nepřipraven |
| Hosting v Azure tenantu klienta | 6 | 85 000 | Odhad nepřipraven |
| **Celkem** | **34 MD** | **475 000 Kč** | |

Realizace změnových požadavků by posunula termín dodání minimálně o 5-6 týdnů.

---

## Závěr

Projekt má zásadní problém s poměrem vynaložené práce a stavu dokončení:

- **85 % kapacity vyčerpáno, ~55 % práce hotovo**
- Zbývající práce realisticky vyžaduje víc než dvojnásobek zbývající kapacity
- Změnové požadavky klienta v celkovém objemu 34 MD / 475 000 Kč nejsou pokryté žádným rozpočtem
- Je nutné urgentně řešit s klientem: buď navýšení rozpočtu, nebo redukci rozsahu

---

*Zpracoval: Martin Novák, 10. 3. 2026*

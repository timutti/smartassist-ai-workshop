# Rozpočet projektu SmartAssist AI

**Projekt:** SmartAssist AI — inteligentní chatbot pro zákaznickou podporu
**Klient:** NovaTech a.s.
**Celková cena díla:** 1 200 000 Kč (pevná cena dle smlouvy)
**Projektový manažer:** Martin Novák
**Poslední aktualizace:** 10. 3. 2026

---

## Celkový rozpočet dle kategorií

| Kategorie | Plán (Kč) | Čerpáno k 10. 3. (Kč) | Zbývá (Kč) | Čerpáno (%) |
|-----------|-----------|------------------------|------------|-------------|
| Řízení projektu (PM) | 180 000 | 140 000 | 40 000 | 78 % |
| Vývoj AI chatbotu | 420 000 | 380 000 | 40 000 | 90 % |
| Webové rozhraní (widget + admin) | 200 000 | 170 000 | 30 000 | 85 % |
| Integrace Zendesk | 150 000 | 90 000 | 60 000 | 60 % |
| Vícejazyčnost CZ/EN | 80 000 | 0 | 80 000 | 0 % |
| Testování a QA | 100 000 | 15 000 | 85 000 | 15 % |
| Nasazení + dokumentace | 70 000 | 0 | 70 000 | 0 % |
| **Celkem** | **1 200 000** | **795 000** | **405 000** | **66 %** |

---

## Příjmy (platební milníky)

| Milník | Částka | Stav | Datum úhrady |
|--------|--------|------|--------------|
| M1 — Po kickoffu | 300 000 Kč | ✅ Uhrazeno | 20. 1. 2026 |
| M2 — Po dodání MVP | 400 000 Kč | ✅ Uhrazeno | 25. 2. 2026 |
| M3 — Po finálním dodání + akceptaci | 500 000 Kč | ⏳ Nesplaceno | — |
| **Celkem přijato** | **700 000 Kč** | | |
| **Celkem vynaloženo** | **795 000 Kč** | | |
| **Cash flow** | **−95 000 Kč** | | |

⚠️ Aktuálně jsme v záporném cash flow. Třetí milník (500 000 Kč) bude vyplacen až po finálním dodání a akceptaci.

---

## Čerpání rozpočtu po měsících

| Měsíc | Náklady | Kumulativně | % z celku |
|-------|---------|-------------|-----------|
| Leden 2026 | 210 000 | 210 000 | 18 % |
| Únor 2026 | 340 000 | 550 000 | 46 % |
| Březen 2026 (k 10. 3.) | 245 000 | 795 000 | 66 % |
| Březen (odhad do konce) | ~150 000 | ~945 000 | ~79 % |
| Duben (odhad) | ~180 000 | ~1 125 000 | ~94 % |
| Květen (odhad) | ~75 000 | ~1 200 000 | 100 % |

---

## Detailní rozpis čerpání

### Řízení projektu — 140 000 / 180 000 Kč (78 %)
- Koordinace týmu, schůzky s klientem, reporting
- Nadměrné čerpání způsobeno: řešení změnových požadavků od klienta, příprava odhadů pro CRM a další jazyky, onboarding juniora Tomáše

### Vývoj AI chatbotu — 380 000 / 420 000 Kč (90 %)
- RAG pipeline, indexace dokumentů, konverzační logika, PydanticAI agent
- Překročení odhadu: složitější než očekáváno, opožděné dodání dokumentace od klienta vyžadovalo vícenásobnou reindexaci

### Webové rozhraní — 170 000 / 200 000 Kč (85 %)
- Chat widget (React), admin dashboard, REST API
- Vyšší čerpání: úpravy widgetu po zpětné vazbě klienta, admin dashboard komplexnější než plán

### Integrace Zendesk — 90 000 / 150 000 Kč (60 %)
- Napojení na Zendesk API, vytváření a čtení ticketů
- Sprint 3 není dokončen — zbývající práce odhadujeme na cca 70-80 000 Kč

### Vícejazyčnost CZ/EN — 0 / 80 000 Kč (0 %)
- Dosud nezahájeno (Sprint 4)

### Testování a QA — 15 000 / 100 000 Kč (15 %)
- Zatím pouze základní unit testy průběžně, hlavní testovací fáze teprve přijde

### Nasazení + dokumentace — 0 / 70 000 Kč (0 %)
- Dosud nezahájeno

---

## Klíčový problém: poměr čerpání vs. hotová práce

| Ukazatel | Hodnota |
|----------|---------|
| Čerpáno z rozpočtu | 66 % |
| Odhadovaný stav hotové práce | ~55 % |
| Zbývající rozpočet | 405 000 Kč |
| Odhadované náklady na dokončení | ~480 000 – 530 000 Kč |

⚠️ **Rozpočet pravděpodobně nebude stačit.** Při současném tempu čerpání hrozí překročení o 80 000 – 130 000 Kč, a to i bez jakýchkoli změnových požadavků.

Hlavní důvody:
1. Chatbot jádro a webové rozhraní vyčerpaly víc, než bylo plánováno
2. Zendesk integrace je složitější, než jsme odhadovali
3. PM kapacita je čerpána řešením požadavků mimo scope

---

## Změnové požadavky od klienta (mimo rozpočet)

Klient v průběhu projektu vznesl požadavky, které **nejsou součástí smlouvy ani rozpočtu**:

| Požadavek | Odhadované náklady | Odhadovaná pracnost | Stav |
|-----------|-------------------|---------------------|------|
| Integrace se Salesforce CRM | 280 000 Kč | 20 MD | Odhad odeslán klientovi 8. 3. |
| Další jazyky (DE, SK) | 110 000 Kč | 8 MD | Odhad nepřipraven |
| Hosting v Azure tenantu klienta | 85 000 Kč | 6 MD | Neřešeno |
| **Celkem** | **475 000 Kč** | **34 MD** | |

⚠️ **Pro tyto požadavky neexistuje žádný rozpočet. Pokud je klient bude chtít realizovat, je nutné dojednat změnový dodatek ke smlouvě.**

---

*Zpracoval: Martin Novák, 10. 3. 2026*

# Zápis z jednání — Sprint Review 3

**Datum:** 26. 3. 2026, 14:00–15:30
**Místo:** Online (MS Teams)
**Projekt:** SmartAssist AI

---

## Účastníci

| Jméno | Role | Společnost | Poznámka |
|-------|------|------------|----------|
| Martin Novák | Projektový manažer | DataFlow Solutions | |
| Tomáš Vrba | Junior vývojář | DataFlow Solutions | |
| Jan Kříž | Obchodní ředitel | NovaTech | |
| Lucie Malá | Manažerka zákaznické podpory | NovaTech | |
| Pavel Horák | IT manažer | NovaTech | Poprvé na projektu! |

**Neúčastnila se:** Petra Černá — dovolená 26. 3. – 5. 4. 2026

---

## Stav sprintu

**Sprint 3: Zendesk integrace + admin dashboard** — 24. 3. – 7. 4. 2026

Sprint právě začal. Tomáš pracuje na Zendesk integraci, Petra před dovolenou rozběhla admin dashboard.

---

## Demo

### Zendesk integrace (Tomáš)
Tomáš předvedl základní propojení se Zendesk API:
- Chatbot umí vytvořit ticket v Zendesku z probíhající konverzace
- Základní flow funguje — zákazník požádá o eskalaci, chatbot vytvoří ticket s kontextem konverzace

**Tomáš:** *„Základní vytváření ticketů funguje, ale zjistil jsem, že Zendesk API má rate limity, které jsme nečekali. Při větším počtu souběžných požadavků nám API vrací chyby. Musím implementovat frontu požadavků."*

**Lucie:** *„To je důležité — v špičce máme desítky dotazů najednou. Nemůže se stát, že se ticket nevytvoří."*

**Martin:** *„Tomáši, to vyřeš prioritně. Petra se k tomu vrátí po dovolené."*

---

## Nový požadavek — hosting v Azure

**Pavel Horák** se schůzky účastnil poprvé. Pavel je IT manažer NovaTech a zodpovídá za infrastrukturu a bezpečnost.

**Pavel:** *„Potřebuji se zeptat na jednu zásadní věc. Kde bude chatbot provozovaný? Protože u nás platí, že zákaznická data nesmí být mimo náš Azure tenant. To je bezpečnostní politika firmy."*

**Martin:** *„V rámci projektu počítáme s nasazením na naší cloudové infrastruktuře. Hosting v Azure tenantu NovaTech není součástí smlouvy."*

**Pavel:** *„To je problém. Náš bezpečnostní tým to neschválí. Konverzace zákazníků obsahují osobní údaje — nemůžou být na cizím cloudu. Musíme to vyřešit."*

**Martin:** *„Rozumím, ale to je změna rozsahu. Migrace do vašeho Azure prostředí vyžaduje práci navíc — přístup k vašemu tenantu, úpravy konfigurace, testování v novém prostředí."*

**Pavel:** *„Z naší strany vám dáme přístup, ale musí to běžet u nás."*

**Jan Kříž:** *„Vyřešte si to mezi sebou. Pavle, domluv se s Martinem na schůzce, kde proberete technické detaily. A Martine — co ty odhady na CRM a jazyky? Máte je?"*

**Martin:** *„Ještě ne, bohužel. Řídím projekt a nestíhám to připravit současně. Budu to mít do příštího review."*

**Jan (mírně netrpělivě):** *„Tak do příštího review, prosím."*

---

## Zpětná vazba k jazykům

**Lucie:** *„K těm dalším jazykům — popravdě, čeština a angličtina nám stačí. Ty ostatní jazyky můžou počkat, není to teď priorita."*

**Jan:** *„Dobře, zahoďme němčinu a slovenštinu prozatím. Soustřeďme se na to, co je ve smlouvě."*

**Martin:** *„Rozumím, beru na vědomí."*

---

## Diskuse

- Sprint 3 začal dva dny zpátky, je brzy na hodnocení
- Petra je na dovolené celý příští týden — Tomáš bude pracovat samostatně
- Zendesk rate limity jsou nečekaný technický problém
- Pavel Horák otevřel otázku hostingu, která může blokovat celý go-live
- Jan chce vidět odhady na CRM a další jazyky do příštího review

---

## Akční body

| # | Úkol | Zodpovědný | Termín | Stav |
|---|------|------------|--------|------|
| A1 | Připravit odhad nákladů pro CRM integraci | Martin Novák | 5. 4. 2026 | ⚠️ Odesláno 8. 4. (3 dny po termínu) |
| A2 | Domluvit schůzku Martin + Pavel k řešení hostingu | Martin Novák, Pavel Horák | 5. 4. 2026 | ❌ Schůzka se neuskutečnila |
| A3 | Implementovat queuing pro Zendesk API | Tomáš Vrba | 7. 4. 2026 | 🟡 Probíhá |
| A4 | Dokončit admin dashboard (po návratu z dovolené) | Petra Černá | 7. 4. 2026 | 🟡 Probíhá |

---

## Další schůzka

Další review: **12. 4. 2026, 14:00**

---

*Zapsal: Martin Novák, 26. 3. 2026*

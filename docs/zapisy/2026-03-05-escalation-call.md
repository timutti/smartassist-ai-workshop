# Zápis z jednání — Eskalační schůzka

**Datum:** 5. 3. 2026, 16:00–17:15
**Místo:** Online (MS Teams) — svoláno na žádost Jana Kříže
**Projekt:** SmartAssist AI

---

## Účastníci

| Jméno | Role | Společnost |
|-------|------|------------|
| Martin Novák | Projektový manažer | DataFlow Solutions |
| Petra Černá | Senior vývojářka | DataFlow Solutions |
| Jan Kříž | Obchodní ředitel | NovaTech |
| Pavel Horák | IT manažer | NovaTech |
| Lucie Malá | Manažerka zákaznické podpory | NovaTech (připojena telefonicky) |

**Pozn.:** Schůzku svolal Jan Kříž mimo pravidelný cyklus. Petra Černá se vrátila z dovolené dnes.

---

## Kontext

Jan Kříž požádal o mimořádnou schůzku, protože má pocit, že projekt zaostává za plánem a neřeší se klíčové otevřené body (CRM, hosting, odhady).

---

## Průběh jednání

### Stav projektu

**Jan:** *„Jsme v polovině projektu a mám pocit, že nejsme v polovině práce. Kde přesně jsme? Chci slyšet upřímný stav, ne optimistické reporty."*

**Martin:** *„Sprint 3 je zpožděný. Zendesk integrace je technicky složitější, než jsme předpokládali, a Petra byla minulý týden na dovolené. Tomáš na tom pracoval sám, ale je to junior a Zendesk API má specifika, se kterými se dosud nesetkal."*

**Martin promítl přehled stavu:**
- Sprint 1 (RAG jádro) — ✅ Hotovo
- Sprint 2 (Widget + API) — ✅ Hotovo
- Sprint 3 (Zendesk + admin) — 🟡 Zpožděno, odhaduji dokončení kolem 14. 3.
- Sprint 4 (vícejazyčnost + testy) — 📋 Nezahájeno, měl začít 10. 3.

**Jan:** *„Takže máme týdenní zpoždění a ještě to poroste?"*

**Martin:** *„Snažím se to stáhnout, ale musím být upřímný — je to napjaté."*

### Zendesk — technické problémy

**Petra:** *„Zendesk API má rate limity, které jsme předem neodhalili — v dokumentaci to není na první pohled zřejmé. Při větším počtu souběžných požadavků API vrací chyby 429. Musíme implementovat frontu požadavků s retry logikou. Pracuji na tom, ale zabere to pár dní."*

**Pavel:** *„To se dalo otestovat předem, ne?"*

**Petra:** *„V ideálním světě ano. Ale v rámci odhadu pracnosti jsme počítali se standardním API chováním. Rate limity v tomto rozsahu jsou specifika Zendesk Enterprise plánu, který NovaTech používá."*

### CRM integrace

**Jan:** *„A co to CRM? To je pro nás klíčové."*

**Martin:** *„CRM integrace se Salesforce není součástí smlouvy. Připravil jsem předběžný odhad: implementace by stála přibližně 280 000 korun a trvala by 3 až 4 týdny. Odeslal jsem vám to mailem dnes ráno."*

**Jan:** *„To je hodně peněz. Ale bez CRM ten chatbot nebude dělat to, co od něj potřebujeme. Lucie?"*

**Lucie (telefonicky):** *„CRM je pro nás must-have. Bez toho operátoři stejně budou muset přepínat do Salesforce a ztrácet čas. A ještě jedna věc — ta vícejazyčnost, aspoň slovenština by byla dobrá hned od začátku. Máme slovenské zákazníky a ti píšou slovensky."*

**Martin:** *„Na minulé schůzce jste říkala, že další jazyky můžou počkat..."*

**Lucie:** *„To jsem myslela němčinu. Slovenštinu bychom ale chtěli od startu, máme ji jako druhý nejčastější jazyk po češtině."*

**Jan:** *„Takže CRM a slovenštinu potřebujeme. Kolik to bude stát dohromady?"*

**Martin:** *„CRM je těch 280 000. Slovenštinu jsem ještě neodhadoval, ale bude to méně než celá vícejazyčnost — řádově 40 000 až 60 000 navíc. Připravím přesný odhad."*

### Hosting

**Pavel:** *„A co hosting? Na minulé schůzce jsme se domluvili, že si domluvíme schůzku k Azure. Nic se nestalo."*

**Martin:** *„Omlouvám se, minulý týden byl náročný. Můžeme se domluvit na příští týden?"*

**Pavel:** *„Martine, to je kritická věc. Bez vyřešení hostingu nemůžeme jít do produkce. Náš bezpečnostní tým to neschválí a bez jejich souhlasu nic nespustíme. To není ‚nice to have', to je blocker."*

**Jan:** *„Slyšíte to, Martine? Hosting se musí vyřešit, jinak je celý projekt k ničemu."*

**Martin:** *„Beru to. Domluvím se s Pavlem tento týden."*

### Požadavek na aktualizovaný plán

**Jan:** *„Martine, potřebuji od vás aktualizovaný plán do konce tohoto týdne. Chci vidět:*
1. *Co se stihne v původním rozpočtu a termínu*
2. *Co jsou extras a kolik stojí*
3. *Realistický harmonogram, ne optimistický*
4. *Jak vyřešíme hosting*

*Můžete to mít do pátku?"*

**Martin:** *„Budu se snažit. Musím si to projít s Petrou a připravit realistické odhady."*

**Jan:** *„Snažte se moc. Pošlete mi to mailem do pátku 13. 3. Pokud to nebudu mít, budeme muset eskalovat výš."*

---

## Atmosféra

Schůzka probíhala v napjaté atmosféře. Jan Kříž byl viditelně nespokojený s tempem projektu a chybějícími odhady. Pavel Horák byl frustrovaný z neřešené otázky hostingu. Martin Novák uznal zpoždění a zavázal se k dodání aktualizovaného plánu.

---

## Akční body

| # | Úkol | Zodpovědný | Termín | Stav |
|---|------|------------|--------|------|
| A1 | Odeslat aktualizovaný plán projektu (co se stihne, co ne, kolik stojí extra) | Martin Novák | 13. 3. 2026 | ❌ Martin onemocněl 13. 3. — plán neexistuje! |
| A2 | Domluvit schůzku s Pavlem k Azure hostingu | Martin Novák | 10. 3. 2026 | ❌ Schůzka se neuskutečnila |
| A3 | Připravit odhad pro slovenštinu | Martin Novák | 10. 3. 2026 | ❌ Nepřipraveno |
| A4 | Dokončit Zendesk integraci (rate limit fix) | Petra Černá | 14. 3. 2026 | 🟡 Probíhá |
| A5 | Dokončit admin dashboard | Petra Černá | 14. 3. 2026 | 🟡 Probíhá |

---

## Kritická poznámka

**13. března 2026 Martin Novák onemocněl** (neschopenka, předpokládaný návrat nejdříve 20. 3.). Aktualizovaný plán, který Jan Kříž požadoval do tohoto data, **nebyl vytvořen a nebyl odeslán**. Schůzka s Pavlem k hostingu se neuskutečnila. Odhad pro slovenštinu nebyl připraven.

Projekt je aktuálně bez projektového manažera. Petra Černá a Tomáš Vrba pokračují ve vývoji, ale nemají mandát jednat s klientem ani rozhodovat o rozsahu.

---

*Zapsal: Martin Novák, 5. 3. 2026*

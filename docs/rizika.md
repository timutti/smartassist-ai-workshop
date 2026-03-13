# Registr rizik — SmartAssist AI

**Projekt:** SmartAssist AI — inteligentní chatbot pro zákaznickou podporu
**Klient:** NovaTech a.s.
**Vytvořeno:** 20. 1. 2026, Martin Novák
**Poslední aktualizace:** 20. 1. 2026

---

## Identifikovaná rizika

### R1: Klient včas nedodá produktovou dokumentaci

| Atribut | Hodnota |
|---------|---------|
| **Pravděpodobnost** | Střední |
| **Dopad** | Vysoký |
| **Popis** | NovaTech se zavázal dodat kompletní produktovou dokumentaci do 31. 1. 2026. Pokud dokumentace přijde pozdě nebo bude nekompletní, chatbot nebude mít z čeho se učit a indexace se zpozdí. |
| **Opatření** | Upozornit klienta na důležitost termínu už na kickoffu. Připravit testovací data pro případ zpoždění. |
| **Zodpovědný** | Martin Novák |
| **Stav** | Otevřeno |

---

### R2: Chatbot odpovídá nepřesně nebo chybně

| Atribut | Hodnota |
|---------|---------|
| **Pravděpodobnost** | Střední |
| **Dopad** | Vysoký |
| **Popis** | AI chatbot může generovat nepřesné nebo zavádějící odpovědi (tzv. halucinace). To by poškodilo důvěru zákazníků v řešení a mohlo vést k odmítnutí akceptace. |
| **Opatření** | Implementovat mechanismy pro ověřování odpovědí (citace zdroje, confidence score). Při nízké jistotě nabídnout přepojení na živého operátora. Průběžné testování kvality odpovědí na reálných dotazech. |
| **Zodpovědný** | Petra Černá |
| **Stav** | Otevřeno |

---

### R3: Výpadek klíčového člena týmu

| Atribut | Hodnota |
|---------|---------|
| **Pravděpodobnost** | Nízká |
| **Dopad** | Vysoký |
| **Popis** | Tým je malý (PM + 2 vývojáři). Pokud některý klíčový člen vypadne (nemoc, odchod), bude velmi obtížné dodržet harmonogram. Zejména Petra Černá je na projektu nenahraditelná — je autorkou architektury a jádra chatbotu. |
| **Opatření** | Dokumentovat klíčová rozhodnutí a architekturu. Zajistit, aby alespoň dva lidé rozuměli každé části systému. |
| **Zodpovědný** | Martin Novák |
| **Stav** | Otevřeno |

---

### R4: Výkon chatbotu nesplní SLA při zátěži

| Atribut | Hodnota |
|---------|---------|
| **Pravděpodobnost** | Nízká |
| **Dopad** | Střední |
| **Popis** | SLA požaduje odezvu chatbotu do 2 sekund. Při větším počtu souběžných uživatelů (200+ dotazů/den dle klienta) může dojít ke zpomalení, zejména pokud RAG pipeline bude pomalá. |
| **Opatření** | Průběžně měřit výkon. Naplánovat load testy v rámci Sprintu 5. Připravit škálovatelnou architekturu. |
| **Zodpovědný** | Petra Černá |
| **Stav** | Otevřeno |

---

## Hodnocení rizik — matice

|  | Nízký dopad | Střední dopad | Vysoký dopad |
|--|-------------|---------------|--------------|
| **Vysoká pst.** | | | |
| **Střední pst.** | | | R1, R2 |
| **Nízká pst.** | | R4 | R3 |

---

## Poznámky

- Registr rizik vytvořen při zahájení projektu. Bude aktualizován průběžně dle potřeby.
- Na kickoff meetingu nebyla identifikována další rizika.

---

*Zpracoval: Martin Novák, 20. 1. 2026*

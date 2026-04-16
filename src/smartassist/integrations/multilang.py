# TODO: Kompletní implementace vícejazyčnosti
# Ve smlouvě máme CZ + EN, klient chce i SK a DE (mimo smlouvu)
# Pozn.: Lucie (NovaTech) 26.3. řekla "další jazyky počkají", ale 5.4. chce slovenštinu "od začátku"
#
# Aktuální stav:
# - Detekce jazyka: základní implementace (funguje pro CZ/EN, SK detekuje jako CZ)
# - Překlad: rozpracováno, nefunguje
# - Přepínání kontextu dle jazyka: neimplementováno

"""Multilingual support for SmartAssist AI.

Handles language detection, response language selection,
and optional translation of knowledge base content.
"""

import logging

logger = logging.getLogger(__name__)

# Supported languages - contractually agreed
SUPPORTED_LANGUAGES = ["cs", "en"]

# Languages requested by client but not in scope
# REQUESTED_LANGUAGES = ["cs", "en", "sk", "de"]

# Basic language detection heuristics
# TODO: Replace with proper library (langdetect or lingua-py)
_CZECH_MARKERS = [
    "ř",
    "ů",
    "ž",
    "š",
    "č",
    "ě",
    "ý",
    "á",
    "í",
    "é",
    "jak",
    "kde",
    "proč",
    "kolik",
    "chci",
    "potřebuji",
    "objednávka",
    "reklamace",
    "dobrý den",
    "děkuji",
    "prosím",
]

_ENGLISH_MARKERS = [
    "the",
    "is",
    "are",
    "was",
    "were",
    "have",
    "has",
    "how",
    "what",
    "where",
    "when",
    "why",
    "want",
    "need",
    "order",
    "delivery",
    "return",
    "hello",
    "thank",
    "please",
]

# _SLOVAK_MARKERS = [
#     "ľ", "ĺ", "ŕ", "ô", "ä",
#     "chcem", "potrebujem", "objednávka", "reklamácia",
#     "dobrý deň", "ďakujem", "prosím",
# ]
#
# _GERMAN_MARKERS = [
#     "ü", "ö", "ä", "ß",
#     "wie", "was", "wo", "wann", "warum",
#     "bestellung", "lieferung", "reklamation",
#     "guten tag", "danke", "bitte",
# ]


def detect_language(text: str) -> str:
    """Detect the language of the input text.

    Uses simple heuristic matching. Returns ISO 639-1 code.

    Known issues:
    - Slovak is often misdetected as Czech (similar vocabulary)
    - Short texts (< 10 chars) default to Czech
    - Mixed-language texts return the dominant language
    """
    if not text or len(text.strip()) < 3:
        return "cs"  # Default to Czech

    text_lower = text.lower()

    # Count marker matches for each language
    cs_score = sum(1 for marker in _CZECH_MARKERS if marker in text_lower)
    en_score = sum(1 for marker in _ENGLISH_MARKERS if marker in text_lower)

    # Bias toward Czech (primary market)
    cs_score *= 1.2

    if en_score > cs_score:
        return "en"

    return "cs"


def get_greeting(language: str) -> str:
    """Get appropriate greeting for detected language."""
    greetings = {
        "cs": "Dobrý den! Jsem SmartAssist, virtuální asistent NovaTech. Jak vám mohu pomoci?",
        "en": "Hello! I'm SmartAssist, NovaTech's virtual assistant. How can I help you?",
        # "sk": "Dobrý deň! Som SmartAssist, virtuálny asistent NovaTech. Ako vám môžem pomôcť?",
        # "de": "Guten Tag! Ich bin SmartAssist, der virtuelle Assistent von NovaTech. Wie kann ich Ihnen helfen?",
    }
    return greetings.get(language, greetings["cs"])


async def translate_response(text: str, target_language: str) -> str:
    """Translate a response to the target language.

    Uses the LLM to translate responses when the knowledge base
    is in Czech but the user writes in another language.

    Status: NOT WORKING - needs proper implementation.
    """
    if target_language == "cs":
        return text  # No translation needed

    if target_language == "en":
        # TODO: Implement actual translation
        # Option 1: Use the main LLM (expensive, but quality)
        # Option 2: DeepL API (cheaper, Martin říkal že mají enterprise účet)
        # Option 3: Google Translate API
        #
        # Zatím vracíme originál - agent by měl odpovídat v jazyce uživatele sám
        logger.warning("Translation to '%s' not implemented, returning original text", target_language)
        return text

    # Unsupported language
    logger.warning("Translation to '%s' is not supported", target_language)
    return text


# def _normalize_slovak_to_czech(text: str) -> str:
#     """Normalize Slovak text to Czech for knowledge base search.
#
#     Slovak and Czech are similar enough that most KB articles
#     in Czech will match Slovak queries, but we should normalize
#     some key differences.
#
#     Experiment from 3.4. - nefunguje dobře, diacritika se rozpadá
#     """
#     replacements = {
#         "ľ": "l",
#         "ĺ": "l",
#         "ŕ": "r",
#         "ô": "o",
#         "ä": "a",
#         "ď": "d",
#         "ť": "t",
#         "ň": "n",
#     }
#     for sk_char, cz_char in replacements.items():
#         text = text.replace(sk_char, cz_char)
#     return text


# class TranslationCache:
#     """Cache for translated responses to avoid repeated API calls.
#
#     TODO: Implement with Redis or in-memory LRU cache
#     """
#
#     def __init__(self, max_size: int = 1000):
#         self._cache: dict[str, str] = {}
#         self.max_size = max_size
#
#     def get(self, text: str, target_lang: str) -> str | None:
#         key = f"{target_lang}:{hash(text)}"
#         return self._cache.get(key)
#
#     def set(self, text: str, target_lang: str, translated: str) -> None:
#         if len(self._cache) >= self.max_size:
#             # Evict oldest entries - TODO: proper LRU
#             oldest_keys = list(self._cache.keys())[:100]
#             for key in oldest_keys:
#                 del self._cache[key]
#         key = f"{target_lang}:{hash(text)}"
#         self._cache[key] = translated

from transformers import pipeline

translator = pipeline("translation_en_to_fr", model="Helsinki-NLP/opus-mt-en-fr")

def translate_text(text: str, target_lang: str = "fr") -> str:
    # For demo, only en->fr; extend with more models as needed
    result = translator(text)
    return result[0]["translation_text"]

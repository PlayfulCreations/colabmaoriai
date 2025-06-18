from transformers import pipeline

analyzer = pipeline("sentiment-analysis")

def analyze_sentiment(text: str) -> str:
    result = analyzer(text)
    return result[0]["label"]

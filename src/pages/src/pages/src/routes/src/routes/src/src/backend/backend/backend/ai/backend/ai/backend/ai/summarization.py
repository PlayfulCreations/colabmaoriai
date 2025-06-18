from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def summarize_text(text: str) -> str:
    result = summarizer(text, max_length=60, min_length=20, do_sample=False)
    return result[0]["summary_text"]

from transformers import pipeline

# Use small, free model for demo; swap for larger if resources allow
generator = pipeline("text-generation", model="gpt2")

def generate_text(prompt: str, max_length: int = 80) -> str:
    out = generator(prompt, max_length=max_length, num_return_sequences=1)
    return out[0]["generated_text"]

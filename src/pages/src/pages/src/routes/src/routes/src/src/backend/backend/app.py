import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Depends
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlitedict import SqliteDict
from typing import List
from ai.text_generation import generate_text
from ai.translation import translate_text
from ai.summarization import summarize_text
from ai.sentiment import analyze_sentiment

app = FastAPI()

# CORS for frontend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATASET_PATH = "./datasets"
os.makedirs(DATASET_PATH, exist_ok=True)
USER_DB_PATH = "./users.db"

# --- User Management (very basic) ---
def get_user_db():
    return SqliteDict(USER_DB_PATH, autocommit=True)

class User(BaseModel):
    username: str
    password: str

@app.post("/api/login")
def login(user: User):
    db = get_user_db()
    pwd = db.get(user.username)
    if pwd != user.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": user.username}

@app.post("/api/register")
def register(user: User):
    db = get_user_db()
    if user.username in db:
        raise HTTPException(status_code=400, detail="User exists")
    db[user.username] = user.password
    return {"msg": "Registered"}

# --- Dataset Upload/Download ---
@app.post("/api/datasets/upload")
async def upload_dataset(file: UploadFile = File(...)):
    file_location = os.path.join(DATASET_PATH, file.filename)
    with open(file_location, "wb") as f:
        content = await file.read()
        f.write(content)
    return {"filename": file.filename}

@app.get("/api/datasets/list")
def list_datasets():
    return {"datasets": os.listdir(DATASET_PATH)}

@app.get("/api/datasets/download/{filename}")
def download_dataset(filename: str):
    file_location = os.path.join(DATASET_PATH, filename)
    if not os.path.exists(file_location):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_location, filename=filename)

# --- AI Endpoints ---
class TextInput(BaseModel):
    text: str

@app.post("/api/ai/generate")
def ai_generate(input: TextInput):
    result = generate_text(input.text)
    return {"generated": result}

@app.post("/api/ai/translate")
def ai_translate(text: str = Form(...), target_lang: str = Form(...)):
    result = translate_text(text, target_lang)
    return {"translated": result}

@app.post("/api/ai/summarize")
def ai_summarize(input: TextInput):
    result = summarize_text(input.text)
    return {"summary": result}

@app.post("/api/ai/sentiment")
def ai_sentiment(input: TextInput):
    sentiment = analyze_sentiment(input.text)
    return {"sentiment": sentiment}

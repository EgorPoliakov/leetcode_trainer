from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from db import models
from db import schemas
from db.database import engine, SessionLocal
import crud

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get('/')
def root():
    return {'message': 'hello world!'}

@app.get('/questions/')
def read_questions(skip: int, limit: int, db: Session = Depends(get_db)):
    questions = crud.read_question(db, skip, limit)
    return questions

@app.get('/cards/', response_model=list[schemas.QuestionCardRead])
def read_cards(skip: int, limit: int, db: Session = Depends(get_db)):
    cards = crud.read_cards(db, skip, limit)
    return cards

@app.post('/questions/')
def create_question(question: schemas.QuestionCreate, db: Session = Depends(get_db)):
    created_question = crud.create_question(db, question)
    return created_question

@app.post('/cards/')
def create_card(question: schemas.QuestionCardCreate, db: Session = Depends(get_db)):
    created_card = crud.create_card(db, question)
    return created_card





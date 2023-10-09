from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from db import models
from db import schemas
from db.database import engine, SessionLocal
from pathlib import Path
import crud

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get('/test-db')
def create_test_db(db: Session = Depends(get_db)):
    question = schemas.QuestionCreate(
        title='test question',
        url='http://test_url.com',
        difficulty=2,
        is_premium=False
    )

    created_question = crud.create_question(db, question)

    deck = schemas.DeckCreate(
        title='test deck',
        difficulty=2,
        description='this is a test deck'
    )

    created_deck = crud.create_deck(db, deck)

    card = schemas.QuestionCardCreate(
        question_id=created_question.id, 
        type=0,
        deck_id=created_deck.id
    )

    created_card = crud.create_card(db, card)
    
    return created_deck


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
    print(cards[0].__dict__)
    return cards

@app.get('/decks', response_model=list[schemas.DeckReadSimple])
def read_decks(skip: int, limit: int, db: Session = Depends(get_db)):
    decks = crud.read_decks(db, skip, limit)
    return decks

@app.get('/decks/{deck_id}', response_model=schemas.DeckRead)
def read_deck(deck_id: int, db: Session = Depends(get_db)):
    deck = crud.read_deck(db, deck_id)
    return deck

@app.get('/reviews/', response_model=list[schemas.QuestionReviewRead])
def read_reviews(skip: int, limit: int, db: Session = Depends(get_db)):
    reviews = crud.read_reviews(db, skip, limit)
    print(reviews[0].__dict__)
    return reviews

@app.post('/questions/')
def create_question(question: schemas.QuestionCreate, db: Session = Depends(get_db)):
    created_question = crud.create_question(db, question)
    return created_question

@app.post('/cards/')
def create_card(question: schemas.QuestionCardCreate, db: Session = Depends(get_db)):
    created_card = crud.create_card(db, question)
    return created_card

@app.post('/decks/')
def create_deck(deck: schemas.DeckCreate, db: Session = Depends(get_db)):
    created_deck = crud.create_deck(db, deck)
    return created_deck

@app.put('/reviews/{review_id}', response_model=schemas.QuestionReviewRead)
def update_review(review_id, question_review: schemas.QuestionReviewUpdate, db: Session = Depends(get_db)):
    quality = question_review.quality
    updated_review = crud.update_review(db, review_id, quality)
    return updated_review


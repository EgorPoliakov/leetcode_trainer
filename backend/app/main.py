from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from app.cards.db import models
from app.cards.db import schemas
from app.database import engine
from app.cards import crud
from app.dependencies import get_db
from app.cards.routers import cards, decks, questions, reviews

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

app.include_router(cards.router)
app.include_router(decks.router)
app.include_router(questions.router)
app.include_router(reviews.router)

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



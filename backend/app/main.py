import os
from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy.orm import Session
from app.cards.db import models
from app.cards.db import schemas
from app.database import engine
from app.cards import crud
from app.dependencies import get_db
from app.cards.routers import cards, decks, questions, reviews
from app.auth.auth import auth_app

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

app.mount('/auth', auth_app)
app.include_router(cards.router)
app.include_router(decks.router)
app.include_router(questions.router)
app.include_router(reviews.router)

@app.get('/test-db')
def create_test_db(db: Session = Depends(get_db)):
    question = schemas.QuestionCreate(
        title='Two Sum',
        url='https://leetcode.com/problems/two-sum',
        difficulty=0,
        is_premium=False
    )

    question2 = schemas.QuestionCreate(
        title='Longest Common Prefix',
        url='https://leetcode.com/problems/longest-common-prefix',
        difficulty=0,
        is_premium=False
    )

    created_question = crud.create_question(db, question)
    created_question2 = crud.create_question(db, question2)
    question_id1 = created_question.id
    question_id2 = created_question2.id

    deck = schemas.DeckCreate(
        title='Easy questions',
        difficulty=0,
        description='A deck with easy questions'
    )

    created_deck = crud.create_deck(db, deck)

    card1 = schemas.QuestionCardCreate(
        question_id=question_id1, 
        type=0,
        deck_id=created_deck.id
    )

    card2 = schemas.QuestionCardCreate(
        question_id=question_id2,
        type=0,
        deck_id=created_deck.id
    )
    created_card = crud.create_card(db, card1)
    created_card2 = crud.create_card(db, card2)
    
    return created_deck

@app.get('/')
def root(request: Request):
    user = request.session.get('user')
    if user:
        name = user['name']
        return {'message': user}
    
    return {'message': 'hello world!'}
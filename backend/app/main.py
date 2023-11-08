import os
from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy.orm import Session
from app.cards import models
from app.cards import schemas
from app.database import engine
from app.cards import crud
from app.dependencies import get_db, get_current_user
from app.cards.cards import cards_app
from app.auth.auth import auth_app

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

origins = ["http://localhost", "http://localhost:3000", "http://127.0.0.1:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = os.environ['SECRET_KEY']
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

app.mount('/auth', auth_app)
app.mount('/cards', cards_app)

@app.get('/test-db')
def create_test_db(db: Session = Depends(get_db)):
    question = schemas.QuestionCreate(
        title='Two Sum',
        url='https://leetcode.com/problems/two-sum',
        difficulty=0,
        is_premium=False,
        question_tag_ids=[{"id": 1}],
        question_sub_tag_ids=[{"id": 1}]
    )

    question2 = schemas.QuestionCreate(
        title='Longest Common Prefix',
        url='https://leetcode.com/problems/longest-common-prefix',
        difficulty=0,
        is_premium=False,
        question_tag_ids=[{"id": 1}],
        question_sub_tag_ids=[{"id": 1}]
    )

    created_question = crud.create_question(db, question)
    created_question2 = crud.create_question(db, question2)
    question_id1 = created_question.id
    question_id2 = created_question2.id

    deck = schemas.DeckCreate(
        title='Easy questions',
        difficulty=0,
        description='A deck with easy questions',   
        question_tag_id=1     
    )

    created_deck = crud.create_deck(db, deck)

    card1 = schemas.QuestionCardCreate(
        question_id=question_id1, 
        type=0,
        deck_id=created_deck.id,
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
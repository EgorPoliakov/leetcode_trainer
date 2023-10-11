from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.cards.db import schemas
from app.cards import crud
from app.dependencies import get_db

router = APIRouter()

@router.get('/cards', response_model=list[schemas.QuestionCardRead])
def read_cards(skip: int, limit: int, db: Session = Depends(get_db)):
    cards = crud.read_cards(db, skip, limit)
    return cards

@router.post('/cards/')
def create_card(question: schemas.QuestionCardCreate, db: Session = Depends(get_db)):
    created_card = crud.create_card(db, question)
    return created_card
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app.cards.db import schemas
from app.cards import crud
from app.dependencies import get_db

router = APIRouter()

@router.get('/decks', response_model=list[schemas.DeckRead])
def read_decks(skip: int, limit: int, db: Session = Depends(get_db)):
    decks = crud.read_decks(db, skip, limit)
    return decks

@router.get('/decks/{deck_id}', response_model=schemas.DeckRead)
def read_deck(deck_id: int, db: Session = Depends(get_db)):
    deck = crud.read_deck(db, deck_id)
    return deck

@router.get('/decks/{deck_id}/study', response_model=list[schemas.QuestionCardRead])
def read_deck_for_study(deck_id: int, db: Session = Depends(get_db)):
    deck = crud.read_deck_for_study(db, deck_id)
    return deck

@router.post('/decks/')
def create_deck(deck: schemas.DeckCreate, db: Session = Depends(get_db)):
    created_deck = crud.create_deck(db, deck)
    return created_deck
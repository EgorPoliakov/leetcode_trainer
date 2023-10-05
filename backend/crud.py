from sqlalchemy.orm import Session
from db import models
from db import schemas

def create_question(db: Session, question):
    db_question = models.Question(
        title=question.title,
        url=question.url,
        difficulty=question.difficulty,
        is_premium=question.is_premium
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

def read_question(db: Session, skip: int=0, limit: int=10):
    questions = db.query(models.Question).offset(skip).limit(limit).all()
    return questions

def read_cards(db: Session, skip: int=0, limit: int=10):
    cards = db.query(models.QuestionCard).offset(skip).limit(limit).all()
    return cards

def read_reviews(db: Session, skip: int=0, limit: int=10):
    reviews = db.query(models.QuestionReview).offset(skip).limit(limit).all()
    return reviews

def create_question_review(db: Session, db_card: schemas.QuestionCardRead):
    print('card id:', db_card.id)
    db_question_review = models.QuestionReview(
        question_card_id=db_card.id
    )
    
    db.add(db_question_review)
    db.commit()
    db.refresh(db_question_review)
    return db_question_review

def create_card(db: Session, question: schemas.QuestionCardCreate):
    db_card = models.QuestionCard(
        question_id=question.question_id, 
        type=question.type,
        deck_id=question.deck_id
    )
    db.add(db_card)
    db.commit()
    

    db_question_review = create_question_review(db, db_card)
    db.refresh(db_card)
    return db_card

def read_deck(db: Session, deck_id: int):
    db_deck = db.query(models.Deck).filter(models.Deck.id == deck_id)
    return db_deck

def create_deck(db: Session, deck: schemas.DeckCreate):
    db_deck = models.Deck(
        title=deck.title,
        difficulty=deck.difficulty,
        description=deck.description
    )

    db.add(db_deck)
    db.commit()
    db.refresh(db_deck)
    return db_deck


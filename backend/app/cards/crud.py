from sqlalchemy.orm import Session
from app.cards.db import models
from app.cards.db import schemas
from app.supermemo2 import SMTwo
from datetime import date

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

def read_deck_for_study(db: Session, deck_id):
    cards = (
        db
        .query(models.QuestionCard)
        .join(models.QuestionReview)
        .filter(models.QuestionReview.review_date <= date.today())
        .filter(models.QuestionCard.deck_id == deck_id)
    )
    
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
    db_deck = db.query(models.Deck).filter(models.Deck.id == deck_id).first()
    return db_deck

def read_decks(db: Session, skip: int=0, limit: int=100):
    db_decks = db.query(models.Deck).offset(skip).limit(limit).all()
    for deck in db_decks:
        deck.cards_learned = 0
        deck.cards_studying = 0
        deck.cards_to_review = 0

        for card in deck.question_cards:
            if card.question_reviews[0].review_date <= date.today():
                deck.cards_to_review += 1
            if card.question_reviews[0].easiness > 2.5:
                deck.cards_learned += 1
            else:
                deck.cards_studying += 1  

    return db_decks

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

def update_review(db: Session, review_id: int, quality: int):
    db_review = db.query(models.QuestionReview).filter(models.QuestionReview.id == review_id).first()
    if db_review.first_review:
        sm2_review = SMTwo.first_review(
            quality=quality, 
            review_date=db_review.review_date
        )
        db_review.first_review = False
    else:
        sm2_review = SMTwo(db_review.easiness, db_review.interval, db_review.repetitions).review(
            quality=quality,
            review_date=db_review.review_date,
        )

    db_review.easiness = sm2_review.easiness
    db_review.interval = sm2_review.interval
    db_review.repetitions = sm2_review.repetitions
    db_review.review_date = sm2_review.review_date

    db.add(db_review)
    db.commit()
    return db_review


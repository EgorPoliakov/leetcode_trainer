from sqlalchemy import or_, and_
from sqlalchemy.orm import Session
from app.cards import models
from app.cards import schemas
from app.auth.schemas import GoogleUser
from app.supermemo2 import SMTwo
from datetime import date

def create_question(db: Session, question: schemas.QuestionCreate):
    db_question = models.Question(
        title=question.title,
        url=question.url,
        difficulty=question.difficulty,
        is_premium=question.is_premium
    )

    for tag in question.question_tag_ids:
        db_tag = db.query(models.QuestionTag).get(tag.id)
        db_question.question_tags.append(db_tag)
        db_tag.questions.append(db_question)

    for sub_tag in question.question_sub_tag_ids:
        db_sub_tag = db.query(models.QuestionSubTag).get(sub_tag.id)
        db_question.question_sub_tags.append(db_sub_tag)
        db_sub_tag.questions.append(db_question)

    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

def read_questions(db: Session, skip: int=0, limit: int=10):
    questions = db.query(models.Question).offset(skip).limit(limit).all()
    return questions

def read_cards(db: Session, skip: int=0, limit: int=10):
    cards = db.query(models.QuestionCard).offset(skip).limit(limit).all()
    return cards

def read_deck_for_study(db: Session, deck_id: int, user_id: str):
    cards = (
        db
        .query(models.QuestionCard)
        .join(models.QuestionCard.decks)
        .filter(models.Deck.id == deck_id)
        .outerjoin(models.QuestionReview)
        .filter(or_(models.QuestionReview.id.is_(None), models.QuestionReview.user_id == user_id))
        .all()
    )
    return cards

def read_reviews(db: Session, skip: int=0, limit: int=10):
    reviews = db.query(models.QuestionReview).offset(skip).limit(limit).all()
    return reviews

def read_user_reviews(db: Session, user_id: str):
    user_reviews = db.query(models.QuestionReview).filter(models.QuestionReview.user_id == user_id).all()
    return user_reviews

def create_review(db: Session, review: schemas.QuestionReviewCreate):
    db_question_review = models.QuestionReview(
        question_card_id=review.question_card_id,
        user_id=review.user_id,
        easiness=2.5,
        interval=0,
        repetitions=0,
        review_date=date.today()
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

    db.refresh(db_card)
    return db_card

def read_deck(db: Session, deck_id: int):
    db_deck = db.query(models.Deck).filter(models.Deck.id == deck_id).first()
    return db_deck

def read_decks(db: Session, skip: int=0, limit: int=100):
    db_decks = db.query(models.Deck).offset(skip).limit(limit).all()
    return db_decks

def read_user_decks(db: Session, user: GoogleUser, skip: int=0, limit: int=100):
    db_decks = db.query(models.Deck).offset(skip).limit(limit).all()

    for deck in db_decks:
        deck.cards_learned = 0
        deck.cards_studying = 0
        deck.cards_to_review = 0
        deck.cards_new = 0

        for card in deck.question_cards:
            user_review = None
            for review in card.question_reviews:
                if (review.user_id == user.id):
                    user_review = review
                    break

            if user_review is None:
                deck.cards_new += 1
            else:
                if user_review.review_date <= date.today():
                    deck.cards_to_review += 1
                if user_review.easiness >= 2:
                    deck.cards_learned += 1
                else:
                    deck.cards_studying += 1  
    return db_decks

def create_deck(db: Session, deck: schemas.DeckCreate):
    db_deck = models.Deck(
        title=deck.title,
        difficulty=deck.difficulty,
        description=deck.description,
        question_tag_id=deck.question_tag_id
    )

    db.add(db_deck)
    db.commit()
    db.refresh(db_deck)
    return db_deck

def update_review(db: Session, review_id: int, quality: int):
    db_review = db.query(models.QuestionReview).filter(models.QuestionReview.id == review_id).first()
    
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

def create_question_tag(db: Session, tag_name: str):
    db_tag = models.QuestionTag(
        name=tag_name
    )
    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)
    return db_tag

def create_question_sub_tag(db:Session, sub_tag_name: str):
    db_sub_tag = models.QuestionSubTag(
        name=sub_tag_name
    )
    db.add(db_sub_tag)
    db.commit()
    db.refresh(db_sub_tag)
    return db_sub_tag

def read_question_tags(db: Session, skip: int=0, limit: int=100):
    db_tag = db.query(models.QuestionTag).offset(skip).limit(limit).all()
    return db_tag

def read_question_sub_tags(db: Session, skip: int=0, limit: int=100):
    db_sub_tag = db.query(models.QuestionSubTag).offset(skip).limit(limit).all()
    return db_sub_tag
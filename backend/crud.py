from sqlalchemy.orm import Session
from db import models
from db import schemas

def create_question(db: Session, question):
    db_question = models.Question(
        title=question.title,
        description=question.description,
        url=question.url,
        difficulty=question.difficulty
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

def read_question(db: Session, skip: int, limit: int):
    questions = db.query(models.Question).offset(skip).limit(limit).all()
    return questions

def read_cards(db: Session, skip: int, limit: int):
    cards = db.query(models.QuestionCard).offset(skip).limit(limit).all()
    return cards

def create_question_review(db: Session):
    db_question_review = models.QuestionReview()
    db.add(db_question_review)
    db.commit()
    db.refresh(db_question_review)
    return db_question_review

def create_card(db: Session, question: schemas.QuestionCardCreate):
    db_question_review = create_question_review(db)
    db_card = models.QuestionCard(question_id=question.question_id, question_review_id=db_question_review.id)
    db.add(db_card)
    db.commit()
    db.refresh(db_card)
    return db_card
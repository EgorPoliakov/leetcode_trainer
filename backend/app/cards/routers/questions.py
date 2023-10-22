from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.cards import schemas
from app.cards import crud
from app.dependencies import get_db

router = APIRouter()

@router.get('/questions/')
def read_questions(skip: int, limit: int, db: Session = Depends(get_db)):
    questions = crud.read_question(db, skip, limit)
    return questions

@router.post('/questions/')
def create_question(question: schemas.QuestionCreate, db: Session = Depends(get_db)):
    created_question = crud.create_question(db, question)
    return created_question

@router.get('/reviews/', response_model=list[schemas.QuestionReviewRead])
def read_reviews(skip: int, limit: int, db: Session = Depends(get_db)):
    reviews = crud.read_reviews(db, skip, limit)
    return reviews

@router.put('/reviews/{review_id}', response_model=schemas.QuestionReviewRead)
def update_review(review_id, question_review: schemas.QuestionReviewUpdate, db: Session = Depends(get_db)):
    quality = question_review.quality
    updated_review = crud.update_review(db, review_id, quality)
    return updated_review
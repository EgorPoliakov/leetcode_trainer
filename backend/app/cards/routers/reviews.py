from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.cards import schemas
from app.auth.schemas import GoogleUser
from app.cards import crud
from app.dependencies import get_db, get_current_user

router = APIRouter()

@router.get('/reviews/', response_model=list[schemas.QuestionReviewRead])
def read_reviews(skip: int, limit: int, db: Session = Depends(get_db)):
    reviews = crud.read_reviews(db, skip, limit)
    return reviews

@router.get('/reviews/user/{user_id}', response_model=list[schemas.QuestionReviewRead])
def read_reviews(user_id: int, db: Session = Depends(get_db)):
    user_reviews = crud.read_user_reviews(db, user_id)
    return user_reviews

@router.put('/reviews/{review_id}', response_model=schemas.QuestionReviewRead)
def update_review(review_id, question_review: schemas.QuestionReviewUpdate, db: Session = Depends(get_db)):
    quality = question_review.quality
    updated_review = crud.update_review(db, review_id, quality)
    return updated_review

@router.post('/reviews/')
def create_review(review: schemas.QuestionReviewCreate, db: Session = Depends(get_db), user: GoogleUser = Depends(get_current_user)):
    print('CREAAAAAAAAAAAAAAATE')
    if (user.id != review.user_id):
        raise HTTPException(status_code=422, detail='Session user and local user don\'t match!')
    review.user_id = user.id
    created_review = crud.create_review(db, review)
    return created_review
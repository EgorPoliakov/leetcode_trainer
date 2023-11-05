from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.cards import schemas
from app.cards import crud
from app.dependencies import get_db

router = APIRouter()

@router.get('/questions/', response_model=list[schemas.QuestionRead])
def read_questions(skip: int, limit: int, db: Session = Depends(get_db)):
    questions = crud.read_questions(db, skip, limit)
    return questions

@router.post('/questions/')
def create_question(question: schemas.QuestionCreate, db: Session = Depends(get_db)):
    created_question = crud.create_question(db, question)
    return created_question


from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.cards import schemas
from app.cards import crud
from app.dependencies import get_db

router = APIRouter()

@router.get('/tags', response_model=list[schemas.QuestionTagRead])
def read_tags(skip: int, limit: int, db: Session = Depends(get_db)):
    tags = crud.read_question_tags(db, skip, limit)
    return tags

@router.post('/tags/')
def create_tag(tag: schemas.QuestionTagCreate, db: Session = Depends(get_db)):
    created_tag = crud.create_question_tag(db, tag.name)
    return created_tag
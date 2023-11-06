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

@router.get('/subtags', response_model=list[schemas.QuestionSubTagRead])
def read_subtags(skip: int, limit: int, db: Session = Depends(get_db)):
    sub_tags = crud.read_question_sub_tags(db, skip, limit)
    return sub_tags

@router.post('/tags/')
def create_tag(tag: schemas.QuestionTagCreate, db: Session = Depends(get_db)):
    created_tag = crud.create_question_tag(db, tag.name)
    return created_tag

@router.post('/subtags/')
def create_sub_tag(sub_tag: schemas.QuestionSubTagCreate, db: Session = Depends(get_db)):
    created_sub_tag = crud.create_question_sub_tag(db, sub_tag.name)
    return created_sub_tag
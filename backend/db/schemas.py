from pydantic import BaseModel
from datetime import datetime

class QuestionCreate(BaseModel):
    title: str
    url: str
    difficulty: str
    in_premium: bool

    class Config:
        from_attributes = True

class QuestionRead(QuestionCreate):
    id: int

class QuestionReview(BaseModel):
    id: int
    easiness: int
    interval: int
    repetitions: int
    review_date: datetime

    class Config:
        from_attributes = True

class QuestionCardCreate(BaseModel):
    question_id: int

    class Config:
        from_attributes = True

class QuestionCardRead(BaseModel):
    id: int
    question: QuestionRead
    question_review: QuestionReview

    class Config:
        from_attributes = True

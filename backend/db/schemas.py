from pydantic import BaseModel
from datetime import datetime

class QuestionCreate(BaseModel):
    title: str
    url: str
    difficulty: str
    is_premium: bool

    class Config:
        from_attributes = True

class QuestionRead(QuestionCreate):
    id: int

class QuestionReviewCreate(BaseModel):
    question_card_id: int
    easiness: int
    interval: int
    repetitions: int
    review_date: datetime

    class Config:
        from_attributes = True

class QuestionReviewRead(QuestionReviewCreate):
    id: int

class QuestionCardCreate(BaseModel):
    question_id: int
    type: int
    deck_id: int

    class Config:
        from_attributes = True

class QuestionCardRead(BaseModel):
    id: int
    type: int
    question: QuestionRead
    question_reviews: list[QuestionReviewRead]
    
    class Config:
        from_attributes = True

class DeckCreate(BaseModel):
    title: str
    difficulty: str
    description: str
    class Config:
        from_attributes = True

class DeckRead(DeckCreate):
    id: int
    question_cards: list[QuestionCardRead]
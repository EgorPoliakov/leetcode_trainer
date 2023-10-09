from pydantic import BaseModel
from datetime import datetime

class QuestionCreate(BaseModel):
    title: str
    url: str
    difficulty: int
    is_premium: bool

    class Config:
        from_attributes = True

class QuestionRead(QuestionCreate):
    id: int

class QuestionReviewCreate(BaseModel):
    question_card_id: int
    easiness: float
    interval: int
    repetitions: int
    first_review: bool
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
    difficulty: int
    description: str
    class Config:
        from_attributes = True

class DeckRead(DeckCreate):
    id: int
    question_cards: list[QuestionCardRead]

class DeckReadSimple(DeckCreate):
    id: int
    cards_learned: int
    cards_studying: int

class QuestionReviewUpdate(BaseModel):
    quality: int
from pydantic import BaseModel
from datetime import datetime

class QuestionTagCreate(BaseModel):
    name: str

class QuestionTagRead(QuestionTagCreate):
    id: int

class QuestionTagAssociate(BaseModel):
    id: int

class QuestionCreate(BaseModel):
    title: str
    url: str
    difficulty: int
    is_premium: bool
    tag_ids: list[QuestionTagAssociate]

    class Config:
        from_attributes = True

class QuestionRead(BaseModel):
    id: int
    title: str
    url: str
    difficulty: int
    is_premium: bool
    question_tags: list[QuestionTagRead]

class QuestionReviewBase(BaseModel):
    question_card_id: int
    user_id: str
    class Config:
        from_attributes = True

class QuestionReviewCreate(QuestionReviewBase):
    question_card_id: int
    user_id: str
    quality: int

class QuestionReviewRead(QuestionReviewBase):
    id: int
    easiness: float
    interval: int
    repetitions: int
    review_date: datetime

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
    cards_learned: int
    cards_studying: int
    cards_to_review: int

class QuestionReviewUpdate(BaseModel):
    quality: int

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship, mapped_column
from sqlalchemy.sql.functions import now
from .database import Base


class Question(Base):
    __tablename__ = 'question'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    url = Column(String)
    difficulty = Column(String)
    is_premium = Column(Boolean)
    question_card = relationship('QuestionCard', back_populates='question')

class QuestionReview(Base):
    __tablename__ = 'question_review'

    id = Column(Integer, primary_key=True, index=True)
    easiness = Column(Integer, default=0)
    interval = Column(Integer, default=0)
    repetitions = Column(Integer, default=0)
    review_date = Column(DateTime, time_zone=True, default=now())
    question_card_id = mapped_column(ForeignKey('question_card.id'))
    question_card = relationship('QuestionCard', back_populates='question_reviews')

class QuestionCard(Base):
    __tablename__ = 'question_card'

    id = Column(Integer, primary_key=True, index=True)
    question_id = mapped_column(ForeignKey('question.id'))
    deck_id = mapped_column(ForeignKey('deck.id'))
    type = Column(Integer)
    question_reviews = relationship('QuestionReview', back_populates='question_card')
    question = relationship('Question', back_populates='question_card')
    deck = relationship('Deck', back_populates='question_cards')

class Deck(Base):
    __tablename__ = 'deck'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    difficulty = Column(String)
    description = Column(String)

    question_cards = relationship('QuestionCard', back_populates='deck')
    
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, Float, Table
from sqlalchemy.orm import relationship, mapped_column
from app.database import Base

QuestionToTag = Table(
    'question_to_tag',
    Base.metadata,
    Column('question_id', Integer, ForeignKey('question.id')),
    Column('tag_id', Integer, ForeignKey('question_tag.id'))
)

QuestionToSubTag = Table(
    'question_to_sub_tag',
    Base.metadata,
    Column('question_id', Integer, ForeignKey('question.id')),
    Column('sub_tag_id', Integer, ForeignKey('question_sub_tag.id'))
)

CardToDeck = Table(
    'card_to_deck',
    Base.metadata,
    Column('card_id', Integer, ForeignKey('question_card.id')),
    Column('deck_id', Integer, ForeignKey('deck.id'))
)

class Question(Base):
    __tablename__ = 'question'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    url = Column(String)
    difficulty = Column(Integer)
    is_premium = Column(Boolean)
    likes = Column(Integer)
    dislikes = Column(Integer)
    total_submissions = Column(Integer)
    accepted_submissions = Column(Integer)

    question_card = relationship('QuestionCard', back_populates='question')
    question_tags = relationship('QuestionTag', secondary=QuestionToTag, back_populates='questions')
    question_sub_tags = relationship('QuestionSubTag', secondary=QuestionToSubTag, back_populates='questions')

class QuestionReview(Base):
    __tablename__ = 'question_review'

    id = Column(Integer, primary_key=True, index=True)
    easiness = Column(Float)
    interval = Column(Integer)
    repetitions = Column(Integer)
    review_date = Column(Date, time_zone=True)

    question_card_id = mapped_column(ForeignKey('question_card.id'))
    question_card = relationship('QuestionCard', back_populates='question_reviews')

    user_id = Column(String)

class QuestionCard(Base):
    __tablename__ = 'question_card'

    id = Column(Integer, primary_key=True, index=True)
    question_id = mapped_column(ForeignKey('question.id'))
    type = Column(Integer)
    question_reviews = relationship('QuestionReview', back_populates='question_card')
    question = relationship('Question', back_populates='question_card')
    decks = relationship('Deck', secondary=CardToDeck, back_populates='question_cards')

class Deck(Base):
    __tablename__ = 'deck'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    difficulty = Column(Integer)
    description = Column(String)
    question_tag_id = Column(Integer)
    question_cards = relationship('QuestionCard', secondary=CardToDeck, back_populates='decks')

class QuestionTag(Base):
    __tablename__ = 'question_tag'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    questions = relationship('Question', secondary=QuestionToTag, back_populates='question_tags')

class QuestionSubTag(Base):
    __tablename__ = 'question_sub_tag'
    id =  Column(Integer, primary_key=True, index=True)
    name = Column(String)
    questions = relationship('Question', secondary=QuestionToSubTag, back_populates='question_sub_tags')
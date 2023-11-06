import sys
sys.path.append('backend')
from sqlalchemy import create_engine
from app.cards.models import Question, QuestionTag
import json
from backend.app.cards.crud import create_question, create_question_tag
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.cards.models import Base

SQLALCHEMY_DATABASE_URL = "sqlite:///./backend/leetcode_trainer.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

Base.metadata.create_all(bind=engine)
# Create a session
Session = sessionmaker(bind=engine)
session = Session()

# Example JSON data

with open('sample.json', 'r') as f:
    data = json.load(f)

tag_set = set()
for question in data:
    for t in question['tag']:
        tag_set.add(t)

for tag in tag_set:
    instance = QuestionTag(
        name = tag
    )
    session.add(instance)
    session.commit()

for question in data:
    if question['difficulty'] == 'easy':
        diffuculty = 0
    elif question['difficulty'] == 'medium':
        diffuculty = 1
    else:
        diffuculty = 2
        
    instance = Question(
        title = question['title'],
        url = question['url'],
        difficulty = diffuculty,
        is_premium = True if question['is_premium'] == 'yes' else False,
    )
    
    for tag_name in question['tag']:
        session_tag = session.query(QuestionTag).filter(QuestionTag.name == tag_name).one()
        instance.question_tags.append(session_tag)
        session_tag.questions.append(instance)    
    
    session.add(instance)
    session.commit()


    
'''
def create_question(db: Session, question: schemas.QuestionCreate):
    db_question = models.Question(
        title=question.title,
        url=question.url,
        difficulty=question.difficulty,
        is_premium=question.is_premium
    )

    for tag in question.tag_ids:
        db_tag = db.query(models.QuestionTag).get(tag.id)
        db_question.question_tags.append(db_tag)
        db_tag.questions.append(db_question)

    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question
'''
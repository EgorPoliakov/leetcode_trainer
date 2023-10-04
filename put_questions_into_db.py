from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from backend.db.models import Question
import json

Base = declarative_base()

# Create SQLite in-memory database and connect to it
engine = create_engine('sqlite:///./backend/leetcode_trainer.db')
Base.metadata.create_all(engine)

# Create a session
Session = sessionmaker(bind=engine)
session = Session()

# Example JSON data

with open('leetcode-anki/questions.json', 'r') as f:
    data = json.load(f)

for question in data:
    instance = Question(
        title = question['title'],
        url = question['url'],
        difficulty = question['difficulty'],
        is_premium = True if question['is_premium'] == 'yes' else False,
    )
    session.add(instance)
    session.commit()
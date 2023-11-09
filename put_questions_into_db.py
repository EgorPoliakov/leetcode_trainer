import sys
sys.path.append('backend')
from sqlalchemy import create_engine
from app.cards.models import Question, Deck, QuestionTag, QuestionSubTag, QuestionCard
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
    
# create difficulty map for deck
deck_difficulty_map = {}
for topic in ['Two Pointers', 'Binary Search', 'Linked List', 'String', 'Stack', 'Hash Map']:
    deck_difficulty_map[topic] = 0
for topic in ['Recursion', 'Design', 'Heap', 'DFS', 'BFS', 'Heap', 'Greedy', 'Priority Queue']:
    deck_difficulty_map[topic] = 1
for topic in ['Graph', 'Trie', 'Dynamic Programming', 'Union Find', 'Tree', 'Simulation']:
    deck_difficulty_map[topic] = 2
for topic in ['Divide and Conquer', 'Math', 'Binary Index Tree', 'Others', 'Thinking', 'Segment Tree', 'Bit Manipulation', 'Deque', 'Simulation'
]:
    deck_difficulty_map[topic] = 3

# Collect all tag from questions
tag_set = set()
sub_tag_set = set()
for question in data:
    for t in question['tag']:
        tag_set.add(t)
    for t in question['sub_tag']:
        sub_tag_set.add(t)

# Put tag into table
for i, tag in enumerate(tag_set):
    instance = QuestionTag(
        name = tag
    )
    session.add(instance)
    session.commit()

# Put sub tag into table
for i, sub_tag in enumerate(sub_tag_set):
    instance = QuestionSubTag(
        name = sub_tag
    )
    session.add(instance)
    session.commit()
        
# Put tag into deck
for tag in tag_set:
    session_tag = session.query(QuestionTag).filter(QuestionTag.name == tag).one()
    
    instance = Deck(       
        title = tag,
        difficulty = deck_difficulty_map[tag],
        description = "description",
        question_tag_id = session_tag.id
    )
    session.add(instance)
    session.commit()    

# Put questions into table
for question in data:
    if question['difficulty'] == 'easy':
        diffuculty = 0
    elif question['difficulty'] == 'medium':
        diffuculty = 1
    else:
        diffuculty = 2
        
    question_instance = Question(
        title = question['title'],
        url = question['url'],
        difficulty = diffuculty,
        is_premium = True if question['is_premium'] == 'yes' else False,
    )
    
    for tag_name in question['tag']:
        session_tag = session.query(QuestionTag).filter(QuestionTag.name == tag_name).one()
        question_instance.question_tags.append(session_tag)
        session_tag.questions.append(question_instance)    

    session.add(question_instance)
    session.commit()
        
    for sub_tag_name in question['sub_tag']:
        session_sub_tag = session.query(QuestionSubTag).filter(QuestionSubTag.name == sub_tag_name).one()
        question_instance.question_sub_tags.append(session_sub_tag)
        session_sub_tag.questions.append(question_instance)
    
    session.add(question_instance)
    session.commit()
    
    if(len(question['tag']) != 1):
        continue
    
    session_deck = session.query(Deck).filter(Deck.question_tag_id == question_instance.question_tags[0].id).one()
    
    
    card_instance = QuestionCard(
        question_id = question_instance.id,
        deck_id = session_deck.question_tag_id,
        type = 1
    )
    
    session.add(card_instance)
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


import os
from app.database import SessionLocal
from app.auth.schemas import GoogleUser
from fastapi.security import APIKeyCookie
from fastapi import Request, HTTPException
import itsdangerous



SECRET_KEY = os.environ['SECRET_KEY']

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(request: Request):
    user = request.session.get('user')
    if user is None:
        raise HTTPException(status_code=401, detail='Not authenticated')
    user['id'] = str(user['id'])
    return GoogleUser(**user)


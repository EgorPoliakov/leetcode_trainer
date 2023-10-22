from fastapi import FastAPI, Depends
from app.cards.routers import cards, decks, questions, reviews
from app.dependencies import get_current_user

cards_app = FastAPI(dependencies=[Depends(get_current_user)])

cards_app.include_router(cards.router)
cards_app.include_router(decks.router)
cards_app.include_router(questions.router)
cards_app.include_router(reviews.router)
from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def root():
    return {'message': 'hello world!'}

@app.get('/home')
def home():
    return {'message': 'home'}

@app.get('/item/{item_id}')
def get_items(item_id: int):
    return {'id': item_id}
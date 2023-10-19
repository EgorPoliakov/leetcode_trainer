import os
from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse
from starlette.middleware.sessions import SessionMiddleware
from authlib.integrations.starlette_client import OAuthError
from app.dependencies import get_oauth


auth_app = FastAPI()

SECRET_KEY = os.environ.get('SECRET_KEY') or None
if SECRET_KEY is None:
    raise 'Missing SECRET_KEY'

auth_app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

@auth_app.get('/login')
async def login(request: Request):
    oauth = get_oauth()
    redirect_uri = request.url_for('auth')  # This creates the url for the /auth endpoint
    return await oauth.google.authorize_redirect(request, redirect_uri)

@auth_app.get('/auth')
async def auth(request: Request):
    oauth = get_oauth()
    try:
        access_token = await oauth.google.authorize_access_token(request)
    except OAuthError:
        return RedirectResponse(url='/')

    request.session['user'] = dict(access_token['userinfo'])
    return RedirectResponse(url='/')

@auth_app.get('/')
def root(request: Request):
    user = request.session.get('user')
    if user:
        name = user['name']
        return {'message': f'hello {name}'}
    
    return {'message': 'hello world!'}

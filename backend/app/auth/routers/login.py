from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuthError
from app.dependencies import get_oauth

auth_app = FastAPI()

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
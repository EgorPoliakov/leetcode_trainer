import os
from urllib.parse import urlencode
import httpx
from fastapi import FastAPI
from fastapi import Request
from starlette.responses import JSONResponse

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID') or None
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET') or None

auth_app = FastAPI()

@auth_app.post('/login')
async def login(request: Request):
    request_data = await request.json()
    target_url = "https://oauth2.googleapis.com/token"

    # Prepare headers if needed
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        # Add any other headers as needed
    }

    data = {
        'code': request_data['code'],
        'client_id': GOOGLE_CLIENT_ID,
        'client_secret': GOOGLE_CLIENT_SECRET,
        'redirect_uri': 'http://localhost:3000',
        'grant_type': 'authorization_code',
    }

    encoded_data = urlencode(data)
    # Make the POST request using httpx
    async with httpx.AsyncClient() as client:
        response = await client.post(target_url, data=encoded_data, headers=headers)
    if response.status_code != 200:
        return {"message": "POST request failed", "response_status_code": response.text}
    
    response_data = response.json()
    access_token = response_data['access_token']
    userinfo_url = f'https://www.googleapis.com/oauth2/v1/userinfo?access_token={access_token}'
    
    async with httpx.AsyncClient() as client:
        response = await client.get(userinfo_url)
    
    if response.status_code != 200:
        return {"message": "GET request failed", "response_status_code": response.text}
    
    request.session['user'] = response.json()
    return JSONResponse(content={"user": response.json()})

@auth_app.get('/logout')
def logout(request: Request):
    request.session.pop('user');
    return {'message': 'logged out successfuly'}
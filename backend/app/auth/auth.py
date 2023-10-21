import os
from urllib.parse import urlencode
import httpx
from fastapi import FastAPI
from app.auth.schemas import GoogleAuthRequest

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID') or None
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET') or None

auth_app = FastAPI()

@auth_app.post('/login')
async def login(request: GoogleAuthRequest):
    target_url = "https://oauth2.googleapis.com/token"

    # Prepare headers if needed
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        # Add any other headers as needed
    }

    data = {
        'code': request.code,
        'client_id': GOOGLE_CLIENT_ID,
        'client_secret': GOOGLE_CLIENT_SECRET,
        'redirect_uri': 'http://localhost:3000',
        'grant_type': 'authorization_code',
    }

    encoded_data = urlencode(data)
    print(encoded_data)
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
    
    print(response.json())
    return {"message": "POST request successful", "response_content": response.text}

        
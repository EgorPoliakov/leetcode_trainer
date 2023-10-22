from pydantic import BaseModel

class GoogleUser(BaseModel):
    email: str
    name: str
    picture: str
    id: str
from pydantic import BaseModel


class User(BaseModel):

    address: str
    avatar_url: str
    avatar_address: str
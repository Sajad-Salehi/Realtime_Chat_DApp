from pydantic import BaseModel


class User(BaseModel):
    id: int
    address: str
    metadata: str
    opensea_url: str


class UserMetadata(BaseModel):
    id: int
    username: str
    biography: str
    image_url: str
    opensea_url: str


class UserAddress(BaseModel):
    address: str
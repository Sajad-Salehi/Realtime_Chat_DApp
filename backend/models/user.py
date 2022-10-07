from ctypes import addressof
from pydantic import BaseModel


class User(BaseModel):
    address: str
    avatar_url: str
    avatar_address: str


class UserAddress(BaseModel):
    address: str
import requests
from fastapi import FastAPI
from config.db import collection
from models.user import User, UserAddress, UserMetadata
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/authenticate")
async def authenticate(info: UserAddress):

    user_address = dict(info)
    data = collection.find_one({"address": user_address["address"]})
    if(data != None):
        return {"status": "ok"}
    else:
        return {"status": "false"}


@app.post("/register")
async def register(user: User):
    
    collection.insert_one(dict(user))
    return {"status": "ok"}


@app.post("/getUserInfo")
async def getUserMetadata(info: UserAddress):

    user_address = dict(info)
    data = collection.find_one({"address": user_address["address"]})

    if(data):

        url = data["metadata"]
        r = requests.get(url)
        metadata = dict(r.json())

        userMetadata = UserMetadata(
            id = data["id"], 
            username = metadata["name"],
            biography = metadata["description"], 
            image_url = metadata["image"], 
            opensea_url = data["opensea_url"]
        )
        return userMetadata
    
    return {"status": "false"}


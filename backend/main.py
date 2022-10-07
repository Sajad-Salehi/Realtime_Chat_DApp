from fastapi import FastAPI
from models.user import User, UserAddress
from config.db import collection
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

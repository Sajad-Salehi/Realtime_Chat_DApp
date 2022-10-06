from fastapi import FastAPI
from models.user import User
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
async def authenticate(address: str):
    
    status = "false"
    user = collection.find_one({"address": str(address)})
    if(user):
        return {"status": status}



@app.post("/register")
async def register(user: User):
    
    collection.insert_one(dict(user))
    return {"status": "ok"}

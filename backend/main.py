
from fastapi import FastAPI


app = FastAPI()

@app.get("/")
async def home():
    
    return "hello world"


@app.get("/register")
async def register():
    pass


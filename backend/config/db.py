import os
from pymongo import MongoClient


client = MongoClient("")
db = client.chat_dapp
collection = db["users"]


import os
from pymongo import MongoClient


client = MongoClient(os.getenv('MONGODB'))
db = client.chat_dapp

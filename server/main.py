from fastapi import FastAPI
from db_connection import get_heath, get_logs

app = FastAPI()

@app.get("/", tags=["ROOT"])
async def root_page():
    return {"PING" : "PONG"}



@app.get("/health")
async def get_health_data():
    return get_heath().get()



    

   
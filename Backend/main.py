from fastapi import FastAPI
from db import create_db_and_tables
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routers import users, admin, cart, Order, recommendation, review
import uvicorn
import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)

app = FastAPI()

origin = 'https://mboacaco.vercel.app'

app.add_middleware(
    CORSMiddleware,
    allow_origins = [origin],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

app.mount("/images", StaticFiles(directory="dbImages"), name="dbImages")
    

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

## user registration and authentication
app.include_router(users.router)
## admin  crud
app.include_router(admin.router)
## cart functions
app.include_router(cart.router)
## order functionalities
app.include_router(Order.router)
## products
app.include_router(recommendation.router)

app.include_router(review.router)

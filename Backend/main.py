from fastapi import FastAPI,Depends, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routers import users, admin, cart, Order, products, review
from db import engine, create_db_and_tables
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends

app = FastAPI()

origin = "http://localhost:5173"

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
app.include_router(products.router)

app.include_router(review.router)

import os 
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    SECRET_KEY: str = "741sdf852re3sdf0sdr7rtjb455s741fgas411f7896214852815rf517416"
    ACCESS_TOKEN_EXPIRE_MINUTES:int = "30"
    ALGORITHM:str = "HS256"
    DB_URL:str = "mysql+pymysql://root@localhost:3306/mboakako"
    STRIPE_SECRET_KEY:str ="sk_test_51S7yy7LN8y6tjoNtX5VMsILkvcoHvYMa1SIP24FqBoQUfvEZvoIIRIrkpKsg8mPa9zAnGRecN7w5mvqjOADiA9zu00JqCX3Z9r"

    class Config:
        env_file = ".env"

settings = Settings() 
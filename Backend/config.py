import os 
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    ACCESS_TOKEN_EXPIRE_MINUTES:int = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
    ALGORITHM:str = os.getenv("ALGORITHM")
    DB_URL:str = os.getenv("DB_URL")
    STRIPE_SECRET_KEY:str = os.getenv("STRIPE_SECRET_KEY")

    class Config:
        env_file = ".env"

settings = Settings()
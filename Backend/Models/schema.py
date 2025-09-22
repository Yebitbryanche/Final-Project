
from typing import Optional

from pydantic import EmailStr, BaseModel
from sqlmodel import SQLModel


class Token(SQLModel):
    access_token:str
    token_type:str

class TokenData(SQLModel):
    username:Optional[str] = None

class ProductRead(BaseModel):
    id:int
    title:str
    description:str
    price:float
    image:str
    category:str

class ProductCreate(SQLModel):
    id:int
    title:str
    description:str
    price:float
    stock:int
    image:str
    category:str

class ProductUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None
    image: Optional[str] = None
    category: Optional[str] = None

class AddToCartRequest(BaseModel):
    user_id: int
    product_id: int


class UserCreate(BaseModel):
    user_name: str
    email: EmailStr
    password: str
    role: bool = False    

class LoginRequest(BaseModel):
    user_name:str
    password:str


class UserRead(SQLModel):
    id:int
    user_name:str
    email:EmailStr
    role:bool

class ProductUpdate(BaseModel):
    quantity:int
class ProductCreate(BaseModel):
    title:str
    description:str
    price:float
    stock:int
    image:str
    category:str
    admin_id:int


class CreateReview(BaseModel):
    comment:str
    rating:int
    product_id:int

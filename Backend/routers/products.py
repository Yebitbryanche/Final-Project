from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from Models.schema import ProductRead
from db import get_session
from schema.models import Product
from utility.exception import not_found

router = APIRouter()


@router.get("/products", response_model=List[ProductRead])
def get_all_products(session:Session = Depends(get_session)):
   product = session.exec(select(Product)).all()
   if not product:
       not_found("product")
   return product
from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from utility.exception import not_found
from db import get_session
from Models.schema import ProductCreate, ProductUpdate
from schema.models import Product


router = APIRouter(prefix="/users", tags=["Users"])


router.post("/upload", response_model=ProductCreate)
def upload_product(
    title:str,
    description:str,
    price:float,
    stock:int,
    image:str,
    category:str, 
    session:Session = Depends(get_session),
    ):
    product = Product(
        title=title,
        description=description,
        price=price,
        stock=stock,
        image=image,
        category=category
        )
    
    session.add(product)
    session.commit()
    session.refresh(product)
    return product

# product update

@router.put("/update/{id}", response_model=ProductCreate)
def update_product(id: int, product_update: ProductUpdate, session: Session = Depends(get_session)):
    product = session.exec(select(Product).where(Product.id == id)).first()
    if not product:
        not_found("product")

    # Only update the fields that were actually provided
    update_data = product_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)

    session.add(product)
    session.commit()
    session.refresh(product)

    return product

#productt delete

@router.delete("/delete/{id}")
def delete_product( id:int, session:Session = Depends(get_session)):
    product = session.get(Product, id)
    if  not product:
        not_found()
    
    session.delete(product)
    session.commit()
    return {"message":"product deleted successfully"}


from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from utility.exception import not_found
from db import get_session
from Models.schema import ProductCreate, ProductRead, ProductUpdate
from schema.models import Product


router = APIRouter(prefix="/users", tags=["Users"])



@router.post("/upload", response_model=ProductCreate)
def upload_product(product:ProductCreate ,session:Session = Depends(get_session),):
    product = Product(
        title=product.title,
        description=product.description,
        price=product.price,
        stock=product.stock,
        image=product.image,
        category=product.category,
        admin_id = product.admin_id
        )
    
    session.add(product)
    session.commit()
    session.refresh(product)
    return product

# product update

@router.put("/update/{product_id}", response_model=ProductCreate)
def update_product(product_id: int, product_update: ProductUpdate, session: Session = Depends(get_session)):
    product = session.exec(select(Product).where(product_id == Product.id)).first()
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

@router.delete("/delete/{product_id}")
def delete_product( product_id:int, session:Session = Depends(get_session)):
    product = session.get(Product, product_id)
    if  not product:
         raise HTTPException(status_code=404, detail="Product not found")
    session.delete(product)
    session.commit()
    return {"message": "Product deleted successfully"}
        


@router.get("/products/{admin_id}", response_model=List[ProductRead])
def get_admin_products(admin_id: int, session: Session = Depends(get_session)):
    # Query products for this admin
    products = session.exec(
        select(Product).where(Product.admin_id == admin_id)
    ).all()

    if not products:
        raise HTTPException(status_code=404, detail="No products found for this admin")

    return products
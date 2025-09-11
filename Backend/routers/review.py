from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from db import get_session
from schema.models import Product, Review
from utility.exception import not_found

router = APIRouter()


# create a review

@router.post("/products/{product_id}/review")
def create_review(user_id:int,
                  comment:str,
                  rating:int,
                  product_id:int,
                  session:Session = Depends(get_session)):
    product = session.exec(select(Product).where(Product.id == product_id)).first()
    if not product:
        not_found("product")

    #checks if user already reviewed product
    review = session.exec(
        select(Review).where(Review.product_id == product_id, Review.user_id == user_id)
    ).first()
    if review:
        raise HTTPException(status_code=400, detail="You already reviewed this product")
    
    new_review = Review(
        user_id=user_id,
        product_id=product_id,
        rating=rating,
        comment=comment
    )

    session.add(new_review)
    session.commit()
    session.refresh(new_review)

    return new_review



   
# get product rating
@router.get("/products/{product_id}")
def get_product_review(product_id:int,session:Session = Depends(get_session)):
    product = session.exec(select(Product).where(Product.id == product_id)).first()
    if not product:
        not_found()
    reviews = session.exec(select(Review).where(Review.product_id == product_id)).all()

    avrage_rating = None
    review_count = len(reviews)
    if review_count > 0:
        avrage_rating = round(sum(r.rating for r in reviews)/ review_count, 2)

    return {
        "id": product.id,
        "title": product.title,
        "description": product.description,
        "price": product.price,
        "stock": product.stock,
        "image": product.image,
        "category": product.category,
        "average_rating": avrage_rating,
        "review_count": review_count,
    }   
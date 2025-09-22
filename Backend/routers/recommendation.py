
from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session, func, select

from Models.schema import ProductRead
from db import get_session
from schema.models import Product, Review
from utility.exception import not_found
from utility.recommendaton import ContentRecommenderWithReviews  # <-- import the recommender class

router = APIRouter()

# Instantiate recommender (load products once)
recommender = ContentRecommenderWithReviews()

@router.get("/products", response_model=List[ProductRead])
def get_all_products(session: Session = Depends(get_session)):
    query = (
        select(
            Product,
            func.coalesce(func.avg(Review.rating), 0).label("average_rating")
        )
        .outerjoin(Review, Product.id == Review.product_id)
        .group_by(Product.id)
    )
    results = session.exec(query).all()

    products = []
    for product, avg_rating in results:
        product_dict = product.dict()
        product_dict["average_rating"] = avg_rating
        products.append(product_dict)

    return products

import datetime
from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from schema.models import Cart, CartItems, Product, User
from utility.exception import not_found
from Models.schema import AddToCartRequest, ProductUpdate
from db import get_session

router = APIRouter()

@router.post("/cart/add")
def add_to_cart(
    request:AddToCartRequest,
    session:Session = Depends(get_session),
):
    user = session.get(User, request.user_id)
    if not user:
        not_found("user")


    product = session.get(Product, request.product_id)
    if not product:
        not_found("product")


    cart = session.exec(select(Cart).where(Cart.user_id == request.user_id)).first()
    if not cart:    # creates cart for user if not exist 
        cart = Cart(user_id = request.user_id)
        session.add(cart)
        session.commit()
        session.refresh(cart)

    cart_item = session.exec(
        select(CartItems).where(
            CartItems.cart_id == cart.id,
            CartItems.product_id == request.product_id
                                )
    ).first()

    cart_item = CartItems(cart_id=cart.id, product_id = request.product_id)
    session.add(cart_item)
    session.commit()
    session.refresh(cart_item)

    return {"message": "Item added to cart", "cart_item": cart_item}


# view Cart

@router.get("/cart/{user_id}/view")
def view_cart(user_id:int, session:Session = Depends(get_session)):
    cart = session.exec(select(Cart).where(Cart.user_id == user_id)).first()
    if not cart:
        not_found("cart")


    # getting all cart items

    cart_items = session.exec(select(CartItems, Product).join(Product,CartItems.product_id == Product.id).where(CartItems.cart_id == cart.id)).all()


   # format response
    items = []
    for cart_item, product in cart_items:
        items.append({
            "cart_item_id": cart_item.id,
            "product_id": product.id,
            "title": product.title,
            "price": product.price,
            "quantity": cart_item.quantity,
            "subtotal": product.price * cart_item.quantity,
            "image":product.image
        })

    total_price = sum(item["subtotal"] for item in items)

    return {
        "cart_id": cart.id,
        "user_id": cart.user_id,
        "items": items,
        "total_price": total_price
    }

# update cart


@router.put("/cart/{user_id}/update/{product_id}")
def update_cart_item(
    user_id:int,
    product_id:int,
    update:ProductUpdate,
    session:Session = Depends(get_session)
):
    cart = session.exec(select(Cart).where(Cart.user_id == user_id)).first
    if not cart:
        not_found("cart")

    cart_item = session.exec(
        select(CartItems).where(
            CartItems.cart_id == Cart.id,
            CartItems.product_id == product_id
         )
    ).first()

    if not cart_item:
        not_found("cart items")

    if update.quantity <= 0:
        session.delete(cart_item)
        session.commit()
        return {"message":"Item removed from cart"}
    else:
        cart_item.quantity = update.quantity
        cart_item.updated_at = datetime.utcnow() if hasattr(cart_item, "updated_at") else cart_item.quantity
        session.add(cart_item)
        session.commit()
        session.refresh(cart_item)

        return {"message": "Item quantity updated", "cart_item": cart_item}
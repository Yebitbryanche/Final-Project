from datetime import datetime
from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from schema.models import Cart, CartItems, Product, User
from utility.exception import not_found
from Models.schema import AddToCartRequest, ProductUpdate
from db import get_session

router = APIRouter()
@router.post("/cart/add")
def add_to_cart(
    request: AddToCartRequest,
    session: Session = Depends(get_session),
):
    user = session.get(User, request.user_id)
    if not user:
        not_found("user")

    product = session.get(Product, request.product_id)
    if not product:
        not_found("product")

    # 🔍 Get or create cart
    cart = session.exec(select(Cart).where(Cart.user_id == request.user_id)).first()
    if not cart:
        cart = Cart(user_id=request.user_id)
        session.add(cart)
        session.commit()
        session.refresh(cart)

    # 🔍 Check if product already in cart
    cart_item = session.exec(
        select(CartItems).where(
            CartItems.cart_id == cart.id,
            CartItems.product_id == request.product_id
        )
    ).first()

    if cart_item:
        # ⚠️ Already in cart → increment quantity instead of duplicating
        cart_item.quantity += 1
        cart_item.subtotal = cart_item.quantity * product.price
        cart_item.updated_at = datetime.utcnow()
        session.add(cart_item)
        session.commit()
        session.refresh(cart_item)
        return {"message": "Product has been added to cart", "cart_item": cart_item}
    else:
        # 🛒 Add as new item
        cart_item = CartItems(
            cart_id=cart.id,
            product_id=request.product_id,
            quantity=1,
            subtotal=product.price,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
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


# update cart item quantity
@router.put("/cart/{user_id}/update/{product_id}")
def update_cart_item(
    user_id: int,
    product_id: int,
    update: ProductUpdate,
    session: Session = Depends(get_session),
):
    cart = session.exec(select(Cart).where(Cart.user_id == user_id)).first()
    if not cart:
        not_found("cart")

    cart_item = session.exec(
        select(CartItems).where(
            CartItems.cart_id == cart.id,
            CartItems.product_id == product_id
        )
    ).first()

    if not cart_item:
        not_found("cart item")

    if update.quantity <= 0:
        session.delete(cart_item)
        session.commit()
        return {"message": "Item removed from cart"}
    else:
        cart_item.quantity = update.quantity
        # 👇 make sure subtotal is recalculated every time
        product = session.exec(select(Product).where(Product.id == product_id)).first()
        cart_item.subtotal = cart_item.quantity * product.price  
        cart_item.updated_at = datetime.utcnow()

        session.add(cart_item)
        session.commit()
        session.refresh(cart_item)

        # 👇 return just the updated item
        return cart_item
    




@router.delete("/cart/{user_id}/delete/{product_id}")
def delete_from_cart(user_id: int, product_id: int, session: Session = Depends(get_session)):
    cart = session.exec(select(Cart).where(Cart.user_id == user_id)).first()
    if not cart:
        not_found("cart")

    cart_item = session.exec(
        select(CartItems).where(
            CartItems.cart_id == cart.id,
            CartItems.product_id == product_id
        )
    ).first()
    if not cart_item:
        not_found("cart item")

    session.delete(cart_item)
    session.commit()

    # re-query items so the response reflects updated cart
    cart_items = session.exec(
        select(CartItems, Product)
        .join(Product, CartItems.product_id == Product.id)
        .where(CartItems.cart_id == cart.id)
    ).all()

    items = []
    for ci, product in cart_items:
        items.append({
            "cart_item_id": ci.id,
            "product_id": product.id,
            "title": product.title,
            "price": product.price,
            "quantity": ci.quantity,
            "subtotal": product.price * ci.quantity,
            "image": product.image
        })

    total_price = sum(i["subtotal"] for i in items)

    return {
        "cart_id": cart.id,
        "user_id": cart.user_id,
        "items": items,
        "total_price": total_price
    }


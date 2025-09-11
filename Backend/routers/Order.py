from fastapi import APIRouter, Depends
from sqlmodel import Session, delete, select

from db import get_session
from schema.models import Cart, CartItems, Order, OrderItem, Product
from utility.exception import not_found


router = APIRouter()

# placing orders and checking out

@router.post("/checkout/{user_id}")
def checkout(user_id: int, session:Session = Depends(get_session)):
    cart = session.exec(select(Cart).where(Cart.user_id == user_id)).first()
    if not cart:
        not_found("cart")
    
    cart_items = session.exec(
        select(CartItems, Product)
        .join(Product, CartItems.product_id == Product.id)
        .where(CartItems.cart_id == Cart.id)
    ).all()

    if not cart_items:
        not_found("cart items")

    total_amount = sum(product.price * cart_item.quantity for cart_item, product in cart_items)

    # create new order 

    order = Order(user_id=user_id, total_amount=total_amount, status="Pending")
    session.add(order)
    session.commit()
    session.refresh(order)

    # Adding order items

    for cart_item, product in cart_items:
        order_item = OrderItem(
            order_id = order.id,
            product_id=product.id,
            quantity=cart_item.quantity,
            price = product.price
        )
        session.add(order_item)


   ## clear cart after placing order
    session.exec(delete(CartItems).where(CartItems.cart_id == cart.id))
    session.commit()

    return {
        "message": "Order placed successfully",
        "order_id": order.id,
        "total_amount": total_amount,
        "status": order.status
    }


# get user oder
@router.get("/orders/{user_id}")
def get_orders(user_id:int, session:Session = Depends(get_session)):
    orders = session.exec(select(Order).where(Order.user_id == user_id)).all()
    if not orders:
        not_found("orders")
    return orders

@router.get("/orders/{order_id}/items")
def get_order_items(order_id:int, session:Session = Depends(get_session)):
    order_items = session.exec(
        select(OrderItem, Product)
        .join(Product, OrderItem.product_id == Product.id)
        .where(OrderItem.order_id == order_id)).all()
    
    if not order_items:
        not_found("Items")

    return [
        {
            "product_id": product.id,
            "title": product.title,
            "price": order_item.price,
            "quantity": order_item.quantity,
            "subtotal": order_item.price * order_item.quantity
        }
        for order_item, product in order_items
    ]


# user order history
@router.get("/order-history/{user_id}")
def get_order_history(user_id:int, session:Session = Depends(get_session)):

    orders = session.exec(select(Order).where(Order.user_id == user_id)).all()
    if not orders:
        not_found("orders")
    
    history = []

    for order in orders:
        order_items = session.exec(
            select(OrderItem, Product)
            .join(Product, OrderItem.product_id == Product.id)
            .where(OrderItem.order_id == order.id)
        ).all()

        items_list = [
            {
                "product_id":product.id,
                "title":product.title,
                "price":order_item.price,
                "quantity":order_item.quantity,
                "subtotal":order_item.price * order_item.quantity
            }
            for order_item, product in order_items
        ]

        history.append({
            "order_id": order.id,
            "total_amount": order.total_amount,
            "status": order.status,
            "created_at": order.created_at,
            "items": items_list           
        })

    
    return {"user_id": user_id, "order_history": history}
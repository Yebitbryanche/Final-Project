export interface CartItemProps{
            "cart_id": number,
            "user_id": number,
            "items": any,
            "total_price": number,
}

export type CartItem = {
  cart_item_id: number,
  product_id: number,
  title: string,
  price: number
  quantity: number,
  subtotal: number,
  image: string,
}

export type CartState = {
  items: CartItem[];
};
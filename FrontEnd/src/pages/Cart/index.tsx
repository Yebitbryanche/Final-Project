
import { useEffect, useState } from "react";
import { products } from "../../data";
import CartItem from "../../components/CartItem";
import OrderSummary from "../../components/OrderSummary";


const Cart = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  // Each key is a product id (a string).
  // Each value is the quantity selected for that product (a number).

  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
    // Defines a function that will be called when a product’s quantity changes.
    // It takes:
    // id: the product identifier.
    // quantity: the new quantity selected by the user.

    // Updates the quantities state:
    // prev is the previous state object.
    // ...prev spreads the existing quantities.
    // [id]: quantity updates the quantity for the specific product.
    // This ensures that only the changed product is updated, while others remain untouched.
  };

  const subtotal = products.reduce((sum, item) => {
    const qty = quantities[item.id] || 0;
    const discountedPrice = item.price * 0.9;
    return sum + discountedPrice * qty;
  }, 0);

  useEffect(() =>{
     
  })

  return (
    <div className="bg-[#F5F5F5] min-h-screen p-6">
      <h2 className="text-3xl font-bold text-black mb-6">My Shopping Cart</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          {products.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>

        <OrderSummary subtotal={subtotal} />
      </div>
    </div>
  );
};

export default Cart;
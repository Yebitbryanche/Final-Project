import { useEffect, useState } from "react";
import OrderSummary from "../../components/OrderSummary";
import type UserProps from "../../types/UserRead";
import { api } from "../../API/Registration";
import { MdDelete } from "react-icons/md";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import images from "../../types/images";
import { checkout } from "../../services/cart_quantity";
import Addtocardbutton from "../../components/Addtocardbutton";

export interface CartItem {
  cart_item_id: number;
  product_id: number;
  title: string;
  price: number;
  quantity: number;
  subtotal: number;
  image: string;
}

export interface CartResponse {
  cart_id: number;
  user_id: number;
  items: CartItem[];
  total_price: number;
}

const Cart = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<UserProps | undefined>();
  const [cartItems, setCartItems] = useState<CartResponse | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  //  Fetch user
  useEffect(() => {
    api
      .get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) =>{ setUser(res.data); console.log(error||message)})
      .catch(() => setError("Failed to fetch user"));
  }, []);

  //  Fetch cart when user is known
  useEffect(() => {
    if (!user?.id) return;

    api
      .get(`/cart/${user.id}/view`)
      .then((res) => setCartItems(res.data))
      .catch((err: any) => setError(err.message));
  }, [user]);

  
//  Update item quantity (delete if <= 0)
const handleQuantityChange = (productId: number, newQuantity: number) => {
  if (!user?.id) return;

  // 🔹 If quantity <= 0 → delete item
  if (newQuantity <= 0) {
    handleDelete(productId);
    return;
  }

  // 🔹 Optimistic update (UI updates instantly)
  setCartItems((prev) =>
    prev
      ? {
          ...prev,
          items: prev.items.map((item) =>
            item.product_id === productId
              ? {
                  ...item,
                  quantity: newQuantity,
                  subtotal: item.price * newQuantity,
                }
              : item
          ),
        }
      : prev
  );

  // 🔹 Sync with backend
  api
    .put(
      `/cart/${user.id}/update/${productId}`,
      { quantity: newQuantity },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      const updatedItem: CartItem = res.data;

      // Replace with backend response for accuracy
      setCartItems((prev) =>
        prev
          ? {
              ...prev,
              items: prev.items.map((item) =>
                item.product_id === updatedItem.product_id
                  ? { ...item, quantity: updatedItem.quantity, subtotal: updatedItem.subtotal }
                  : item
              ),
            }
          : prev
      );
    })
    .catch((err) => setError(err.message));
};

  // Delete product
  const handleDelete = (product_id: number) => {
    if (!user?.id) return;

    // Optimistic delete
    setCartItems((prev) =>
      prev ? { ...prev, items: prev.items.filter((i) => i.product_id !== product_id) } : prev
    );

    api
      .delete(`/cart/${user.id}/delete/${product_id}`)
      .then((res) => {
        setMessage(res.data.message);
        setCartItems(res.data); // backend should return updated cart
      })
      .catch((error: any) => {setError(error.message);  console.log(error)});
  };

  //  Calculate subtotal
  const subtotal =
    cartItems?.items.reduce((sum, item) => sum + item.subtotal, 0) || 0;

  return (
    <div className="bg-[#F5F5F5] min-h-screen p-6 md:mt-[5rem]">
      <h2 className="text-2xl font-medium text-black mb-6">
        {user?.user_name}'s <span>Shopping Cart</span>
      </h2>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
                {/* Cart Items */}
        <div className="bg-white p-6 rounded shadow overflow-y-auto flex flex-col max-h-[500px]">
          {cartItems?.items.length ? (
            (cartItems.items || []).map((item) => (
              <div
                key={item.cart_item_id}
                className="flex items-center justify-between p-3 rounded-md my-3 bg-secondary/5 shadow-sm"
              >
                {/* Left: image + details */}
                <div className="flex items-center gap-4">
                  <img
                    className="w-20 h-20 object-cover rounded-sm"
                    src={`http://127.0.0.1:8000/${item.image}`}
                    alt={item.title}
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="font-bold text-black/60">
                      {(item.subtotal || item.price * item.quantity).toLocaleString()} FCFA
                    </p>
                  </div>
                </div>

                {/* Right: actions */}
                <div className="flex items-center gap-x-4">
                  <div className="flex gap-x-4 items-center">
                    <BsCartPlus
                      size={25}
                      className="cursor-pointer text-black/50 hover:text-primary/70"
                      onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                    />
                    <p className="text-sm text-secondary/80 font-medium">{item.quantity}</p>
                    <BsCartDash
                      size={25}
                      className="cursor-pointer text-black/50 hover:text-primary/70"
                      onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                    />
                  </div>
                  <MdDelete
                    size={25}
                    className="cursor-pointer text-secondary hover:text-red-400"
                    onClick={() => handleDelete(item.product_id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center mt-16">
              <img
                src={images.empty_card} // replace with your image path
                alt="Empty cart"
                className="w-60 h-60 object-contain mb-4"
              />
              <p className="text-gray-400 text-lg font-medium">Your cart is empty!</p>
              <p className="text-gray-300 text-sm">Start adding some products to see them here.</p>
              <Link
                to="/market"
                className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
              >
                Shop Now
              </Link>
            </div>
          )}
          <Addtocardbutton
            title="Checkout"
            onClick={() => {
              if (!user?.id) {
                alert("User must be logged in");
              } else {
                checkout(user.id);
              }
            }}
          />
        </div>


        {/* Order Summary */}
        <OrderSummary subtotal={subtotal} />
      </div>
    </div>
  );
};

export default Cart;

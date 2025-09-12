import { useEffect, useState } from "react";
import OrderSummary from "../../components/OrderSummary";
import type UserProps from "../../types/UserRead";
import { api } from "../../API/Registration";
import { MdDelete } from "react-icons/md";
import { BsCartDash, BsCartPlus } from "react-icons/bs";

export interface CartItem {
  cart_item_id: number;
  product_id: number;
  title: string;
  price: number;
  quantity: number;
  subtotal: number;
  image: string;
}

interface CartResponse {
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

  useEffect(() => {
    api
      .get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => setError("Failed to fetch user"));
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    api
      .get(`/cart/${user.id}/view`)
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err: any) => {
        setError(err.message);
      });
  }, [user]);

  // Calculate subtotal from API response
  const subtotal =
    cartItems?.items.reduce((sum, item) => sum + item.subtotal, 0) || 0;

  return (
    <div className="bg-[#F5F5F5] min-h-screen p-6">
      <h2 className="text-2xl font-medium text-black mb-6">
        <p>{user?.user_name}'s <span>Shopping Cart</span></p> 
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow overflow-y-auto flex flex-col max-h-[500px]">
  {cartItems?.items.map((item) => (
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
          <p className="font-bold text-black/60">{item.subtotal.toLocaleString()} FCFA</p>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-x-4">
        <div className="flex gap-x-4 items-center">
          <BsCartPlus size={25} className="cursor-pointer text-black/50 hover:text-primary/70"/>
          <p className="text-sm text-secondary/80 font-medium">{item.quantity}</p>
          <BsCartDash size={25} className="cursor-pointer text-black/50 hover:text-primary/70"/>
        </div>
        <MdDelete size={25} className="cursor-pointer text-secondary hover:text-red-400" />
      </div>
    </div>
  ))}
</div>


        <OrderSummary subtotal={subtotal} />
      </div>
    </div>
  );
};

export default Cart;

import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../API/Registration";

type CartItem = {
  id: number;
  product_id: number;
  quantity: number;
  product?: {
    id: number;
    title: string;
    price: number;
  };
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (user_id: number, product_id: number) => Promise<void>;
  fetchCart: (user_id: number) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ userId?: number; children: React.ReactNode }> = ({
  userId,
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Fetch cart from backend
  const fetchCart = async (user_id: number) => {
    try {
      const res = await api.get(`/cart/${user_id}/view`);
      setCart(res.data.items || []);
    } catch (err: any) {
      console.error("Failed to fetch cart:", err.response?.data || err.message);
    }
  };

  // Add item to cart
  const addToCart = async (user_id: number, product_id: number) => {
    try {
      const res = await api.post(`/cart/add`, { user_id, product_id });

      if (res.data.message.includes("added")) {
        console.log(res.data.message);
        await fetchCart(user_id); // refresh cart after adding
      }

      console.log("Cart response:", res.data);
    } catch (err: any) {
      console.error("Not added to cart:", err.response?.data || err.message);
    }
  };

  // Auto-load cart when user logs in
  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId]);

  return (
    <CartContext.Provider value={{ cart, addToCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// CartContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import { api } from "../API/Registration"
import type { CartResponse } from "../pages/Cart";

interface CartContextType {
  cart: CartResponse | null;
  setCart: (cart: CartResponse) => void;
  refreshCart: (userId: number, token: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [cart, setCart] = useState<CartResponse | null>(null);

  const refreshCart = (userId: number, token: string) => {
    api
      .get(`/cart/${userId}/view`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setCart(res.data))
      .catch(console.error);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

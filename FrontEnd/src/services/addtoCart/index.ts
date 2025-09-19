import { api } from "../../API/Registration";

export const addToCart = async (user_id: number, product_id: number) => {
  try {
    // Directly hit the backend
    const res = await api.post(`/cart/add`, {
      user_id,
      product_id,
    });

    // Backend will tell us if already exists or newly added
    if (res.data.message === "Product has been added to cart") {
      alert("Product has been added to cart");
    } else if (res.data.message === "Item added to cart") {
      alert("Item added to your cart");
    }

    console.log("Cart response:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("Not added to cart:", err.response?.data || err.message);
    return { error: err.response?.data || err.message };
  }
};



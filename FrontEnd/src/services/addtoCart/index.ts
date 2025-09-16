import { api } from "../../API/Registration";


export const addToCart = async (user_id: number, product_id: number) => {
  try {
    // 🔍 Step 1: Check if item already in cart
    const cartRes = await api.get(`/cart/${user_id}/view`);
    const alreadyExists = cartRes.data.items.some(
      (item: any) => item.product_id === product_id
    );

    if (alreadyExists) {
      alert("Item already in cart");
      return { message: "Item already in cart" };
    }

    // 🛒 Step 2: Add to cart if not exists
    const res = await api.post(`/cart/add`, {
      user_id,
      product_id,
    });

    console.log("Added to cart:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("Not added to cart:", err.response?.data || err.message);
    return { error: err.response?.data || err.message };
  }
};

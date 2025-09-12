import { api } from '../../API/Registration';

export const addToCart = async (user_id:number, product_id:number) => {
  try {
    const res = await api.post(
      `/cart/add`,
      {
        user_id,  
        product_id,    
      }
    );
    console.log("Added to cart:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("Not added to cart:", err.response?.data || err.message);
  }
};


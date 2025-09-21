import { loadStripe } from "@stripe/stripe-js";
import { api } from "../../API/Registration";

// Load your Stripe publishable key
const stripePromise = loadStripe("pk_test_51S7yy7LN8y6tjoNtlEJmsDHHHOq2I4UHYfwdna46IwcQHptvFsjgJK4SBivlnz4SHvz4By0s5YxdKkIwbibdJHDk00o9IXaaBz");

export const checkout = async (user_id: number) => {
  try {
    const res = await api.post(`/checkout/${user_id}`);
    console.log("Checkout response:", res.data);

    if (res.data.id) {
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: res.data.id });
    } else {
      alert(res.data.error || "Checkout failed");
    }
  } catch (err: any) {
    console.error("Checkout error:", err.response?.data || err.message);
    alert("Checkout could not be initiated");
  }
};



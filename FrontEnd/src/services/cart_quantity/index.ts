import { loadStripe } from "@stripe/stripe-js";
import { api } from "../../API/Registration";
import jsPDF from "jspdf";


// Load your Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51S7yy7LN8y6tjoNtlEJmsDHHHOq2I4UHYfwdna46IwcQHptvFsjgJK4SBivlnz4SHvz4By0s5YxdKkIwbibdJHDk00o9IXaaBz"
);

// Utility function to download a PDF receipt
const downloadReceipt = (sessionId: string) => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("=== Receipt ===", 20, 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Checkout Token (Session ID): ${sessionId}`, 20, 40);
  doc.text(`Date: ${new Date().toLocaleString()}`, 20, 50);
  doc.text("Status: Complete Payment", 20, 60);

  doc.text("Thank you for shopping with us!", 20, 80);
  doc.text(
    "Send this document to us via WhatsApp along with your location",
    20,
    100,
    { maxWidth: 170 }
  );

  // Save as a real PDF file
  doc.save(`receipt-${sessionId}.pdf`);
};

export const checkout = async (user_id: number) => {
  try {
    const res = await api.post(`/checkout/${user_id}`);
    console.log("Checkout response:", res.data);

    if (res.data.id) {
      downloadReceipt(res.data.id); // download immediately
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

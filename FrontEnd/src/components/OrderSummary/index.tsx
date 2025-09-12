import { Link } from "react-router-dom";

type Props = {
  subtotal: number;
};

const OrderSummary = ({ subtotal }: Props) => {
  const serviceFee = 1500;
  const total = subtotal + serviceFee;

  return (
    <div className="bg-white p-8 rounded shadow text-base w-[40vw] h-[500px]">
      {/* Coupons section - now full width */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Coupons</h3>
        <input
          type="text"
          placeholder="Coupon Code"
          className="w-full border border-black rounded px-3 py-2 text-base"
        />
      </div>

      {/* Order Summary */}
      <h3 className="text-xl font-bold mb-4">Your Order</h3>
      <div className="space-y-3 text-black">
        {/* space-y-3: Adds vertical spacing between each <p> line */}
        <p>
          Subtotal: <span className="font-bold">{subtotal} XAF</span>
        </p>
        <p>
          Service fee: <span className="font-bold">500 XAF</span>
        </p>
        <p>
          Total payment:{" "}
          <span className="font-bold text-black">{total} XAF</span>
        </p>
      </div>

      <button className="mt-6 w-full bg-secondary text-white py-3 rounded text-lg hover:bg-green-800 transition">
        <Link to="/checkout">Proceed to Checkout</Link>
      </button>
    </div>
  );
};

export default OrderSummary;

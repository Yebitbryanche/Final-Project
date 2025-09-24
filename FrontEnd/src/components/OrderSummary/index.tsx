import Addtocardbutton from "../Addtocardbutton";
import { checkout } from "../../services/cart_quantity";
import { useEffect, useState } from "react";
import type {UserProps} from "../../types/UserRead";
import { api } from "../../API/Registration";

type Props = {
  subtotal: number;
};

const OrderSummary = ({ subtotal }: Props) => {
  const token = localStorage.getItem("token");
  const serviceFee = 500;
  const [user, setUser] = useState<UserProps | undefined>();
  const [error, setError] = useState("");
  const total = subtotal + serviceFee;

    //  Fetch user
    useEffect(() => {
      api
        .get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) =>{ setUser(res.data); console.log(error)})
        .catch(() => setError("Failed to fetch user"));
    }, []);

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md w-full md:w-[350px] lg:w-[400px] h-auto md:h-[500px] flex flex-col justify-between">
      {/* Coupons Section */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-3 text-gray-700">Coupons</h3>
        <input
          type="text"
          placeholder="Enter coupon code"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Order Summary */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4 text-gray-700">Your Order</h3>
        <div className="flex flex-col gap-3 text-gray-800">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold">{subtotal.toLocaleString()} XAF</span>
          </div>
          <div className="flex justify-between">
            <span>Service fee:</span>
            <span className="font-semibold">500 XAF</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2 mt-2 text-lg font-bold">
            <span>Total payment:</span>
            <span>{total.toLocaleString()} XAF</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Addtocardbutton
        title="Checkout"
        onClick={() => {
          if (!user?.id) {
            alert("User must be logged in");
          } else {
            checkout(user.id);
          }
        }}
        className="bg-gray-700 text-white cursor-pointer"
      />
    </div>
  );
};

export default OrderSummary;

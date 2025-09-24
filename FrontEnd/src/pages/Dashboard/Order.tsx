import { useEffect, useState } from "react";
import UserAvatar from "../../components/UseAvatar";
import { api } from "../../API/Registration";
import type UserProps from "../../types/UserRead";
import type { Order, OrderItem } from "../../types/products";

function Order() {
  const [user, setUser] = useState<UserProps | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<(Order & { items: OrderItem[] })[]>([]);
  const token = localStorage.getItem("token");

  // Fetch user
  useEffect(() => {
    api
      .get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => setError("Failed to fetch user"));
  }, [token]);

  // Fetch last 5 orders + their items
  useEffect(() => {
    if (!user?.id) return;

    api
      .get(`/orders/${user.id}`)
      .then(async (res) => {
        // Take only the last 5 orders
        const latestOrders: Order[] = res.data.slice(-5).reverse();


        // Fetch items for each order
        const withItems = await Promise.all(
          latestOrders.map(async (order) => {
            const itemsRes = await api.get(`/orders/${order.id}/items`);
            return { ...order, items: itemsRes.data };
          })
        );

        setOrders(withItems);
        console.log("Orders with items:", withItems);
      })
      .catch(() => setError("Failed to fetch orders"));
  }, [user]);

  return (
    <div className="p-4 md:p-6 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-xl shadow-md px-4 py-4 md:px-6 gap-3 md:gap-0">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-xl md:text-3xl text-gray-800">Orders</h1>
          <p className="text-sm md:text-base text-primary">
            Last 5 Orders
            <hr className="text-primary w-24 md:w-36 mt-1" />
          </p>
        </div>
        <UserAvatar />
      </div>

      {/* Orders Section */}
      <div className="flex flex-col gap-6">
        {error ? (
          <p className="text-center text-red-500 py-6 text-lg">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500 py-6 text-lg">No orders found</p>
        ) : (
          orders.map((order,index) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-lg p-4 overflow-x-auto"
            >
              {/* Order Meta Info */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    Order #{index+1}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items Table */}
              <table className="min-w-[600px] md:min-w-full w-full table-auto border-collapse rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-tertiary text-secondary">
                    <th className="p-3 text-left text-sm md:text-base">Product</th>
                    <th className="p-3 text-left text-sm md:text-base">Price</th>
                    <th className="p-3 text-left text-sm md:text-base">Quantity</th>
                    <th className="p-3 text-left text-sm md:text-base">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, i) => (
                    <tr
                      key={item.product_id}
                      className={`${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-indigo-50 transition`}
                    >
                      <td className="p-2 md:p-3 text-sm md:text-base">{item.title}</td>
                      <td className="p-2 md:p-3 text-sm md:text-base">
                        {item.price} XAF
                      </td>
                      <td className="p-2 md:p-3 text-sm md:text-base">
                        {item.quantity}
                      </td>
                      <td className="p-2 md:p-3 text-sm md:text-base">
                        {item.subtotal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Order;

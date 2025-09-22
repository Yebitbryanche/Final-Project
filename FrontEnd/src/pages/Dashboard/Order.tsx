import React, { useEffect, useState } from 'react';
import logo from "../../assets/images/mboakakologo.png";
import UserAvatar from '../../components/UseAvatar';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface OrderItem {
  product_id: number;
  title: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface Order {
  id: number;
  user_id: number;
  created_at: string;
  status: string;
  items: OrderItem[]; 
}

//  JWT Parser 
function parseJwt(token: string): any {
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload); // decode base64
    return JSON.parse(payload);
  } catch (err) {
    console.error("Failed to parse JWT:", err);
    return null;
  }
}

function Order() {
  const [Products, setProducts] = useState<Product[]>([]);
  const [UserId, setUserId] = useState<number | null>(null);
  const [Error, setError] = useState<string | null>(null);

  //  Get user ID from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not logged in");
      return;
    }
    const decoded = parseJwt(token);
    if (decoded && decoded.sub) {
      const id =
        typeof decoded.sub === "string" ? parseInt(decoded.sub, 10) : decoded.sub;
      setUserId(id);
    } else {
      setError("Invalid token");
    }
  }, []);

  //  Fetch orders and items
  useEffect(() => {
  

    const fetchOrdersAndItems = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch order history from backend
        const ordersRes = await axios.get<{ user_id: number; order_history: Order[] }>(
          `http://localhost:8000/order-history/${UserId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const orders: Order[] = ordersRes.data.order_history;

        // Flatten all items from orders
        const allItems: Product[] = [];
        orders.forEach((order: Order) => {
          order.items.forEach((item: OrderItem) => {
            allItems.push({
              id: item.product_id,
              name: item.title,
              price: item.price,
              quantity: item.quantity,
              subtotal: item.subtotal,
            });
          });
        });

        setProducts(allItems);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders.");
      }
    };

    if(UserId!== null){
       fetchOrdersAndItems();

    }

   
  }, [UserId]);

  return (
    <div className=" p-4 md:p-6 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-xl shadow-md px-4 py-4 md:px-6 gap-3 md:gap-0">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-xl md:text-3xl text-gray-800">Orders</h1>
          <p className="text-sm md:text-base text-primary">
            All Products Ordered
            <hr className='text-primary w-24 md:w-36 mt-1'/>
          </p>
        </div>
        <UserAvatar />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-lg p-4 overflow-x-auto">
      { Error ? (
          <p className="text-center text-red-500 py-6 text-lg">{Error}</p>
        ) : Products.length === 0 ? (
          <p className="text-center text-gray-400 py-6 text-lg">No completed orders</p>
        ) : (
          <table className="min-w-[600px] md:min-w-full w-full table-auto border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-tertiary text-secondary">
                <th className="p-3 text-left text-sm md:text-base">Product</th>
                <th className="p-3 text-left text-sm md:text-base">Price</th>
                <th className="p-3 text-left text-sm md:text-base">Quantity</th>
                <th className="p-3 text-left text-sm md:text-base">subtotal</th>
              </tr>
            </thead>
            <tbody>
              {Products.map((product, i) => (
                <tr
                  key={product.id}
                  className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-indigo-50 transition`}
                >
                  <td className="p-2 md:p-3 text-sm md:text-base">{product.name}</td>
                  <td className="p-2 md:p-3 text-sm md:text-base">{product.price}XAF</td>
                  <td className="p-2 md:p-3 text-sm md:text-base">{product.quantity}</td>
                  <td className="p-2 md:p-3 text-sm md:text-base">{product.subtotal}</td>
                  <td className="p-2 md:p-3 text-sm md:text-base">
                    {/* <span
                      className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                        product.status === "Complete"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {product.status}
                    </span> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Order;

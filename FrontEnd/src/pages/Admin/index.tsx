import { useEffect, useState } from "react";
import { api } from "../../API/Registration";
import type { UserProps } from "../../types/UserRead";
import type ProductProps from "../../types/products";
import { FaUserCircle } from "react-icons/fa";
import { FaMoneyBill, FaUpload, FaUser } from "react-icons/fa6";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { OrderProps } from "../../types/products";

function AdminDashBoard() {
  const token = localStorage.getItem("token");
  const [admin, SetAdmin] = useState<UserProps | undefined>();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([])
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [allOrders, setAllOrders] = useState<OrderProps[]>([]);


  useEffect(() => {
    api
      .get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        SetAdmin(res.data);
      });
  }, []);

  useEffect(() => {
  if (users.length === 0) return;

  const fetchAllOrders = async () => {
    try {
      let all: OrderProps[] = [];
      for (const user of users) {
        const res = await api.get(`/orders/${user.id}`);
        all = [...all, ...res.data]; // merge orders
      }
      setAllOrders(all);
    } catch (err) {
      console.log(err);
    }
  };

  fetchAllOrders();
}, [users]);



  useEffect(() => {
    api.get("/users/all").then((res) => setUsers(res.data));
  }, []);

  useEffect(() => {
    if (!admin) return;
    api
      .get(`/users/products/${admin.id}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [admin]);

  useEffect(() => {
    if (users.length === 0) return;

    users.forEach((user) => {
      api
        .get(`/orders/${user.id}`)
        .then((res) => {
          setOrders((prev:any) => ({
            ...prev,
            [user.id]: res.data,
          }));
        })
        .catch((err) => console.log(err));
    });
  }, [users]);

const totalIncome = allOrders.reduce((sum, order) => sum + order.total_amount, 0);

  const handleViewOrders = async (userId: number) => {
    if (selectedUserId === userId) {
      // Hide if clicked again
      setSelectedUserId(null);
      setOrders([]);
      return;
    }

    try {
      const res = await api.get(`/orders/${userId}`);
      setOrders(res.data);
      setSelectedUserId(userId);
    } catch (err) {
      console.log(err);
    }
  };

  // Fake chart data
  const data = [
    { name: "Jan", income: 4000 },
    { name: "Feb", income: 3000 },
    { name: "Mar", income: 5000 },
    { name: "Apr", income: 7000 },
    { name: "May", income: 6000 },
    { name: "Jun", income: 8000 },
  ];

  return (
    <div className="mt-[5rem] min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-secondary text-white shadow">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          {localStorage.getItem("profilePic") ? (
            <img
              src={localStorage.getItem("profilePic") as string}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 object-cover"
            />
          ) : (
            <FaUserCircle className="w-10 h-10 text-gray-200" />
          )}
          <span className="font-medium">{admin?.user_name}</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-col items-center p-6 gap-8">
        {/* Statistics + Chart Row */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full">
          {/* Left: Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            {/* Income */}
            <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition-transform">
              <div className="bg-secondary/20 p-3 rounded-full">
                <FaMoneyBill size={24} className="text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">Total Income</p>
                <p className="text-2xl font-bold text-secondary">{totalIncome} XAF</p>
              </div>
            </div>

            {/* Uploads */}
            <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition-transform">
              <div className="bg-secondary/20 p-3 rounded-full">
                <FaUpload size={24} className="text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">
                  Total Uploads
                </p>
                <p className="text-2xl font-bold text-secondary">
                  {products.length}
                </p>
              </div>
            </div>

            {/* Users */}
            <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition-transform">
              <div className="bg-secondary/20 p-3 rounded-full">
                <FaUser size={24} className="text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">
                  Total Subscribers
                </p>
                <p className="text-2xl font-bold text-secondary">
                  {users.length}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Chart */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex-1">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Income Overview
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-40" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#077b09ff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

            {/* Users List */}
            <div className="w-full">
              <header className="flex justify-between items-center px-6 py-4 bg-secondary text-white shadow rounded-t-2xl">
                <p className="text-2xl">Users</p>
              </header>
              <div className="rounded-b-2xl overflow-hidden">
                {(showAllUsers ? users : users.slice(0, 5)).map((user, index) => (
                  <div
                    key={user.id}
                    className={`flex flex-col md:flex-row items-center justify-between p-3 px-5 ${
                      index % 2 === 0 ? "bg-tertiary" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-x-4">
                      <div className="bg-secondary/20 p-3 rounded-full">
                        <FaUser size={20} className="text-secondary" />
                      </div>
                      <p className="text-black/50">
                        User# <span className="text-primary">{index + 1}</span>
                      </p>
                    </div>
                    <p className="font-bold text-black/50">{user.email}</p>
                    <p className="font-bold text-primary">{user.user_name}</p>
                    <button
                      className="px-3 py-1 bg-primary text-white rounded-lg"
                      onClick={() => handleViewOrders(user.id)}
                    >
                      {selectedUserId === user.id ? "Hide Orders" : "View Orders"}
                    </button>

                    {/* Orders Modal */}
                    {selectedUserId === user.id && orders.length > 0 && (
                      <>
                        {/* Dark backdrop */}
                        <div
                          className="fixed inset-0 bg-black/50 z-40"
                          onClick={() => setSelectedUserId(null)}
                        ></div>

                        {/* Modal */}
                        <div className="fixed top-1/2 left-1/2 z-50 w-[70%] max-h-[80vh] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-6 overflow-y-auto">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">
                              Orders for {user.user_name}
                            </h3>
                            <button
                              className="text-gray-500 hover:text-gray-700"
                              onClick={() => setSelectedUserId(null)}
                            >
                              ✕
                            </button>
                          </div>

                          {/* Orders List */}
                          <div className="flex flex-col gap-3">
                            {orders.map((order) => (
                              <div
                                key={order.id}
                                className="flex justify-between p-3 bg-gray-50 rounded-lg shadow-sm"
                              >
                                <span>Order #{order.id}</span>
                                <span>Status: {order.status}</span>
                                <span>
                                  Date:{" "}
                                  {new Date(order.created_at).toLocaleDateString()}
                                </span>
                                <span>Total: {order.total_amount} XAF</span>
                              </div>
                            ))}
                            {orders.length > 5 && (
                              <p className="text-sm text-gray-500 mt-2 text-center">
                                Scroll to see more orders
                              </p>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}

                {/* See More / See Less Button */}
                {users.length > 5 && (
                  <div className="text-center py-4">
                    <button
                      onClick={() => setShowAllUsers(!showAllUsers)}
                      className="px-4 py-2 bg-secondary text-white rounded-lg shadow hover:bg-secondary/80 transition"
                    >
                      {showAllUsers ? "See Less" : "See More"}
                    </button>
                  </div>
                )}
              </div>
            </div>

      </main>
      <div>
      </div>
    </div>
  );
}

export default AdminDashBoard;

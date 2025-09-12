import React, { useEffect, useState } from "react";
import logo from "../../assets/images/mboakakologo.png";
import statistics from "../../assets/images/statistics.svg";
import profile from "../../assets/images/profile.svg";8
import order from "../../assets/images/order.svg";
import { Link } from "react-router-dom";
import UserAvatar from "../../components/UseAvatar";
import { LogOut } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface Purchase {
  id: number;
  product: string;
  category: string;
  price: number;
  status: "Pending" | "Complete";
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA336A",
  "#7C3AED",
];

function Statistics() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [spendingData, setSpendingData] = useState<any[]>([]);

  useEffect(() => {
    const fakePurchases: Purchase[] = [
      { id: 1, product: "Wireless Mouse", category: "Electronics", price: 12000, status: "Complete" },
      { id: 2, product: "Leather Wallet", category: "Accessories", price: 8000, status: "Pending" },
      { id: 3, product: "Running Shoes", category: "Footwear", price: 25000, status: "Complete" },
      { id: 4, product: "Smartphone", category: "Electronics", price: 120000, status: "Complete" },
      { id: 5, product: "Backpack", category: "Bags", price: 18000, status: "Pending" },
    ];
    setPurchases(fakePurchases);

    setCategoryData([
      { name: "Electronics", value: 2 },
      { name: "Accessories", value: 1 },
      { name: "Footwear", value: 1 },
      { name: "Bags", value: 1 },
    ]);

    setSpendingData([
      { month: "Jan", spent: 50000 },
      { month: "Feb", spent: 80000 },
      { month: "Mar", spent: 40000 },
      { month: "Apr", spent: 120000 },
      { month: "May", spent: 90000 },
    ]);
  }, []);

  const totalSpent = purchases.reduce((sum, p) => sum + p.price, 0);
  const completedOrders = purchases.filter((p) => p.status === "Complete").length;
  const pendingOrders = purchases.filter((p) => p.status === "Pending").length;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      {/* aside */}
      <aside className="bg-gradient-to-b from-secondary/70 to-primary w-full md:w-1/5 p-5 flex flex-col gap-10 shadow-2xl rounded-tr-2xl rounded-br-2xl text-white">
      {/* logo */}
        <div className="flex justify-center md:justify-start"> 
          <p className='font-bold text-xl mt-6'>Dashboard</p>
          <img src={logo} alt="" className="w-20" />
        </div>
        {/* links */}
        <div className="flex flex-row md:flex-col gap-4 md:gap-6 overflow-x-auto md:overflow-visible">
          <Link to="/" className="flex gap-3 items-center px-3 py-2 hover:bg-white/20 transition rounded-lg flex-shrink-0">
            <img src={order} alt="" className="w-5 " />
            <p>Order</p>
          </Link>
          <Link to="/statistics" className="flex gap-3 items-center px-3 py-2 bg-white/20 font-semibold rounded-lg flex-shrink-0">
            <img src={statistics} alt="" className="w-5" />
            <p>Statistics</p>
          </Link>
          <Link to="/profile" className="flex gap-3 items-center px-3 py-2 hover:bg-white/20 transition rounded-lg flex-shrink-0">
            <img src={profile} alt="" className="w-5" />
            <p>Profile</p>
          </Link>
          <Link to="/logout" className="flex gap-3 items-center px-3 py-2 hover:bg-white/20 transition rounded-lg flex-shrink-0">
            <LogOut className='w-5 h-5 text-black'/>
            <p>Logout</p>
          </Link>
        </div>
      </aside>

      {/* main */}
      <main className="w-full md:w-4/5 overflow-y-auto p-4 md:p-6 flex flex-col gap-10">
        {/* header */}
        <div className="flex flex-row md:flex-row justify-between items-start md:items-center bg-white rounded-xl shadow-md px-4 md:px-6 py-4 gap-4 md:gap-0">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl md:text-3xl text-gray-800">Statistics</h1>
            <p className="text-sm text-primary">
              Checkout the performance below
              <hr className="text-primary w-24 md:w-55"/>
            </p>
          </div>
          <UserAvatar />
        </div>

        {/* summary cards */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white shadow-lg rounded-xl p-6 flex-1 text-center hover:scale-105 transition-transform">
            <p className="text-gray-500 font-semibold">Total Spent</p>
            <p className="text-2xl font-bold text-gray-800">{totalSpent} XAF</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 flex-1 text-center hover:scale-105 transition-transform">
            <p className="text-gray-500 font-semibold">Completed Orders</p>
            <p className="text-2xl font-bold text-gray-800">{completedOrders}</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 flex-1 text-center hover:scale-105 transition-transform">
            <p className="text-gray-500 font-semibold">Pending Orders</p>
            <p className="text-2xl font-bold text-gray-800">{pendingOrders}</p>
          </div>
        </div>

        {/* line chart */}
        <div className="bg-white shadow-lg rounded-xl p-6 w-full overflow-x-auto">
          <p className="font-bold text-gray-700 mb-4">Spending Over Time</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="spent" stroke="#7C3AED" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* purchases table */}
        <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
          <p className="font-bold text-gray-700 mb-4">Recent Purchases</p>
          {purchases.length === 0 ? (
            <p className="text-center text-gray-400 py-6">No recent data</p>
          ) : (
            <table className="table-auto w-full min-w-[600px] border-collapse rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p, i) => (
                  <tr
                    key={p.id}
                    className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-indigo-50 transition`}
                  >
                    <td className="p-3">{p.product}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3">{p.price} XAF</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          p.status === "Complete"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* pie chart */}
        <div className="bg-white shadow-lg rounded-xl p-6 w-full overflow-x-auto">
          <p className="font-bold text-gray-700 mb-4">Favorite Categories</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

export default Statistics;

import { useEffect, useState } from "react";
import UserAvatar from "../../components/UseAvatar";
import { FaCoins, FaCheckCircle, FaClock } from "react-icons/fa";
import {
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  BarChart,
} from "recharts";
import { api } from "../../API/Registration";
import type {UserProps} from "../../types/UserRead";
import type { Order } from "../../types/products";


function Statistics() {
  const token = localStorage.getItem("token")
  const [user, setUser] = useState<UserProps | undefined>()
  const [error, setError] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [graphData, setGraphData] = useState<{ week: string; spent: number }[]>([]);


  useEffect(() => {
    api
      .get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => setError("Failed to fetch user"));
  }, []);

  useEffect(() => {
    if(!user?.id) return

    api
    .get(`/orders/${user.id}`)
    .then((res) => {
      setOrders(res.data)
      //
        const dataMap: Record<string, number> = {};
        res.data.forEach((order: Order) => {
          const date = new Date(order.created_at);
          const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`; // e.g., "2025-09"
          if (dataMap[month]) dataMap[month] += order.total_amount;
          else dataMap[month] = order.total_amount;
        });

        const chartData = Object.entries(dataMap)
          .map(([week, spent]) => ({ week, spent }))
          .sort((a, b) => new Date(a.week + "-01").getTime() - new Date(b.week + "-01").getTime()); // sort by month

        setGraphData(chartData);
      console.log(res.data)
    })
    .catch((err:any) =>{
      setError(err)
      console.log(error)
    })

  }, [user]);

  const totalSpent = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const completedOrders = orders.filter((p) => p.status === "Complete").length;
  const pendingOrders = orders.filter((p) => p.status === "Pending").length;

  return (
    <div className="p-4 md:p-6 flex flex-col gap-10">
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

        <div className="flex flex-col md:flex-row gap-6">
          {/* Total Spent */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex-1 flex items-center gap-4 text-white transform hover:scale-105 transition-transform">
            <div className="bg-secondary/20 p-3 rounded-full">
              <FaCoins size={24} className="text-secondary"/>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium opacity-90 text-primary">Total Spent</p>
              <p className="text-2xl font-bold text-secondary">{totalSpent} XAF</p>
            </div>
          </div>

          {/* Completed Orders */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex-1 flex items-center gap-4 text-white transform hover:scale-105 transition-transform">
            <div className="bg-secondary/20 p-3 rounded-full">
              <FaCheckCircle size={24} className="text-secondary"/>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium opacity-90 text-primary">Total Spent</p>
              <p className="text-2xl font-bold text-secondary">{completedOrders}</p>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex-1 flex items-center gap-4 text-white transform hover:scale-105 transition-transform">
            <div className="bg-secondary/20 p-3 rounded-full">
              <FaClock size={24} className="text-secondary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium opacity-90 text-primary">Pending Orders</p>
              <p className="text-2xl font-bold text-secondary">{pendingOrders}</p>
            </div>
          </div>
        </div>

        {/* line chart */}
        <div className="bg-white shadow-lg rounded-xl p-6 w-full overflow-x-auto">
          <p className="font-bold text-gray-700 mb-4">Spending Over Time</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={graphData} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip formatter={(value: number) => `${value} XAF`} />
              <Bar dataKey="spent" fill="#14452f" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
    </div>
  );
}

export default Statistics;

import  { useEffect, useState } from 'react'
import logo from "../../assets/images/mboakakologo.png"
import statistics from "../../assets/images/statistics.svg"
import profile from "../../assets/images/profile.svg"
import order from "../../assets/images/order.svg"
import { Link } from 'react-router-dom'
import UserAvatar from '../../components/UseAvatar'
import { LogOut } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  status: "Pending" | "Complete";
}

function Dashboard() {
  const [Products, SetProducts] = useState<Product[]>([])

  // fake data set for testing
  useEffect(() => {
    const fakeData: Product[] = [
      { id: 1, name: "Wireless Mouse", category: "Electronics", price: 12000, status: "Pending" },
      { id: 2, name: "Leather Wallet", category: "Accessories", price: 8000, status: "Complete" },
      { id: 3, name: "Running Shoes", category: "Footwear", price: 25000, status: "Pending" },
      { id: 4, name: "Smartphone", category: "Electronics", price: 120000, status: "Complete" },
      { id: 5, name: "Backpack", category: "Bags", price: 18000, status: "Pending" },
    ];
    setTimeout(() => SetProducts(fakeData), 500);
  }, []);

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
          <div className="flex gap-3 items-center px-3 py-2 bg-white/20 rounded-lg cursor-pointer flex-shrink-0">
            <img src={order} alt="" className="w-5" />
            <p>Order</p>
          </div>

          <Link to="/statistics" className="flex gap-3 items-center px-3 py-2 hover:bg-white/20 transition rounded-lg flex-shrink-0">
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

      {/* main section */}
      <main className="w-full md:w-4/5 p-4 md:p-6 flex flex-col gap-6">
        {/* text and profile */}
        <div className="flex flex-row md:flex-row justify-between items-start md:items-center bg-white rounded-xl shadow-md px-4 md:px-6 py-4 gap-4 md:gap-0">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl md:text-3xl text-gray-800">Orders</h1>
            <p className="text-sm text-primary">All Products Ordered
              <hr className='text-primary w-24 md:w-35'/>
            </p>
          </div>
          <UserAvatar />
        </div>

        {/* table section */}
        <div className="bg-white rounded-xl shadow-lg p-4 overflow-x-auto">
          {Products.length === 0 ? (
            <p className="text-center text-gray-400 py-6 text-lg">
              No recent data
            </p>
          ) : (
            <table className="table-auto w-full border-collapse rounded-lg overflow-hidden shadow-sm min-w-[600px] md:min-w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-3 w-[40%] text-left">Product</th>
                  <th className="p-3 w-[20%] text-left">Category</th>
                  <th className="p-3 w-[20%] text-left">Price</th>
                  <th className="p-3 w-[20%] text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {Products.map((product, i) => (
                  <tr
                    key={product.id}
                    className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-indigo-50 transition`}
                  >
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">{product.category}</td>
                    <td className="p-3">{product.price} XAF</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.status === "Complete"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard

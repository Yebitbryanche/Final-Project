import  { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LogOut, LayoutDashboard } from "lucide-react";
import { FaUpload } from "react-icons/fa";
import orderIcon from "../../assets/images/order.svg";
import statisticsIcon from "../../assets/images/statistics.svg";
import profileIcon from "../../assets/images/profile.svg";

export default function AdminDashboardLayout() {
  const [user, setUser] = useState<{ role?: boolean } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-20">
      {/* Sidebar */}
      <aside className="bg-white w-full md:w-1/5 p-5 flex flex-col gap-10 shadow-2xl rounded-tr-2xl rounded-br-2xl text-gray-800">
        <div className="flex justify-center md:justify-start gap-2 mb-6">
          <LayoutDashboard className="text-primary w-6 h-6 mt-1" />
          <p className="font-bold text-xl mt-1">Admin Dashboard</p>
        </div>

        <div className="flex flex-row md:flex-col gap-4 md:gap-6">
          <NavLink
            to="/admin-dashboard/order"
            className={({ isActive }) =>
              isActive
                ? "flex gap-3 items-center px-3 py-2 bg-primary/20 font-semibold rounded-lg"
                : "flex gap-3 items-center px-3 py-2 hover:transition rounded-lg"
            }
          >
            <img src={orderIcon} alt="" className="w-5" />
            <p>Order</p>
          </NavLink>

          <NavLink
            to="/admin-dashboard/statistics"
            className={({ isActive }) =>
              isActive
                ? "flex gap-3 items-center px-3 py-2 bg-primary/20 font-semibold rounded-lg"
                : "flex gap-3 items-center px-3 py-2 hover:transition rounded-lg"
            }
          >
            <img src={statisticsIcon} alt="" className="w-5" />
            <p>Statistics</p>
          </NavLink>

          <NavLink
            to="/admin-dashboard/profile"
            className={({ isActive }) =>
              isActive
                ? "flex gap-3 items-center px-3 py-2 bg-primary/20 font-semibold rounded-lg"
                : "flex gap-3 items-center px-3 py-2 hover:transition rounded-lg"
            }
          >
            <img src={profileIcon} alt="" className="w-5" />
            <p>Profile</p>
          </NavLink>

          {/* Upload Product only visible for admins */}
          {user?.role && (
            <NavLink
              to="/admin-dashboard/upload"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 items-center px-3 py-2 bg-primary/20 font-semibold rounded-lg"
                  : "flex gap-3 items-center px-3 py-2 hover:transition rounded-lg"
              }
            >
              <FaUpload className="w-5" />
              <p>Upload Product</p>
            </NavLink>
          )}

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "flex gap-3 items-center px-3 py-2 font-semibold rounded-lg bg-primary/20"
                : "flex gap-3 items-center px-3 py-2 hover:transition rounded-lg"
            }
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
            }}
          >
            <LogOut className="w-5 h-5" />
            <p>Logout</p>
          </NavLink>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}

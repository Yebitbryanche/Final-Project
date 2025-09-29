import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import orderIcon from "../../assets/images/order.svg";
import statisticsIcon from "../../assets/images/statistics.svg";
import profileIcon from "../../assets/images/profile.svg";
import { LogOut, LayoutDashboard } from "lucide-react";
import Modal from "../../components/Modal";
import { FaWhatsapp } from "react-icons/fa";

export default function DashboardLayout() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");      // clear login token
    localStorage.removeItem("profilePic"); // clear profile picture
    setShowLogoutModal(false);
    navigate("/dashboard/logout");         
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-20">
      {/* Sidebar */}
      <aside className="bg-white w-full md:w-1/5 p-5 flex flex-col gap-10 shadow-2xl rounded-tr-2xl rounded-br-2xl text-gray-800">
        <div className="flex justify-center md:justify-start gap-2 mb-6">
          <LayoutDashboard className="text-primary w-6 h-6 mt-1" />
          <p className="font-bold text-xl mt-1">Dashboard</p>
        </div>

        <div className="flex flex-row  md:flex-col gap-4  md:gap-6 ">
          <NavLink
            to="/dashboard/order"
            className={({ isActive }) =>
              isActive
                ? "flex gap-3 items-center px-3 py-2 bg-primary/20 font-semibold rounded-lg"
                : "flex gap-3 items-center px-3 py-2 hover: transition rounded-lg"
            }
          >
            <img src={orderIcon} alt="" className="w-5" />
            <p>Order</p>
          </NavLink>

          <NavLink
            to="/dashboard/statistics"
            className={({ isActive }) =>
              isActive
                ? "flex gap-3 items-center px-3 py-2 bg-primary/20 font-semibold rounded-lg"
                : "flex gap-3 items-center px-3 py-2 hover: transition rounded-lg"
            }
          >
            <img src={statisticsIcon} alt="" className="w-5" />
            <p>Statistics</p>
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              isActive
                ? "flex gap-3 items-center px-3 py-2 bg-primary/20 font-semibold rounded-lg"
                : "flex gap-3 items-center px-3 py-2 hover:transition rounded-lg"
            }
          >
            <img src={profileIcon} alt="" className="w-5" />
            <p>Profile</p>
          </NavLink>

          {/*  triggers modal */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex gap-3 items-center px-3 py-2 hover:bg-gray-100 transition rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            <p>Logout</p>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Outlet />
      </main>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Yes, Logout"
        cancelText="Cancel"
      />
      <a
        href="https://wa.me/237651138159"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-110 animate-bounce"
      >
        <FaWhatsapp size={28} />
      </a>
    </div>
  );
}

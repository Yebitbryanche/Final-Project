
import React, { useEffect, useState } from "react";
import logo from "../../assets/images/mboakakologo.png";
import statistics from "../../assets/images/statistics.svg";
import profile from "../../assets/images/profile.svg";
import history from "../../assets/images/history.svg";
import order from "../../assets/images/order.svg";
import { Link } from "react-router-dom";
import UserAvatar from "../../components/UseAvatar";

// function History() {
//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">

//        {/* aside */}
//       <aside className="bg-gradient-to-b from-primary to-indigo-600 w-1/5 p-5 flex flex-col gap-10 shadow-2xl rounded-tr-2xl rounded-br-2xl text-white">
//         {/* logo */}
//         <div>
//           <img src={logo} alt="" className="w-32" />
//         </div>
//         {/* links */}
//         <div className="flex flex-col gap-6">
//           <Link to="/" className="flex gap-3 items-center px-3 py-2 hover:bg-white/20 transition rounded-lg">
//             <img src={order} alt="" className="w-5 " />
//             <p>Order</p>
//           </Link>
//           <Link to="/statistics" className="flex gap-3 items-center px-3 py-2 hover:bg-white/20 transition rounded-lg">
//             <img src={statistics} alt="" className="w-5" />
//             <p>Statistics</p>
//           </Link>
//           <Link to="/profile" className="flex gap-3 items-center px-3 py-2 hover:bg-white/20 transition rounded-lg">
//             <img src={profile} alt="" className="w-5" />
//             <p>Profile</p>
//           </Link>
//           <Link to="/history" className="flex gap-3 items-center px-3 py-2 hover:bg-white/20 transition rounded-lg">
//             <img src={history} alt="" className="w-5" />
//             <p>History</p>
//           </Link>
//         </div>
//       </aside>

//       <main className="w-4/5 overflow-y-auto p-6 flex flex-col gap-10">
//         {/* header */}
//         <div className="flex justify-between items-center bg-white rounded-xl shadow-md px-6 py-4">
//           <div className="flex flex-col gap-2">
//             <h1 className="font-bold text-3xl text-gray-800">History</h1>
//             <p className="text-sm text-primary">Your journey so far
//               <hr className="text-primary w-30"/>
//             </p>
//           </div>
//           <UserAvatar />
//         </div>
//       </main>
      
//     </div>
//   )
// }

// export default History





import { LogOut, ShoppingBag, ShieldCheck } from "lucide-react";

function LogoutPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      
     
      {/* main section */}
      <main className="w-full md:flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          {/* icon */}
          <div className="flex justify-center mb-4">
            <LogOut className="w-12 h-12 text-primary" />
          </div>

          {/* confirmation message */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            You’ve been logged out
          </h1>
          <p className="text-gray-500 mb-6">
    For your security, never share your password with anyone.
          </p>

          
          {/* buttons */}
          <div className="flex flex-col gap-3">
            <Link
              to="/login"
              className="bg-primary hover:bg-secondary text-white py-2 px-4 rounded-xl font-medium shadow transition"
            >
              Log In Again
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 text-primary hover:underline text-sm font-medium"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>

      {/* footer message */}
      <div className="absolute bottom-4 w-full text-center text-sm text-gray-400 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4" />
        <p>Thanks for shopping with us — see you soon!</p>
      </div>
    </div>
  );
}

export default LogoutPage;



import { Link } from "react-router-dom";



import { LogOut, ShoppingBag, ShieldCheck } from "lucide-react";

function LogoutPage() {
  return (
    <div className="flex flex-col gap-10 p-4 mt-[4rem] md:p-6 justify-center items-center">
      
     
      {/* main section */}
      
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          {/* icon */}
          <div className="flex justify-center mb-4">
            <LogOut className="w-12 h-12 text-gray-800" />
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
              className="bg-secondary text-white hover:text-white py-2 px-4 rounded-xl font-medium shadow transition cursor-pointer"
            >
              Log In Again
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 text-secondary hover:underline text-sm font-medium"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
    

      {/* footer message */}
      <div className="absolute bottom-4 w-full text-center text-sm text-gray-400 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4" />
        <p>Thanks for shopping with us — see you soon!</p>
      </div>
    </div>
  );
}

export default LogoutPage;

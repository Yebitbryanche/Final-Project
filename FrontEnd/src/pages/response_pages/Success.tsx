import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center w-full max-w-sm sm:max-w-md lg:max-w-lg">
        
        {/* Success Icon */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-500 rounded-full mb-4">
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Payment Successful
        </h2>

        

        {/* Thank you message */}
        <p className="text-gray-500 text-sm sm:text-base mb-6">
          Thank you for trusting MboaKako. Your order will be processed shortly.
        </p>

        {/* CTA Button */}
        <Link to="/" className="block">
          <button className="w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
}

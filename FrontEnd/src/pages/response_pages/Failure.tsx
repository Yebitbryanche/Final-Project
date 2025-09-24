export default function PaymentError() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-500 rounded-full mb-4">
          <svg
            
            className="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Failed
        </h2>

        
        <p className="text-gray-600 mb-1">
          Order <span className="font-semibold">#12345</span> |{" "}
          <span className="font-semibold">$99.99</span>
        </p>

      
        <p className="text-gray-500 mb-6">
          Oops! Something went wrong with your payment. Please try again or
          use a different method.
        </p>

        
        <div className="flex gap-3 justify-center">
          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
            Go to Homepage
          </button>
          <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition">
            Retry Payment
          </button>
        </div>
      </div>
    </div>
  );
}
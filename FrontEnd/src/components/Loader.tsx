import { useLocation } from "react-router-dom";

function Loader() {
  const location = useLocation(); // gives the current location object

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="w-12 h-12 border-4 border-t-secondary border-b-secondary border-l-gray-200 border-r-gray-200 rounded-full animate-spin"></div>
      
      {location.pathname === '/' ? (
        <p className="absolute bottom-20 text-center w-full text-gray-700">
          Signup to view content
        </p>
      ) : (
        <p className="absolute bottom-20 text-center w-full text-gray-700">
          If it takes longer to load, try logging in
        </p>
      )}
    </div>
  );
}

export default Loader;

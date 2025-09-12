import { useEffect, useState } from "react";
import logo from "../../assets/images/mboakakologo.png";
import statistics from "../../assets/images/statistics.svg";
import profile from "../../assets/images/profile.svg";
import history from "../../assets/images/history.svg";
import order from "../../assets/images/order.svg";
import { Link } from "react-router-dom";
import welcome from "../../assets/images/welcome.png";
import { PlusIcon } from "@heroicons/react/24/solid";
import { LogOut } from "lucide-react";

function Profile() {
  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("profilePic");
    if (savedImage) setProfilePic(savedImage);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setProfilePic(base64);
        localStorage.setItem("profilePic", base64);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setProfilePic(null);
    localStorage.removeItem("profilePic");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      {/* sidebar */}
      <aside className="bg-gradient-to-b from-secondary/70 to-primary  w-full md:w-1/5 p-5 flex flex-col gap-10 shadow-2xl rounded-tr-2xl rounded-br-2xl text-white">
      {/* logo */}
        <div className="flex justify-center md:justify-start">
          <p className='font-bold text-xl mt-6'>Dashboard</p>
          <img src={logo} alt="" className="w-20" />
        </div>
        <div className="flex flex-row md:flex-col gap-4 md:gap-6 overflow-x-auto md:overflow-visible">
          <Link to="/" className="flex gap-3 items-center px-3 py-2 hover:bg-white/20 transition rounded-lg flex-shrink-0">
            <img src={order} alt="" className="w-5" />
            <p>Order</p>
          </Link>
          <Link to="/statistics" className="flex gap-3 items-center px-3 py-2 hover:bg-white/20 transition rounded-lg flex-shrink-0">
            <img src={statistics} alt="" className="w-5" />
            <p>Statistics</p>
          </Link>
          <Link to="/profile" className="flex gap-3 items-center px-3 py-2 bg-white/20 font-semibold rounded-lg flex-shrink-0">
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
        {/* welcome card */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-md shadow-xl w-full h-40 md:h-44 rounded-3xl flex flex-row md:flex-row justify-between items-center p-4 md:p-6 border border-white/20 gap-4 md:gap-0">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="text-2xl md:text-3xl font-semibold text-secondary">Hi Angela!</p>
            <span className="text-sm text-gray-600">Welcome back to your profile</span>
          </div>
          <img src={welcome} alt="" className="w-40 md:w-62 object-cover" />
        </div>

        {/* profile card */}
        <div className="bg-gradient-to-br from-white/70 to-gray-100/50 backdrop-blur-xl shadow-xl rounded-3xl p-6 md:p-8 max-w-lg md:max-w-xl mx-auto w-full border border-white/20">
          <div className="flex flex-col items-center gap-6">
            {/* Profile picture */}
            <div className="relative">
              <label
                htmlFor="fileInput"
                className="cursor-pointer flex items-center justify-center w-36 md:w-40 h-36 md:h-40 rounded-full border-4 border-primary shadow-xl overflow-hidden bg-gray-100 hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
              >
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <PlusIcon className="w-8 md:w-10 h-8 md:h-10 text-primary" />
                )}
              </label>
              <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              {profilePic && (
                <button
                  onClick={handleRemoveImage}
                  className="absolute bottom-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full shadow-md hover:bg-red-600 transition"
                >
                  ✕
                </button>
              )}
            </div>

            {/* User details */}
            <div className="flex flex-col items-center gap-2 mt-4 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Angela Sap</h2>
              <p className="text-gray-500 text-xs md:text-sm">angelasap@gmail.com</p>
              <span className="mt-2 px-3 py-1 text-xs md:text-sm rounded-full bg-primary/10 text-primary font-medium">
                Active Member
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;

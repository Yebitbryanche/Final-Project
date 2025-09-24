import { useEffect, useState } from "react";
import welcome from "../../assets/images/welcome.png";
import { PlusIcon } from "@heroicons/react/24/solid";

import axios from "axios";

function Profile() {
  const [profilePic, setProfilePic] = useState<string | null>(null);

  // state for user info from the backend
  const [userData, setUserData] = useState<{ user_name: string; email: string } | null>(null);

  useEffect(() => {
    // ✅ Fix: restore profilePic from localStorage on mount
    const storedPic = localStorage.getItem("profilePic");
    if (storedPic) {
      setProfilePic(storedPic);
    }

    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUserData(null);   // clear user info if logged out
        setProfilePic(null); // clear profile pic if logged out
        return;
      }
      try {
        const response = await axios.get("http://localhost:8000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();

    // Listen for storage changes
    const handleStorageChange = () => {
      if (!localStorage.getItem("token")) {
        setUserData(null);
        setProfilePic(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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
    <div className=" flex flex-col gap-10 p-4  md:p-6">
      {/* sidebar */}

      {/* main */}
      
      {/* welcome card */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-md shadow-xl w-full h-40 md:h-44 rounded-3xl flex flex-row md:flex-row justify-between items-center p-4 md:p-6 border border-white/20 gap-4 md:gap-0">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <p className="text-2xl md:text-3xl font-semibold text-secondary">
            Hi {userData?.user_name || "Loading ..."} !
          </p>
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
              className="cursor-pointer flex items-center justify-center w-36 md:w-40 h-36 md:h-40 rounded-full border-4 border-secondary shadow-xl overflow-hidden bg-gray-100 hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
            >
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <PlusIcon className="w-8 md:w-10 h-8 md:h-10 text-secondary" />
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
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{userData?.user_name}</h2>
            <p className="text-gray-500 text-xs md:text-sm">{userData?.email}</p>
            <span className="mt-2 px-3 py-1 text-xs md:text-sm rounded-full bg-primary/10 text-primary font-medium">
              Active Member
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

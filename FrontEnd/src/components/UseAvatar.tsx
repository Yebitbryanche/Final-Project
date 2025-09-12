import { useEffect, useState } from "react";

function UserAvatar() {
  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("profilePic");
    if (savedImage) {
      setProfilePic(savedImage);
    }
  }, []);

  return (
    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500 shadow-md">
      {profilePic ? (
        <img src={profilePic} alt="User Avatar" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
          U
        </div>
      )}
    </div>
  );
}

export default UserAvatar;

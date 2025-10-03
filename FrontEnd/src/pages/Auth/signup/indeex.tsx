import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { api } from "../../../API/Registration";
import signup from "../../../assets/images/signup.png";

function Signup() {
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(false); // false by default (not admin)
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Regex validators
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9._]{3,20}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Validate inputs
  const validateInputs = () => {
    if (!user_name || !password || !email) {
      setError("All fields are required.");
      return false;
    }
    if (!usernameRegex.test(user_name)) {
      setError(
        "Username must be 3–20 characters long and can only contain letters, numbers, . and _"
      );
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character."
      );
      return false;
    }
    return true;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateInputs()) return;

    try {
      // Send boolean role to backend
      const response = await api.post("/signup", {
        user_name,
        password,
        email,
        role, // boolean
      });
      console.log(response.data);

      // Save string role to localStorage for frontend check
      localStorage.setItem(
        "user",
        JSON.stringify({
          user_name,
          email,
          role: role ? "admin" : "user", // <-- key fix
          avatar: "/Avatar.png",
        })
      );

      setSuccess("Account created successfully! 🎉");
      setUser_name("");
      setPassword("");
      setEmail("");
      setRole(false);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
   <div className="flex justify-center items-center px-4 py-8 sm:py-12 mt-[5rem] relative">
  {/* Error Toast */}
  {error && (
    <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:translate-x-[-50%] max-w-sm mx-auto rounded-md text-white flex justify-between items-center bg-red-500 p-3 shadow-lg">
      <p className="text-sm sm:text-base">{error}</p>
    </div>
  )}

  {/* Success Toast */}
  {success && (
    <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:translate-x-[-50%] max-w-sm mx-auto rounded-md text-white flex justify-between items-center bg-green-500 p-3 shadow-lg">
      <p className="text-sm sm:text-base">{success}</p>
    </div>
  )}

  <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-lg rounded-lg overflow-hidden">
    {/* Left Side */}
    <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-6 sm:p-10">
      <img
        src={signup}
        alt="Signup"
        className="w-full max-w-xs sm:max-w-sm transform transition-transform duration-500 hover:rotate-y-12 hover:scale-105"
        style={{ perspective: "1000px" }}
      />
      <h1 className="text-lg sm:text-xl md:text-2xl text-primary font-bold mt-4 text-center">
        Shop Smart
      </h1>
      <p className="text-xs sm:text-sm md:text-base text-center text-secondary mt-2">
        Create your account for personalised deals
      </p>
    </div>

    {/* Right Side */}
    <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-6 sm:p-8 md:p-10">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary mb-6">
        Sign Up
      </h2>

      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        {/* Username */}
        <label className="block text-gray-700 mb-1 font-medium text-sm sm:text-base">
          Username
        </label>
        <div className="flex items-center bg-secondary/10 rounded-lg mb-4 p-2 focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
          <FaUser className="text-black/50 mr-2" />
          <input
            type="text"
            required
            placeholder="Enter your username"
            value={user_name}
            onChange={(e) => setUser_name(e.target.value)}
            className="w-full p-2 outline-none text-sm sm:text-base"
          />
        </div>

        {/* Email */}
        <label className="block text-gray-700 mb-1 font-medium text-sm sm:text-base">
          Email
        </label>
        <div className="flex items-center bg-secondary/10 rounded-lg mb-4 p-2 focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
          <FaEnvelope className="text-black/50 mr-2" />
          <input
            required
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 outline-none text-sm sm:text-base"
          />
        </div>

        {/* Password */}
        <label className="block text-gray-700 mb-1 font-medium text-sm sm:text-base">
          Password
        </label>
        <div className="flex items-center bg-secondary/10 rounded-lg mb-2 p-2 focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
          <FaLock className="text-black/50 mr-2" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 outline-none text-sm sm:text-base"
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          <label className="text-xs sm:text-sm text-gray-600">
            Show password
          </label>
        </div>

        {/* Sign Up button */}
        <button
          type="submit"
          className="px-6 sm:px-10 py-2 sm:py-3 block mx-auto rounded-lg font-semibold text-white hover:opacity-90 transition mb-4 text-sm sm:text-base"
          style={{ backgroundColor: "var(--color-secondary)" }}
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-xs sm:text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-medium"
          style={{ color: "var(--color-secondary)" }}
        >
          Login
        </a>
      </p>
    </div>
  </div>
</div>

  );
}

export default Signup;

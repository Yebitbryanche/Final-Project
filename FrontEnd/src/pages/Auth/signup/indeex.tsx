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
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
    <div className="flex justify-center items-center py-10 px-4 mt-[5rem]">
      {/* Error Toast */}
      {error && (
        <div className="absolute w-100 bottom-1 items-center rounded-sm text-white flex justify-between bg-red-500 left-1 p-4">
          <p className="text-white">{error}</p>
        </div>
      )}
      {/* Success Toast */}
      {success && (
        <div className="absolute w-100 bottom-1 items-center rounded-sm text-white flex justify-between bg-green-500 left-1 p-4">
          <p className="text-white mb-2">{success}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-lg rounded-lg overflow-hidden mt-[4rem]">
        {/* Left Side */}
        <div className="w-full bg-white inset-shadow-sm md:w-1/2 flex flex-col justify-center items-center p-10 text-white md:rounded-tr-sm rounded-br-sm">
          <img
            src={signup}
            alt="image"
            className="w-full max-w-sm transform transition-transform duration-500 hover:rotate-y-12 hover:scale-105"
            style={{ perspective: "1000px" }}
          />
          <h1 className="text-xl text-primary md:text-2xl font-bold mb-4 text-center">
            Shop Smart
          </h1>
          <p className="text-sm md:text-sm text-center text-secondary">
            Create your account for personalised deals
          </p>
        </div>

        {/* Right Side */}
        <div className="inset-shadow-sm w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            {/* Username */}
            <label className="block text-black-700 mb-1 font-medium">
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
                className="w-full p-2 outline-none focus:border-primary focus:ring-0"
              />
            </div>

            {/* Email */}
            <label className="block text-black-700 mb-1 font-medium">
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
                className="w-full p-2 outline-none"
              />
            </div>

            {/* Password */}
            <label className="block text-black-700 mb-1 font-medium">
              Password
            </label>
            <div className="flex items-center bg-secondary/10 rounded-lg mb-2 p-2 focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
              <FaLock className="text-black/50 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 outline-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <label className="text-sm text-gray-600">Show password</label>
              </div>

              {/* Role toggle */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={role}
                  onChange={() => setRole(!role)}
                  className="mr-2 bg-secondary"
                />
                <label className="text-sm text-gray-600">Register as Admin</label>
              </div>
            </div>

            {/* Sign Up button */}
            <button
              type="submit"
              className="px-10 py-3 block mx-auto rounded-lg font-semibold text-white hover:opacity-90 transition mb-4"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
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

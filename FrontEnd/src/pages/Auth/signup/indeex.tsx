import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { api } from "../../../API/Registration";
import { validateInputs } from "../../../services/validation";

function Signup() {
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validateInputs(email,password,user_name)) return; // block signup if invalid

    try {
      const response = await api.post('/signup', {
        user_name,
        password,
        email,
        role,
      });
      console.log(response.data)

      setSuccess("Account created successfully! 🎉");
      setUser_name("");
      setPassword("");
      setEmail("");
      setRole(false);
        setTimeout(()=>{
            navigate("/login")
        },2000)
    } catch (err: any) {
      setError(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center py-10 px-4">
      {error && (
        <div className="absolute w-100 bottom-1 items-center rounded-sm text-white flex justify-between bg-red-500 left-1 p-4">
          <p className="text-white">{error}</p>
        </div>
      )}
      {success && (
        <div className="absolute w-100 bottom-1 items-center rounded-sm text-white flex justify-between bg-green-500 left-1 p-4">
          <p className="text-white mb-2">{success}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Side */}
        <div
          className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 text-white 
             md:rounded-tr-[100px] rounded-br-[100px]"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Shop Smart
          </h1>
          <p className="text-lg md:text-2xl text-center">
            Create your account for personalised deals
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
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
                  className="mr-2"
                />
                <label className="text-sm text-gray-600">Register as Admin</label>
              </div>
             </div>

            {/* Sign Up button */}
            <button
              type="submit"
              className="px-10 py-3 block mx-auto rounded-lg font-semibold text-white hover:opacity-90 transition mb-4"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium"
              style={{ color: "var(--color-primary)" }}
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

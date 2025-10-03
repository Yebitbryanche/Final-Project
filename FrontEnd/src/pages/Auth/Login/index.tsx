import React, { useState } from 'react'
import { FaLock, FaUser } from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
import images from '../../../types/images';
import { api } from '../../../API/Registration';
import { IoClose } from "react-icons/io5"; 
import login from "../../../assets/images/login.png"


function Login() {

  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("")
  const [showmessage, setShowmessage] = useState(false)
  const navigate = useNavigate()
  const [, setIsloading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsloading(true)
    try{
       const response = await api.post('/login',{user_name, password})

       localStorage.setItem("token",response.data.access_token)
       console.log(response.data.access_token)
        setUser_name("")
        setPassword("")
        console.log({ user_name });
        setShowmessage(true)
        setMessage("Login successfull ....") 
        if(!user_name){
            setMessage("User name required")
        }
        if(!password){
            setMessage("Wrong password")
        } 
        setTimeout(()=>{
            navigate("/")
        },2000)
      }
    catch(err:any){
       setMessage("failed to login please check credentials")
       setShowmessage(true)
    }
    finally{
      setIsloading(false)
    }

    
  };

  return (
<div className="flex justify-center items-center px-4 py-10 mt-[5rem]">
  {showmessage && (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-auto items-center rounded-md text-white flex justify-between p-4 shadow-lg ${
        message === "Login successfull ...." ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <p className="text-sm sm:text-base">{message}</p>
      <IoClose
        className="cursor-pointer ml-4"
        size={25}
        onClick={() => setShowmessage(false)}
      />
    </div>
  )}

  <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-lg rounded-lg overflow-hidden">
    {/* Left Side */}
    <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-6 md:p-10">
      <img
        src={login}
        alt="3D"
        className="w-full max-w-xs sm:max-w-sm transform transition-transform duration-500 hover:rotate-y-12 hover:scale-105"
        style={{ perspective: "1000px" }}
      />
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-center text-primary">
        Shop Smart
      </h1>
      <p className="text-xs sm:text-sm md:text-base text-center text-secondary">
        Login to your account for personalised deals
      </p>
    </div>

    {/* Right Side - Form */}
    <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-6 md:p-10">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Login
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4"
        autoComplete="off"
      >
        {/* Username */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium text-sm sm:text-base">
            User Name
          </label>
          <div className="flex items-center bg-secondary/10 rounded-lg p-2 focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
            <FaUser className="text-black/50 mr-2" />
            <input
              type="text"
              placeholder="Enter your User Name"
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)}
              className="w-full p-2 outline-none bg-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium text-sm sm:text-base">
            Password
          </label>
          <div className="flex items-center bg-secondary/10 rounded-lg p-2 focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
            <FaLock className="text-black/50 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 outline-none bg-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Show password */}
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          <label htmlFor="showPassword" className="text-xs sm:text-sm text-gray-600">
            Show password
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <button className="flex items-center justify-center gap-2 py-2 px-6 rounded-lg hover:bg-gray-100 transition w-full sm:w-auto">
            <img src={images.google} alt="Google" className="w-5 h-5" />
            <span className="text-sm">Login with Google</span>
          </button>
          <button className="text-sm text-gray-600 hover:underline">
            Forgot password?
          </button>
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="w-full px-8 py-3 rounded-lg font-semibold text-white hover:opacity-80 transition"
          style={{ backgroundColor: "var(--color-secondary)" }}
        >
          Login
        </button>
      </form>

      {/* Signup link */}
      <p className="mt-4 text-sm text-gray-600 text-center">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="font-medium"
          style={{ color: "var(--color-secondary)" }}
        >
          Sign Up
        </Link>
      </p>
    </div>
  </div>
</div>

  );
}

export default Login
   
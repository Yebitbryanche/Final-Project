import React, { useState } from 'react'
import { FaLock, FaUser } from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
import images from '../../../types/images';
import { api } from '../../../API/Registration';
import { IoClose } from "react-icons/io5";


function Login() {

  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("")
  const [showmessage, setShowmessage] = useState(false)
  const navigate = useNavigate()
  const [isloading, setIsloading] = useState(false)

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
            navigate("/dashboard")
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
    <div className="flex justify-center items-center py-10 px-4 ">
      {showmessage && (
        <div
          className={`absolute w-100 bottom-5 items-center rounded-sm text-white flex justify-between left-1 p-4 ${
            message === "Login successfull ...." ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p>{message}</p>
          <IoClose
            className="cursor-pointer"
            size={30}
            onClick={() => setShowmessage(false)}
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-lg rounded-lg overflow-hidden mt-[4rem]">
        {/* Left Side - Colored */}
        <div
          className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 text-white 
             md:rounded-tr-[100px] rounded-br-[100px]  "
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Shop Smart</h1>
          <p className="text-lg md:text-xl text-center">
            Login to your account for personalised deals
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-sm" autoComplete="off">
            {/* Email */}
            <label className="block text-black-700 mb-1 font-medium">User Name</label>
            <div className="flex items-center bg-secondary/10 rounded-lg mb-4 p-2 focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
              <FaUser className="text-black/50 mr-2" />
              <input
                type="text"
                placeholder="Enter your User Name"
                value={user_name}
                onChange={(e) => setUser_name(e.target.value)}
                autoComplete="off"
                className="w-full p-2 outline-none"
              />
            </div>

            {/* Password */}
            <label className=" text-black-700 mb-1 font-medium">Password</label>
            <div className="flex items-center bg-secondary/10 rounded-lg mb-2 p-2 focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
              <FaLock className="text-black/50 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                className="w-full p-2 outline-none"
              />
            </div>

            {/* Show password checkbox */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-sm text-gray-600">
                Show password
              </label>
            </div>

           <div className='flex justify-between items-center'>
              {/* Google login button */}
              <button className="flex items-center justify-center gap-2 mb-2 py-2 px-6 rounded-lg hover:bg-gray-100 transition mx-auto">
                <img src={images.google} alt="Google" className="w-6 h-6" />
                <span className='text-sm'>Login with Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 mb-2 py-2 px-6 rounded-lg hover:bg-gray-100 transition mx-auto">
                <span className='text-sm'>Forgot password?</span>
              </button>
           </div>

            {/* Login button */}
            <button
              type="submit"
              className="px-10 cursor-pointer py-3 block mx-auto rounded-lg font-semibold text-white hover:opacity-80 transition mb-4"
              style={{ backgroundColor: "var(--color-primary)" }}
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

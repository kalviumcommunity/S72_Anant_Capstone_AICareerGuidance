import React, { useState } from 'react'
import axios from 'axios'
import { auth,googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


function Login() {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error, setError] = useState("");
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Store JWT token and user data
      localStorage.setItem("jwtToken", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("userEmail", res.data.user.email);

      console.log("Login successful");
      navigate("/");
      
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };


  const googleLogin=async ()=>{
    try{
      const result=await signInWithPopup(auth,googleProvider)
      const { email, displayName } = result.user;

      // Send to backend to get/create user and get JWT token
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        email,
        name: displayName,
      });

      // Store JWT token and user data
      localStorage.setItem("jwtToken", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("userEmail", res.data.user.email);

      navigate('/')
    }catch(err){
      console.error(err.message)
      setError("Google login failed. Please try again.");
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-blue-50 px-2 md:px-0">
      <div className="w-full max-w-sm md:max-w-md bg-white p-6 md:p-8 rounded-lg shadow-md mx-2 md:mx-0">
        <h2 className="text-xl md:text-2xl font-bold text-center text-gray-700 mb-6">
          Login to Account
        </h2>
        <button 
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-md shadow-md hover:bg-gray-100 text-sm md:text-base"
          onClick={googleLogin}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
            alt="Google Logo"
          />
          <span>Login with Google</span>
        </button>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or</span>
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
            onChange={(e)=> setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
            onChange={(e)=> setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 text-sm md:text-base"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm md:text-base">
          Don't have an account?
          <a href="/signup" className="text-blue-500 hover:underline ml-1">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
import React, { useState } from "react";
import {auth,googleProvider} from "../firebase"
import {  signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function SignUp() {

  const navigate=useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error,setError]=useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res=await axios.post("http://localhost:5000/auth/signup",{name,email,password})
      localStorage.setItem("jwtToken",res.data.token)
      localStorage.setItem("userId", res.data.user._id); // Save user._id

      console.log("SignUp successfull")
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
    
  };

    const googleLogin=async ()=>{
      try{
      const result=await signInWithPopup(auth,googleProvider)
      console.log(result.user)
      navigate('/')
      }catch(err){
        console.error(err.message)
      }
    }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-blue-50">
    <div className=" p-8 rounded-lg shadow-md max-w-md ">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Create an Account
      </h2>

      <button 
      className="w-full flex items-center justify-center gap-2 border py-2 rounded-md shadow-md hover:bg-gray-100"
      onClick={googleLogin}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5 h-5"
          alt="Google Logo"
        />
        <span>Sign up with Google</span>
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
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
          onChange={(e)=>setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
          onChange={(e)=>setEmail(e.target.value)}

        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>

      <p className="mt-4 text-center text-gray-600">
        Already have an account?
        <a href="/login" className="text-blue-500 hover:underline">
          Log in
        </a>
      </p>
    </div>
    </div>
  );
}

export default SignUp;

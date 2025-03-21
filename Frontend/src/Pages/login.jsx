import React from 'react'

function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-blue-50">
    <div className=" p-8 rounded-lg shadow-md max-w-md ">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Login to  Account
      </h2>

      <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-md shadow-md hover:bg-gray-100">
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

      <form className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"

        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Don't have an account?
        <a href="/signup" className="text-blue-500 hover:underline">
          Sign up
        </a>
      </p>
    </div>
    </div>
  )
}

export default Login
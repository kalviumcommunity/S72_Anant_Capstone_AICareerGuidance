import { NavLink } from "react-router-dom";

import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

const Nav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unSubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex items-center justify-between space-x-6 w-full  py-2">
      <div className="flex justify-between px-15">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 hover:text-yellow-600 transition duration-300 border-b-2 ${
              isActive ? "border-blue-400" : "border-transparent"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/test"
          className={({ isActive }) =>
            `px-4 py-2 hover:text-yellow-600 transition duration-300 border-b-2 ${
              isActive ? "border-blue-400" : "border-transparent"
            }`
          }
        >
          Start Assesment
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-4 py-2 hover:text-yellow-600 transition duration-300 border-b-2 ${
              isActive ? "border-blue-400" : "border-transparent"
            }`
          }
        >
          About
        </NavLink>
      </div>

      <div className="flex justify-between">
        {user ? (
          <>
            <NavLink to="/profile">
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="Profile Picture"
                className="w-10 h-10 rounded-full cursor-pointer mx-4"
                
              />
            </NavLink>
            <button
              onClick={handleSignOut}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <a
              href="/login"
              className="border border-gray-300 px-4 py-2 rounded-md mx-3"
            >
              Login
            </a>

            <a
              href="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Sign Up
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;

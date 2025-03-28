import { NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";

const Nav = () => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [jwtUser, setJwtUser] = useState(null);
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken")); // Track token

  useEffect(() => {
    const fetchJwtUser = async () => {
      if (!jwtToken) return;

      try {
        const res = await fetch("http://localhost:5000/auth/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setJwtUser(data.user);
        } else {
          setJwtUser(null);
        }
      } catch (error) {
        console.error("JWT Fetch Error:", error);
        setJwtUser(null);
      }
    };

    fetchJwtUser();
  }, [jwtToken]); // Fix: Depend on `jwtToken`

  const handleSignOut = async () => {
    if (firebaseUser) {
      await signOut(auth);
      setFirebaseUser(null);
    }

    if (jwtUser) {
      localStorage.removeItem("jwtToken");
      setJwtUser(null);
      setJwtToken(null); // Fix: Update token state
      window.dispatchEvent(new Event("storage"))
    }
  };

  const user = firebaseUser || jwtUser;
  const defaultProfilePic = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <div className="flex items-center justify-between space-x-6 w-full py-2">
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
          Start Assessment
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
                src={firebaseUser?.photoURL || jwtUser?.profilePic || defaultProfilePic}
                alt="Profile"
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

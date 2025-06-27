import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Nav = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getUserFromStorage = () => {
    const token = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const profilePicUrl = localStorage.getItem("profilePicUrl") || "https://via.placeholder.com/40";
    if (token && userId) {
      return {
        id: userId,
        name: userName,
        email: userEmail,
        photoURL: profilePicUrl
      };
    }
    return null;
  };


  // 🔹 Check Firebase Auth on Mount
  useEffect(() => {
    setUser(getUserFromStorage());
    // Listen for changes to localStorage (profilePicUrl)
    const handleStorage = (e) => {
      if (e.key === "profilePicUrl") {
        setUser(getUserFromStorage());
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleSignOut = async () => {
    // Clear all user data from localStorage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("profilePicUrl");
    setUser(null);
    navigate("/");

  };

  const user = firebaseUser || jwtUser;
  const defaultProfilePic =
    "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <nav className="relative w-full">
      {/* Hamburger Icon */}
      <div className="flex items-center justify-end sm:hidden">
        <button
          className="p-2 focus:outline-none rounded-md hover:bg-blue-100 transition"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Nav Links */}
      <div
        className={`w-full sm:bg-transparent absolute sm:static left-0 top-14 z-30 sm:z-auto transition-all duration-300 ease-in-out
          ${menuOpen ? 'block bg-white rounded-xl shadow-xl border border-blue-100 p-4 mt-2' : 'hidden'}
          sm:flex sm:items-center sm:justify-between sm:p-0 sm:shadow-none sm:border-none sm:mt-0 sm:rounded-none`
        }
      >
        <div className="flex flex-col sm:flex-row sm:space-x-6 items-center gap-2 sm:gap-0">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 hover:text-yellow-600 transition duration-300 border-b-2 sm:border-none ${
                isActive ? "border-blue-400" : "border-transparent"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/test"
            className={({ isActive }) =>
              `px-4 py-2 hover:text-yellow-600 transition duration-300 border-b-2 sm:border-none ${
                isActive ? "border-blue-400" : "border-transparent"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            Start Assessment
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-4 py-2 hover:text-yellow-600 transition duration-300 border-b-2 sm:border-none ${
                isActive ? "border-blue-400" : "border-transparent"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0 mt-4 sm:mt-0 border-t border-blue-100 pt-4 sm:border-none sm:pt-0">
          {user ? (
            <>
              <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="Profile Picture"
                  className="w-10 h-10 rounded-full cursor-pointer mx-4"
                />
              </NavLink>
              <button
                onClick={() => { handleSignOut(); setMenuOpen(false); }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 mt-2 sm:mt-0"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="border border-gray-300 px-4 py-2 rounded-md mx-3 mt-2 sm:mt-0"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2 sm:mt-0"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </a>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Nav;

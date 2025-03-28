import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true); // Show loading initially
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Show "Checking authentication..." for 1 second
    const checkTimer = setTimeout(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
        } else {
          // Check JWT token authentication
          const token = localStorage.getItem("jwtToken");
          if (token) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            setTimeout(() => {
              navigate("/login");
            }, 3000); // Redirect after 3 seconds
          }
        }
        setIsChecking(false);
      });

      return () => unsubscribe();
    }, 1000); // Delay authentication check for 1 second

    return () => clearTimeout(checkTimer); // Cleanup on unmount
  }, [navigate]);

  // Show "Checking authentication..." message for 1 second
  if (isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Checking authentication...
        </p>
      </div>
    );
  }

  // Show redirect message if user is not logged in
  if (isAuthenticated === false) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 max-w-lg rounded-md shadow-md">
          <p className="font-semibold">You are not logged in.</p>
          <p>Redirecting to the login page in a moment...</p>
          <div className="flex items-center mt-2">
            <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-yellow-600 text-sm">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return children; // Show the test page if authenticated
};

export default AuthWrapper;

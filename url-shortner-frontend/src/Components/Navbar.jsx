import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";

const Navbar = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const {token ,setToken} = useStoreContext()

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/");
  };

  return (
    <div className="h-16 bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-700 shadow-md z-50 sticky top-0 w-full">
      <div className="lg:px-14 sm:px-8 px-4 h-full flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex flex-col leading-tight">
            <h1 className="font-extrabold text-2xl sm:text-3xl text-white italic">
              SnapLink
            </h1>
            <span className="text-xs text-indigo-200 tracking-widest font-semibold">
              Track. Analyze. Grow.
            </span>
          </div>
        </Link>

        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center text-white sm:static absolute top-16 left-0 transition-all duration-300 sm:h-auto bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-700 sm:bg-none w-full sm:w-auto flex-col sm:flex-row px-6 sm:px-0 sm:py-0 py-4 shadow-md sm:shadow-none ${
            navbarOpen ? "h-fit opacity-100" : "h-0 opacity-0 sm:opacity-100 sm:h-auto overflow-hidden"
          }`}
        >
          <li>
            <Link
              className={`transition font-medium hover:text-yellow-300 ${
                path === "/" ? "text-yellow-300 font-semibold" : ""
              }`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`transition font-medium hover:text-yellow-300 ${
                path === "/about" ? "text-yellow-300 font-semibold" : ""
              }`}
              to="/about"
            >
              About
            </Link>
          </li>

          {token && (
            <li>
              <Link
                className={`transition font-medium hover:text-yellow-300 ${
                  path === "/dashboard" ? "text-yellow-300 font-semibold" : ""
                }`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}

          {!token && (
            <li>
              <Link to="/register">
                <span className="bg-rose-600 hover:bg-rose-700 transition px-4 py-2 rounded-lg text-white shadow-md font-semibold text-sm">
                  Sign Up
                </span>
              </Link>
            </li>
          )}

          {token && (
            <li>
              <button
                onClick={onLogOutHandler}
                className="bg-rose-600 hover:bg-rose-700 transition px-4 py-2 rounded-lg text-white shadow-md font-semibold text-sm"
              >
                Log Out
              </button>
            </li>
          )}
        </ul>

        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden z-50 focus:outline-none"
        >
          {navbarOpen ? (
            <RxCross2 className="text-white text-3xl" />
          ) : (
            <IoIosMenu className="text-white text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  logOut,
  useCurrentToken,
  useCurrentUser,
} from "../redux/features/auth/authSlice";

import { useAppDispatch, useAppSelector } from "../redux/features/hooks";
import { useGetUserQuery } from "../redux/features/admin/adminApi";
import Marquee from "react-fast-marquee";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  const { data } = useGetUserQuery(user?.userId);
  const dispatch = useAppDispatch();

  const handleLogout = () => dispatch(logOut());

  return (
    <div>
      <nav className="fixed top-0 z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://dreamsport.com/images/main-logo.png"
              className="h-14"
              alt="Logo"
            />
          </Link>

          {/* Search and Account */}
          <div className="flex items-center md:order-2">
            {/* Search */}
            <div className="relative w-32 md:w-60 md:block">
              <SearchBar />
            </div>

            {/* Login / Logout */}
            <div className="flex items-center gap-3">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="ml-3 text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm p-2 lg:px-5 lg:py-2.5 dark:bg-red-600"
                >
                  Logout
                </button>
              ) : (
                <Link to={`/login`}>
                  <button className="ml-3 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600">
                    Login
                  </button>
                </Link>
              )}

              {/* User Avatar */}
              {user && (
                <Link to={`${user?.role}/profile`}>
                  <button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={
                        data?.data?.profileImage ||
                        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                      }
                      alt="User Avatar"
                    />
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Main Nav Links for Desktop (md and above) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              to="/facilities"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
            >
              Facilities
            </Link>
            <Link
              to="/about"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
            >
              Contact Us
            </Link>
            {user && (
              <Link
                to={
                  user.role === "admin" ? `/admin/dashboard` : `/user/dashboard`
                }
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
              >
                Your Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Sidebar Button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden block text-gray-500 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Sidebar for Mobile (sm) */}
          <div
            className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:hidden`}
          >
            <div className="flex justify-end p-4">
              <button onClick={toggleSidebar} className="text-gray-500">
                &times; {/* Close Icon */}
              </button>
            </div>
            <ul className="flex flex-col items-start p-4 space-y-2">
              <li>
                <Link
                  to="/"
                  className="block hover:bg-slate-200 p-2 w-52 border border-gray-500 rounded-lg"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/facilities"
                  className="block hover:bg-slate-200 p-2 w-52 border border-gray-500 rounded-lg"
                >
                  Facilities
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block hover:bg-slate-200 p-2 w-52 border border-gray-500 rounded-lg"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block hover:bg-slate-200 p-2 w-52 border border-gray-500 rounded-lg"
                >
                  Contact Us
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    to={
                      user.role === "admin"
                        ? `/admin/dashboard`
                        : `/user/dashboard`
                    }
                    className="block hover:bg-slate-200 p-2 w-52 border border-gray-500 rounded-lg"
                  >
                    Your Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Marquee */}
      <Marquee
        pauseOnHover
        speed={40}
        gradient={false}
        className="overflow-hidden bg-slate-200 mt-[89px]"
      >
        <div className="text-black">
          <p className="ml-20">
            We are open daily from 08:00 AM to 08:00 PM, offering a flexible
            schedule tailored to your convenience. Each faculty is available in
            2-hour time slots, allowing you to make the most of your time with
            ease and efficiency.
          </p>
        </div>
      </Marquee>
    </div>
  );
};

export default Navbar;

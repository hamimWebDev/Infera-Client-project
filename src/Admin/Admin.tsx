import { Link, Outlet, useLocation } from "react-router-dom";

import { useState } from "react";

import { useAppSelector } from "../redux/features/hooks";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useGetUserQuery } from "../redux/features/admin/adminApi";

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const user = useAppSelector(useCurrentUser);
  const { data } = useGetUserQuery(user?.userId);
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link to={`/`} className="flex ms-2 md:me-24">
                <img
                  src="https://dreamsport.com/images/main-logo.png"
                  className="h-14"
                  alt="Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white ml-3">
                  Dream Sports
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <Link to={`profile`}>
                  {data?.data?.profileImage === "" ? (
                    <button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                        alt=""
                      />
                    </button>
                  ) : (
                    <button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={data?.data?.profileImage}
                        alt=""
                      />
                    </button>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={`dashboard`}
                className={` mt-2 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  location.pathname === "/admin/dashboard"
                    ? "border border-blue-500"
                    : ""
                }`}
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to={`users`}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  location.pathname === "/admin/users"
                    ? "border border-blue-500"
                    : ""
                }`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">All Users</span>
              </Link>
            </li>
            <li>
              <Link
                to={`profile`}
                className={`flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  location.pathname === "/admin/profile"
                    ? "border border-blue-500"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                  focusable="false"
                  height={20}
                  width={20}
                  style={{ fill: "#9CA3AF" }}
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>

            <li>
              <div className="flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                  focusable="false"
                  height={20}
                  width={20}
                  style={{ fill: "#9CA3AF" }}
                >
                  <path d="M512 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l128 0c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8l160 0c35.3 0 64 28.7 64 64l0 256zM232 376c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64 64 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-64 0 0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 64-64 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l64 0 0 64z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  <details className="dropdown">
                    <summary className="btn m-1">Add Data</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                      <Link to={`visiting-area`}>
                        <li
                          className={`hover:bg-blue-200 mb-2 p-1 rounded-md  ${
                            location.pathname === "/admin/visiting-area"
                              ? "border border-blue-500"
                              : ""
                          }`}
                        >
                          <p>Visiting Area</p>
                        </li>
                      </Link>
                      <Link to="public-relation-officer">
                        <li
                          className={`hover:bg-blue-200 mb-2 p-1 rounded-md ${
                            location.pathname ===
                            "/admin/public-relation-officer"
                              ? "border border-blue-500"
                              : ""
                          }`}
                        >
                          <p>Public Relation Officer</p>
                        </li>
                      </Link>
                      <Link to={`admission`}>
                        <li
                          className={`hover:bg-blue-200 mb-2 p-1 rounded-md ${
                            location.pathname === "/admin/admission"
                              ? "border border-blue-500"
                              : ""
                          }`}
                        >
                          <p>Admission Information</p>
                        </li>
                      </Link>
                      <Link to={`admission-camp-info`}>
                        <li
                          className={`hover:bg-blue-200 mb-2 p-1 rounded-md ${
                            location.pathname === "/admin/admission-camp-info"
                              ? "border border-blue-500"
                              : ""
                          }`}
                        >
                          <p>Admission Camp Info</p>
                        </li>
                      </Link>
                      <Link to={`representative-teacher`}>
                        <li
                          className={`hover:bg-blue-200 mb-2 p-1 rounded-md ${
                            location.pathname ===
                            "/admin/representative-teacher"
                              ? "border border-blue-500"
                              : ""
                          }`}
                        >
                          <p>Representative Teacher's</p>
                        </li>
                      </Link>
                    </ul>
                  </details>
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                  focusable="false"
                  height={20}
                  width={20}
                  style={{ fill: "#9CA3AF" }}
                >
                  <path
                    d="
                  M64 256l0-96 160 0 0 96L64 256zm0 64l160 0 0 96L64 416l0-96zm224 96l0-96 160 0 0 96-160 0zM448 256l-160 0 0-96 160 0 0 96zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z
                  "
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  <details className="dropdown">
                    <summary className="btn m-1">Get Data</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                      <Link to={`all-visiting`}>
                        <li
                          className={`hover:bg-blue-200 mb-2 p-1 rounded-md ${
                            location.pathname === "/admin/all-visiting"
                              ? "border border-blue-500"
                              : ""
                          }`}
                        >
                          <p>All Visiting`s</p>
                        </li>
                      </Link>
                      <Link to={`all-public-relation-officer`}>
                        <li
                          className={`hover:bg-blue-200 mb-2 p-1 rounded-md ${
                            location.pathname ===
                            "/admin/all-public-relation-officer"
                              ? "border border-blue-500"
                              : ""
                          }`}
                        >
                          <p>Public Relation Officer`s</p>
                        </li>
                      </Link>
                      <Link to={`all-admission`}>
                        <li
                          className={`hover:bg-blue-200 mb-2 p-1 rounded-md ${
                            location.pathname === "/admin/all-admission"
                              ? "border border-blue-500"
                              : ""
                          }`}
                        >
                          <p>Admission Information</p>
                        </li>
                      </Link>
                      <Link to={`all-admission-camp`}>
                        <li
                          className={`hover:bg-blue-200 mb-2 p-1 rounded-md ${
                            location.pathname === "/admin/all-admission-camp"
                              ? "border border-blue-500"
                              : ""
                          }`}
                        >
                          <p>Admission camp Info</p>
                        </li>
                      </Link>
                      <Link to={`all-representative-teacher`}>
                        <li
                          className={`hover:bg-blue-200 mb-2 p-1 rounded-md ${
                            location.pathname ===
                            "/admin/all-representative-teacher"
                              ? "border border-blue-500"
                              : ""
                          }`}
                        >
                          <p>Representative Teacher`s</p>
                        </li>
                      </Link>
                    </ul>
                  </details>
                </span>
              </div>
            </li>
            <li>
              <Link to={`login-another`}>
                <button
                  className={`flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    location.pathname === "/admin/login-another"
                      ? "border border-blue-500"
                      : ""
                  }`}
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                    />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Login Another
                  </span>
                </button>
              </Link>
            </li>
            <li>
              <Link to={`create-admin`}>
                <button
                  className={`flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    location.pathname === "/admin/create-admin"
                      ? "border border-blue-500"
                      : ""
                  }`}
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Create Admin Or User
                  </span>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div>
        <div className="pt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;

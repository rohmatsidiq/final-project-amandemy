import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Nav() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="bg-white text-sky-500 shadow-md fixed top-0 w-screen z-10">
      <div className="max-w-[1200px] mx-auto p-5 flex justify-between">
        <Link to={"/"}>
          <h1 className="text-2xl font-bold">My Shop</h1>
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            className="hover:scale-x-105 duration-100 hover:text-sky-600"
            to={"/"}
          >
            Home
          </Link>
          <Link
            className="hover:scale-x-105 duration-100 hover:text-sky-600"
            to={"/products"}
          >
            Products
          </Link>
          <Link
            className="hover:scale-x-105 duration-100 hover:text-sky-600"
            to={"/table"}
          >
            Table
          </Link>
          {token ? (
            <button
              onClick={handleLogout}
              className="hover:scale-x-105 duration-100 hover:text-sky-600 border border-sky-500 px-3 py-2 rounded-full"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to={"/login"}
                className="hover:scale-x-105 duration-100 hover:text-sky-600 border border-sky-500 px-3 py-2 rounded-full"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="hover:scale-x-105 duration-100 text-white px-3 py-2 rounded-full bg-sky-500"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;

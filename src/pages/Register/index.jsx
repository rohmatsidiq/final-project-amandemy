import { React, useState } from "react";
import { Nav } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsCheck2Circle } from "react-icons/bs";

export default function Register() {
  const [alertPopup, setAlertPopup] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({});
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleRegister = (e) => {
    if (e.target.name == "name") {
      setData({ ...data, name: e.target.value });
      setErrorMessage({ ...errorMessage, name: "" });
    } else if (e.target.name == "username") {
      setData({ ...data, username: e.target.value });
      setErrorMessage({ ...errorMessage, username: "" });
    } else if (e.target.name == "email") {
      setData({ ...data, email: e.target.value });
      setErrorMessage({ ...errorMessage, email: "" });
    } else if (e.target.name == "password") {
      setData({ ...data, password: e.target.value });
      setErrorMessage({ ...errorMessage, password: "" });
    } else if (e.target.name == "password_confirmation") {
      setData({ ...data, password_confirmation: e.target.value });
      setErrorMessage({ ...errorMessage, password_confirmation: "" });
    }
  };

  const buttonRegister = async () => {
    try {
      await axios.post("https://api-project.amandemy.co.id/api/register", data);
      setAlertPopup(true);
    } catch (error) {
      setErrorMessage(error.response.data.data.errors);
    }
  };

  if (alertPopup) {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }

  return (
    <div>
      {alertPopup && (
        <div className="absolute top-0 z-50 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white p-9 px-10  rounded-2xl ">
            <div className="mb-4">
              <BsCheck2Circle className="text-5xl mx-auto" />
            </div>
            <h1 className="text-2xl">Register Berhasil</h1>
          </div>
        </div>
      )}
      <Nav />
      <div className="mt-20 max-w-[1200px] mx-auto p-3 flex">
        <div className="flex-1 w-full hidden sm:flex overflow-hidden rounded-tl-2xl rounded-bl-2xl">
          <img
            className="w-full object-cover"
            src="https://cdn.pixabay.com/photo/2014/03/08/22/32/escalator-283448__340.jpg"
            alt=""
          />
        </div>
        <div className="max-w-3xl p-4 mx-auto bg-white rounded-tr-2xl rounded-br-2xl">
          <h1 className="text-2xl text-center font-bold">Register</h1>
          <div className="mt-3 flex flex-col gap-3">
            <input
              onChange={handleRegister}
              className="border rounded-full px-3 py-2 focus:outline-none focus:border-sky-200 focus:shadow-md focus:shadow-sky-200"
              placeholder="Nama"
              type="text"
              name="name"
            />
            {errorMessage.name !== "" && (
              <small className="mt-0 text-red-500">{errorMessage.name}</small>
            )}
            <input
              onChange={handleRegister}
              className="border rounded-full px-3 py-2 focus:outline-none focus:border-sky-200 focus:shadow-md focus:shadow-sky-200"
              placeholder="Username"
              type="text"
              name="username"
            />
            {errorMessage.username !== "" && (
              <small className="mt-0 text-red-500">
                {errorMessage.username}
              </small>
            )}
            <input
              onChange={handleRegister}
              className="border rounded-full px-3 py-2 focus:outline-none focus:border-sky-200 focus:shadow-md focus:shadow-sky-200"
              placeholder="Email"
              type="email"
              name="email"
            />
            {errorMessage.email !== "" && (
              <small className="mt-0 text-red-500">{errorMessage.email}</small>
            )}
            <input
              onChange={handleRegister}
              className="border rounded-full px-3 py-2 focus:outline-none focus:border-sky-200 focus:shadow-md focus:shadow-sky-200"
              placeholder="Password"
              type="password"
              name="password"
            />
            {errorMessage.password !== "" && (
              <small className="mt-0 text-red-500">
                {errorMessage.password}
              </small>
            )}
            <input
              onChange={handleRegister}
              className="border rounded-full px-3 py-2 focus:outline-none focus:border-sky-200 focus:shadow-md focus:shadow-sky-200"
              placeholder="Konfirmasi Password"
              type="password"
              name="password_confirmation"
            />
            {data.password !== data.password_confirmation && (
              <small className="mt-0 text-red-500">Password harus sama</small>
            )}
            <button
              onClick={buttonRegister}
              className="bg-sky-500 text-white px-3 py-2 rounded-full hover:bg-sky-600 hover:scale-105 hover:shadow-lg hover:shadow-sky-200"
            >
              Register
            </button>
            <small>
              Sudah punya akun?{" "}
              <Link to={"/login"} className="underline text-sky-500">
                Login disini
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

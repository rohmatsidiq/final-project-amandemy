import { React, useState } from "react";
import { Nav } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsCheck2Circle } from "react-icons/bs";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [alertPopup, setAlertPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [info, setInfo] = useState("");
  const navigate = useNavigate();
  const handleChangeLogin = (e) => {
    if (e.target.name == "email") {
      setData({ ...data, email: e.target.value });
      setErrorMessage({ ...errorMessage, email: "" });
      setInfo("");
    } else if (e.target.name == "password") {
      setData({ ...data, password: e.target.value });
      setErrorMessage({ ...errorMessage, password: "" });
      setInfo("");
    }
  };

  const buttonLogin = async () => {
    try {
      const response = await axios.post(
        "https://api-project.amandemy.co.id/api/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      localStorage.setItem("token", response.data.data.token);
      setAlertPopup(true);
    } catch (error) {
      if (error.response.data.data.errors) {
        setErrorMessage(error.response.data.data.errors);
      } else {
        setErrorMessage([]);
        setInfo(error.response.data.info);
      }
    }
  };

  if (alertPopup) {
    setTimeout(() => {
      navigate("/table");
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
            <h1 className="text-2xl">Login Berhasil</h1>
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
          <h1 className="text-2xl text-center font-bold">Login</h1>
          <small className="mt-0 text-red-500">{info}</small>
          <div className="mt-3 flex flex-col gap-3">
            <input
              onChange={handleChangeLogin}
              className="border rounded-full px-3 py-2 focus:outline-none focus:border-sky-200 focus:shadow-md focus:shadow-sky-200"
              placeholder="Email"
              type="email"
              name="email"
            />
            {errorMessage.email !== {} && (
              <small className="mt-0 text-red-500">{errorMessage.email}</small>
            )}
            <input
              onChange={handleChangeLogin}
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
            <button
              onClick={buttonLogin}
              className="bg-sky-500 text-white px-3 py-2 rounded-full hover:bg-sky-600 hover:scale-105 hover:shadow-lg hover:shadow-sky-200"
            >
              Login
            </button>
            <small>
              Belum punya akun?{" "}
              <Link to={"/register"} className="underline text-sky-500">
                Register disini
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

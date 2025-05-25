import React, { useState } from "react";
import { loginUser } from "../api/user.api.js";
import { useDispatch, useSelector } from "react-redux";
import {login} from '../store/slice/authSlice.js'
import { useNavigate } from "@tanstack/react-router";

const LoginForm = ({ setLogin }) => {
  const [email, setEmail] = useState("hello@gmail.com");
  const [password, setPassword] = useState("swrsaini");
  const [loading, setloading] = useState(false);
  const [message, setMessage] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const data = await loginUser(email, password);
      dispatch(login(data.user));
      setMessage(data.message);
      navigate({ to: "/dashboard" });
        
      
    } catch (e) {
      setMessage("invalid credentials");
    }
    setloading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow"
      >
        <h2 className="text-gray-700 m-4 font-bold text-2xl text-center">
          LOGIN
        </h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-gray-700">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Signing in" : "Sign in"}
        </button>
        {message && <div>{message}</div>}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => setLogin(false)}
              className="all:unset cursor-pointer text-blue-500 hover:text-blue-600 underline font-bold"
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;

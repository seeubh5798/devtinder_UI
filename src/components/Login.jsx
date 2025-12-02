import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "./../utils/constant";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [err, seterr] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true, // <--- required
        }
      );
      console.log(res);
      dispatch(addUser(res?.data?.user));
      seterr("");
      navigate("/feed");
    } catch (e) {
      console.log(e);
      seterr(e?.response?.data?.message);
    }
  };
  const routeToSignup = () => {
    dispatch(addUser(null));
    navigate("/signup");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body space-y-4">
          <h2 className="card-title text-center text-2xl font-semibold">
            Log In 😌
          </h2>

          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          {err && (
            <div className="alert alert-error py-2">
              <span>{err}</span>
            </div>
          )}

          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary w-full" onClick={handleLogin}>
              Log In
            </button>
          </div>

          <p className="text-center text-sm">
            Don't have an account?
            <a className="link link-primary ml-1" onClick={routeToSignup}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

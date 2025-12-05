import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const SignupPage = () => {
  const navigate = useNavigate();

  // --------------------------
  // FORM STATE
  // --------------------------
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    photourl: "https://toppng.com//public/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png",
    bio: "",
    skills: ""
  });

  // updates form dynamically
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submit handler
  const handleSignup = async () => {
    try{
      const res = await axios.post(BASE_URL+"/signup", {...form}, {withCredentials : true});
      // console.log(res);
      gotoSignin()

    }
    catch(e){
      console.log(e);
    }
    console.log("Signup Form Data → ", form);

    // later you will do:
    // axios.post(BASE_URL + "/signup", form)
  };

  const gotoSignin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account 😀
        </h1>

        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="John"
              value={form.firstName}
              onChange={handleChange}
              className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              value={form.lastName}
              onChange={handleChange}
              className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col mt-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="example@mail.com"
            value={form.email}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col mt-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Age */}
        <div className="flex flex-col mt-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Age (18+)
          </label>
          <input
            type="number"
            name="age"
            min="18"
            placeholder="18"
            value={form.age}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col mt-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select gender</option>
            <option>male</option>
            <option>female</option>
          </select>
        </div>

        {/* Photo URL */}
        <div className="flex flex-col mt-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Photo URL
          </label>
          <input
            type="text"
            name="photourl"
            placeholder="https://profile-photo.com"
            value={form.photourl}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col mt-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            placeholder="Write something about yourself..."
            value={form.bio}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Skills */}
        <div className="flex flex-col mt-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Skills (comma separated)
          </label>
          <input
            type="text"
            name="skills"
            placeholder="JavaScript, Node, React"
            value={form.skills}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-medium cursor-pointer hover:underline"
            onClick={gotoSignin}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

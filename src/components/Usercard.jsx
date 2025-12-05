import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constant";

const Usercard = ({
  photourl,
  firstName,
  lastName,
  age,
  gender,
  setactiveidx,
  show,
  id
}) => {
  const [animation, setAnimation] = useState("");


  async function sendRequest(status){

    const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+id, {}, {withCredentials : true});
    // console.log(res);
  }
  // LEFT swipe effect
  const handleLeft = async () => {
    setAnimation("swipe-left");
    const response = await sendRequest("ignored");
    // console.log(response);
    setTimeout(() => {
      setactiveidx();
      setAnimation(""); // reset animation for next card
    }, 300);
  };

  // RIGHT swipe effect
  const handleRight = async () => {
    setAnimation("swipe-right")
    const response = await sendRequest("interested");
    // console.log(response)
    setTimeout(() => {
      
      setactiveidx();
      setAnimation(""); // reset animation
    }, 300);
  };

  if (!show) return null;

  return (
    <div
      className={`
        flex items-center justify-center w-full min-h-screen p-4
        transition-all duration-300 ease-out
        ${animation}
      `}
    >
      <div className="relative w-80 bg-base-100 shadow-xl rounded-3xl overflow-hidden">

        {/* Profile Image */}
        <figure className="h-96 w-full">
          <img
            className="h-full w-full object-cover"
            src={
              photourl ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt="Profile"
          />
        </figure>

        {/* Gradient Overlay */}
        <div className="
          absolute bottom-20 left-0 w-full h-28
          bg-gradient-to-t from-black/80 to-transparent
          pointer-events-none
        "></div>

        {/* User Details */}
        <div className="absolute bottom-24 left-4 text-white z-10">
          <h2 className="text-3xl font-bold drop-shadow-md">
            {firstName} {lastName},{" "}
            <span className="font-light">{age}</span>
          </h2>
          <p className="text-sm capitalize opacity-90 drop-shadow-md">{gender}</p>
        </div>

        {/* Swipe Buttons */}
        <div className="absolute bottom-4 w-full flex justify-center gap-6 z-20">
          {/* LEFT SWIPE (NOPE) */}
          <button
            className="
              w-14 h-14 rounded-full bg-white text-red-500 text-3xl shadow-xl 
              border border-gray-200 hover:scale-110 transition
            "
            onClick={handleLeft}
          >
            ✕
          </button>

          {/* RIGHT SWIPE (LIKE) */}
          <button
            className="
              w-14 h-14 rounded-full bg-white text-green-500 text-3xl shadow-xl 
              border border-gray-200 hover:scale-110 transition
            "
            onClick={handleRight}
          >
            ❤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Usercard;

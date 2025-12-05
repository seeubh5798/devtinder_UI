import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const [connected, setconnected] = useState([]);
  const navigate = useNavigate();

  async function fetchconnections() {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setconnected(res?.data?.resData || []);
    } catch (e) {
    //   console.log(e);
    }
  }

  function openchat(id, firstName, lastName){
    navigate(`/chat/${id}`, {
        state : {
            firstName : firstName,
            lastName : lastName
        }
    })
  }
  useEffect(() => {
    fetchconnections();
  }, []);

  if (connected.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        No connections found 😶
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Your Connections ❤️
      </h1>

      {/* Tinder/Bumble style grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {connected.map((user, index) => (
          <div
            key={index}
            className="
              bg-white shadow-lg rounded-3xl overflow-hidden 
              transition transform hover:-translate-y-2 hover:shadow-2xl
            "
          >
            {/* Profile Image */}
            <img
              src={
                user.photourl ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt="profile"
              className="h-60 w-full object-cover"
            />

            {/* Details */}
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>

              <p className="text-gray-600 mt-1">
                {user.age} • {user.gender}
              </p>

              {/* Optional Bio */}
              {user.bio && (
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {user.bio}
                </p>
              )}

              {/* ⭐ Chat Button */}
              <button
                onClick={() => openchat(user._id, user.firstName, user.lastName)}
                className="
                  mt-4 w-full bg-gradient-to-r from-pink-500 to-red-500 
                  text-white font-semibold py-2 rounded-xl shadow-md
                  hover:opacity-90 transition duration-200 transform hover:scale-105
                "
              >
                💬 Chat Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;

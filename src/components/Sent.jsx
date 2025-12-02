import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constant'

const Sent = () => {
  const [sent, setsent] = useState([]);

  async function getSentRequests() {
    try {
      const res = await axios.get(BASE_URL + "/user/sent", {
        withCredentials: true,
      });
      setsent(res?.data?.data || []);
    } catch (e) {
      console.log(e);
    }
  }

  const withdrawRequest = async (id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/user/withdraw/" + id,
        {},
        { withCredentials: true }
      );
      console.log(res);

      // remove from UI
      setsent((prev) => prev.filter((req) => req._id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSentRequests();
  }, []);


  // ------------------ EMPTY STATE UI ------------------
  if (sent.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
          alt="no profiles"
          className="w-36 h-36 opacity-80 mb-6"
        />

        <h1 className="text-2xl font-semibold text-gray-700 mb-3">
          No requests sent 😕
        </h1>

        <p className="text-gray-500 text-center max-w-xs mb-6">
          Try again later. Send new requests to recently joined users!
        </p>
      </div>
    );
  }

  // ------------------ CARD LIST UI ------------------
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Sent Requests 🚀</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sent.map((req) => (
          <div
            key={req._id}
            className="bg-white shadow-lg rounded-3xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            {/* User image */}
            <img
              src={
                req.toUserId.photourl ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt="profile"
              className="h-60 w-full object-cover"
            />

            {/* Details */}
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">
                {req.toUserId.firstName} {req.toUserId.lastName}
              </h2>

              <p className="text-gray-600 mt-1 capitalize">
                {req.toUserId.gender}, {req.toUserId.age}
              </p>

              {req.toUserId.bio && (
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {req.toUserId.bio}
                </p>
              )}
            </div>

            {/* Withdraw Button */}
            <div className="px-4 pb-4">
              <button
                className="
                  w-full bg-red-500 hover:bg-red-600 text-white 
                  py-2 rounded-xl font-semibold transition
                "
                onClick={() => withdrawRequest(req._id)}
              >
                Withdraw Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sent;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import Usercard from "./Usercard";

const Feed = () => {
  const feed = useSelector((store) => store?.feed);
  const dispath = useDispatch();
  const [activeidx, setactiveidx] = useState(0);

  const getFeed = async () => {
    // if (feed) return;
    const res = await axios.get(BASE_URL + "/user/feed", {
      withCredentials: true,
    });
    console.log(res);
    dispath(addFeed(res.data));
  };

  useEffect(() => {
    getFeed();
  },[]);

  if (!feed || activeidx >= feed.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
          alt="no profiles"
          className="w-36 h-36 opacity-80 mb-6"
        />
  
        <h1 className="text-2xl font-semibold text-gray-700 mb-3">
          No more profiles right now 😕
        </h1>
  
        <p className="text-gray-500 text-center max-w-xs mb-6">
          You’ve seen all available connections.  
          Try again later when new users join!
        </p>
  
        {/* <button
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button> */}
      </div>
    );
  }
  
  return (
    <>
      {feed && 
        feed.map((f, i) => {
          return (
           <Usercard photourl={f.photourl} firstName= {f.firstName} lastName = {f.lastName} age ={f.age} gender={f.gender} setactiveidx={()=> setactiveidx(idx=> idx+1)} show={i==activeidx} id={f._id}/>
          );
        })}
    </>
  );
};

export default Feed;

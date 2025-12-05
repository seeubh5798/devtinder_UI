import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constant';

const Requests = () => {
  const [requests, setrequests] = useState([]);
  const [ accepted, setaccepted] = useState(false);
  const [ rejected, setrejected] = useState(false);

  async function fetchRequests() {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      setrequests(res?.data?.connections || []);
    } catch (e) {
      console.log(e);
    }
  }

//   console.log("accepted", accepted)
//   console.log("rejected", rejected)

  async function handlerequest(reqType, id){
        const res = await axios.post(BASE_URL+"/request/review/"+reqType+"/"+id,{}, { withCredentials : true});
        console.log(res);
        if(reqType=="accepted"){
            setaccepted(true);
        }
        else{
            setrejected(true)
        }
        setrequests((request)=>{
            return request.filter((req)=> req._id != id);
        })
  }

  useEffect(() => {
    fetchRequests();
    let timer ;
    if(accepted == true){
        timer = setTimeout(() => {
            setaccepted(false);
        }, 2000);
    }
    if(rejected ==true){
        timer = setTimeout(() => {
            setrejected(false);
        }, 2000);
    }

    return ()=> clearTimeout(timer);
  }, [accepted, rejected]);



    if( accepted ==true){
        return <div className="alert alert-success">
        <span> Connected succesfully.</span>
      </div>
    }
    if( rejected ==true){
        return <div className="alert alert-error">
        <span> Rejected succesfully.</span>
      </div>
    }

    if (requests.length === 0)
        return (
          <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
            No requests found 😶
          </div>
        );

   return  (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Requests ❤️</h1>

      {/* Tinder/Bumble card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {requests.map((user, index) => (
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
                user.fromUserId.photourl ||
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
              }
              alt="profile"
              className="h-60 w-full object-cover"
            />

            {/* Details */}
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">
                {user.fromUserId.firstName} {user.fromUserId.lastName}
              </h2>

              <p className="text-gray-600 mt-1 capitalize">
                {user.fromUserId.gender}
              </p>

              {/* Optional Bio */}
              {user.fromUserId.bio && (
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {user.fromUserId.bio}
                </p>
              )}
            </div>

            {/* Accept / Reject Buttons */}
            <div className="flex justify-between gap-3 px-4 pb-4">
              <button
                className="
                  flex-1 bg-green-500 hover:bg-green-600 text-white 
                  py-2 rounded-xl font-semibold transition
                "
                onClick={() => handlerequest("accepted", user._id)} // <-- You add logic
              >
                Accept
              </button>

              <button
                className="
                  flex-1 bg-red-500 hover:bg-red-600 text-white 
                  py-2 rounded-xl font-semibold transition
                "
                onClick={() => handlerequest("rejected", user._id)} // <-- You add logic
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Requests;

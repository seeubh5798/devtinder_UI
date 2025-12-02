import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "./Editprofile";

const Profile = () => {
  // const navigate = useNavigate();
  const user = useSelector((store)=> store?.user)
  const [edit, setedit] = useState(false);

  const gotoEdit = () => {
    setedit(true);  // your route
  };
 
   { return !edit?  (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
        <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8">
  
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <img
              src={
                user?.photourl ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-md border"
            />
          </div>
  
          {/* Name + Age */}
          <h2 className="text-3xl font-bold text-center mb-1">
            {user?.firstName} {user?.lastName}
          </h2>
  
          <p className="text-center text-gray-600 text-lg mb-4">
            Age: {user?.age}
          </p>
  
          {/* Details */}
          <div className="space-y-4 text-gray-700">
  
            {/* Email */}
            <div>
              <p className="text-sm font-semibold">Email</p>
              <p className="bg-gray-50 p-2 rounded border mt-1">{user?.email}</p>
            </div>
  
            {/* Gender */}
            <div>
              <p className="text-sm font-semibold">Gender</p>
              <p className="bg-gray-50 p-2 rounded border mt-1 capitalize">
                {user?.gender}
              </p>
            </div>
  
            {/* Bio */}
            <div>
              <p className="text-sm font-semibold">Bio</p>
              <p className="bg-gray-50 p-2 rounded border mt-1">
                {user?.bio}
              </p>
            </div>
  
            {/* Skills */}
            <div>
              <p className="text-sm font-semibold">Skills</p>
              <p className="bg-gray-50 p-2 rounded border mt-1">
                {user?.skills?.length
                  ? user.skills.join(", ")
                  : "No skills added"}
              </p>
            </div>
          </div>
  
          {/* Edit Button */}
          <button
            onClick={gotoEdit}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
  
        </div>
      </div>
    )
    :  <EditProfile user={user} setedit={setedit}></EditProfile> 
  
  }
  
};

export default Profile;

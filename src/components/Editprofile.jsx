import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user, setedit }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(user?.age || 18);
  const [gender, setGender] = useState(user?.gender || "");
  const [photourl, setPhotourl] = useState(user?.photourl || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const [showsuccess, setshowsuccess] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (showsuccess) {
      const timeoutId = setTimeout(() => {
        setedit(false);
      }, 2000);

      return () => clearTimeout(timeoutId); // cleanup
    }
  }, [showsuccess]);

  const handleUpdate = async () => {
    // you will add functionality later
    try {
      const updates = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          password,
          age,
          gender,
          photourl,
          bio,
          skills,
        },
        { withCredentials: true }
      );
      // console.log(updates);
      dispatch(addUser(updates?.data?.message));
      setshowsuccess(true);
    } catch (e) {
      console.log(e);
    }
  };

  return !showsuccess ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Edit Profile</h1>
        {/* Email (disabled) */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Email (cannot be changed)
          </label>
          <input
            type="email"
            className="px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
            value={user?.email}
            disabled
          />
        </div>

        {/* First + Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            placeholder="Leave empty to keep same password"
            className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Age */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            min="18"
            className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>

        {/* Photo URL */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Photo URL
          </label>
          <input
            type="text"
            placeholder="https://your-photo-link.com"
            className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            value={photourl}
            onChange={(e) => setPhotourl(e.target.value)}
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        {/* Skills */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Skills (comma separated)
          </label>
          <input
            type="text"
            placeholder="JavaScript, Node, React"
            className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleUpdate}
          className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  ) : (
    <div className="toast toast-top toast-center">
      <div className="alert alert-success">
        <span>Your Profile has been saved succesfully.</span>
      </div>
    </div>
  );
};

export default EditProfile;

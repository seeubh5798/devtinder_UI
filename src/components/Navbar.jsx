import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { removeFeed } from "../utils/feedSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   console.log(user);

  async function logout(){
    try{
        const res = await axios.get(BASE_URL+"/logout", { withCredentials : true });
        dispatch(removeUser());
        dispatch(removeFeed())
        // console.log(res);
       

    }
    catch(e){
        console.log(e);
    }
    finally{
        navigate("/login")
    }
        

  }

  function gotoprofile(){
    navigate("/profile");
  }
  function handleLogo(){
    user ? navigate("/feed") : navigate("/login")
  }
  return (
    <>
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1" onClick={handleLogo}>
          <a className="btn btn-ghost text-xl">👩🏻‍❤️‍👨🏻 DevTinder</a>
        </div>
        {user && (
          <div className="flex gap-2 items-center">
            <div className="dropdown dropdown-end mx-4">
              <div className="flex items-center gap-3">
                {/* Name */}
                <h2 className="text-lg font-semibold text-gray-800 whitespace-nowrap">
                  Hello,{" "}
                  <span className="font-bold text-primary">
                    {user.firstName}
                  </span>
                </h2>

                {/* Avatar */}
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User avatar"
                      src={
                        user.photourl ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Dropdown Content */}
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                <li onClick={gotoprofile}>
                  <a className="justify-between">
                    Profile <span className="badge">New</span>
                  </a>
                </li>
                <li>
                 <Link to={"/connections"}>Connections</Link>
                </li>
                <li>
                 <Link to={"/requests"}>Requests</Link>
                </li>
                <li>
                 <Link to={"/sent"}>Sent Requests</Link>
                </li>
                <li onClick={logout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

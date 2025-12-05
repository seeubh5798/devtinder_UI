import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Chat = () => {
  const { targetUserId } = useParams();
  const { state } = useLocation();
  const loggedinUser = useSelector((store) => store.user);
  const [messages, setmessages] = useState([]);
  const [err, seterr] = useState("");

  const [newmsg, setnewmsg] = useState("");

  function sendmsg() {
    if (!newmsg) {
      seterr("Please type something to send");
      return;
    }
    const socket = createSocketConnection();

    socket.emit("sendmessage", {
      name: loggedinUser.firstName,
      userId: loggedinUser?._id,
      targetUserId,
      text: newmsg,
    });
    setnewmsg("");
    seterr("");
    // setmessages((msgs)=>[...msgs,{fromMe: true, text: newmsg}])
  }

  function handleTyping(){
    // const socket = createSocketConnection();

    // socket.emit("u", {user : loggedinUser.firstName})
  }
  async function fetchPrevChats(){
    const res = await axios.get(BASE_URL+"/chat/"+targetUserId, {withCredentials : true});
    setmessages(
      res?.data?.message?.message.map((msg)=> {
        return { text : msg.text , fromMe : msg?.senderId?._id === loggedinUser?._id ? true : false}
    })
  )
  }
  useEffect(() => {

    fetchPrevChats();
    if (!loggedinUser) return;
    const socket = createSocketConnection();

    socket.emit("joinchat", {
      name: loggedinUser.firstName,
      userId: loggedinUser?._id,
      targetUserId,
    });

    socket.on("msgreceived", ({ name, text, userId }) => {
      setmessages((msgs) => [
        ...msgs,
        {
          fromMe: userId === loggedinUser._id ? true : false,
          text: text,
          author: name,
        },
      ]);
    });

    return () => socket.disconnect();
  }, [loggedinUser, targetUserId]);
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-red-500 p-4 text-white shadow-md flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white/30 flex items-center justify-center text-xl">
          💬
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-semibold">
            Chat with {state.firstName +" "+ state.lastName || "Connection"}
          </h1>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-28">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col max-w-sm ${
              msg.fromMe ? "ml-auto items-end" : "mr-auto items-start"
            }`}
          >
            {/* AUTHOR NAME */}
            <span
              className={`text-xs mb-1 font-semibold ${
                msg.fromMe ? "text-pink-600" : "text-gray-500"
              }`}
            >
              {msg.author}
            </span>

            {/* MESSAGE BUBBLE */}
            <div
              className={`p-3 rounded-2xl text-sm shadow-md ${
                msg.fromMe
                  ? "bg-pink-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 p-4 bg-white shadow-inner border-t border-gray-200 z-10">
        {err && (
          <div className="text-red-500 text-sm mb-2 font-medium text-center animate-pulse">
            {err}
          </div>
        )}
        <div className="flex items-center gap-3">
          {/* REAL INPUT BOX */}
          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 border border-gray-200">
            <span className="text-gray-400 mr-2">💬</span>

            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
              value={newmsg}
              onChange={(e) => {
                setnewmsg(e.target.value);
                handleTyping();
              
              }}
            />
          </div>

          <button
            type="button"
            className="bg-pink-600 hover:bg-pink-700 transition text-white px-5 py-2 rounded-full font-semibold shadow-lg text-sm"
            onClick={sendmsg}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

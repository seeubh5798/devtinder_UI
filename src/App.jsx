import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import store from "./utils/store";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Sent from "./components/Sent";
import Chat from "./components/Chat";

function App() {
  return (
    <>
    <BrowserRouter basename="/">
    <Routes>
    <Route path="/" element={ <Provider store={store}><Body /></Provider>} >
    {/* creating children routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/connections" element={<Connections />} />
      <Route path="/requests" element={<Requests />} />
      <Route path="/sent" element={<Sent />} />
      <Route path="/chat/:targetUserId" element={<Chat />} />
    
    </Route>
    </Routes>
    </BrowserRouter>
      {/* <Navbar ></Navbar> */}
    </>
  );
}

export default App;

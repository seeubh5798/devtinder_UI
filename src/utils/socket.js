import { io } from "socket.io-client";
import { BASE_URL } from "./constant";


export function createSocketConnection(){
   
    if(window.location.hostname.includes("localhost")){
        return io(BASE_URL)
    }
    else{
        return io("/", { path : "/api/socket.io"})
    }
}
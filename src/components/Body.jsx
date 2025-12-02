import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { BASE_URL } from '../utils/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store)=> store.user);

    async function fetchUser(){

        try{
            const res = await axios.get(BASE_URL+"/profile/view", { withCredentials : true});
            if(res?.data?.error){
                // 
                navigate("/login");

            }
            else{
                dispatch(addUser(res?.data?.user));
                navigate("/feed")
            }
            
        }
        catch(e){
            navigate("/login");
            console.log(e);
        }
    }

    useEffect(()=>{
        console.log("body component useeffect running")
        if(!user){
            fetchUser();
        }
        
    }, [])
    
  return (
    <>
    <Navbar />
    <Outlet ></Outlet>
    <Footer />
    </>
    
  )
}

export default Body
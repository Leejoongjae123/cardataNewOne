'use client'
import React,{useEffect,useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastBox({searchParams}) {
  
  const handleParams=()=>{
    
    if (searchParams.error) {
      toast.error(searchParams.error);
    } else if (searchParams.result === "unabletosignin") {
      console.log('111111');
      toast.error("Unable to Sign In");
    }
  }

  console.log('searchParams:',searchParams)
  useEffect(()=>{
    handleParams()
  },[])
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
}

export default ToastBox;

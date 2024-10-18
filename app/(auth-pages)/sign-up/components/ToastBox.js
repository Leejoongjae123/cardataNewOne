'use client'
import React,{useEffect,useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastBox({searchParams}) {
  
  const handleParams = () => {
    if (searchParams.error) {
      toast.error(searchParams.error);
    }
  };

  useEffect(() => {
    handleParams();
  }, [searchParams]);
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

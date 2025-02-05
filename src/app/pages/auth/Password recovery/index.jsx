import React, { useState, useContext, useEffect } from "react";
import Input from "@ui/components/input";
import { Link , useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@app/helpers/vb";
import { AuthenticationContext } from "@app/context/InputContext";
import { ToastContainer, toast, Bounce } from "react-toastify";

export default function Recovery() {
  const navigate = useNavigate()
  let setformType = "r-password"
  const formType = setformType;

  const { Rusername, setRusername } = useContext(AuthenticationContext);
  useEffect(()=>{
   if(localStorage.getItem("Login") !== null ){
     navigate("/")
   }
  },[localStorage.getItem("Login")])
  const Rpasswordf = async (e) => {
    e.preventDefault();
    if(Rusername !== ""){
   navigate("/auth/verify")
   localStorage.setItem("email" , Rusername)
   localStorage.setItem("Verified" , true)
}else{
      toast.error('لطفا اطلاعات خواسته شده را وارد کنید', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
};

    return (
    <div className="wrapper">
      <ToastContainer />
      <div className="model">
        <img src="/assets/images/R-password.png" alt="model login" />
      </div>

      <form onSubmit={Rpasswordf}>
        <h3>BLACK DARK</h3>
        <div className="details">
          <Input formType={formType} />
          <button type="submit">تایید ایمیل</button>
          <div className="row">
            <Link to="/auth/register">ثبت نام</Link>
            <Link to="/auth/login">ورود</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
  //   const respans = await axios.get(`${baseUrl}/register`);
  //   const user = respans.data.find(
  //     (user) =>
  //       user.username === loginUsername && user.password === loginPassword
  //   );
  //   if (user) {
  //     toast.success("در حال ورود 😍", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //       transition: Bounce,
  //       onClose : () => navigate("/auth/verify")
  //     });
  //     localStorage.setItem("Verified" , true )
  //     localStorage.setItem("Login" , true )
  
  //   }else{
  
  //     toast.error("کاربر یافت نشد 😢 ", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //       transition: Bounce,
  //     });
  //   }
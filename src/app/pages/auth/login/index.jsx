import React, { useState, useContext, useEffect } from "react";
import Input from "@ui/components/input";
import { Link , useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@app/helpers/vb";
import { AuthenticationContext } from "@app/context/InputContext";
import { ToastContainer, toast, Bounce } from "react-toastify";

export default function Login() {
  const navigate = useNavigate()
  const formType = "login";
  const { loginPassword, loginUsername } = useContext(AuthenticationContext);
  useEffect(()=>{
   if(localStorage.getItem("Login") !== null ){
     navigate("/")
   }
  },[localStorage.getItem("Login")])
  const loginData = async (e) => {
    e.preventDefault();
    if (loginPassword !== "" && loginUsername !== "") {
    try {
      const respans = await axios.get(`${baseUrl}/register`);
      const user = respans.data.find(
        (user) =>
          user.username === loginUsername && user.password === loginPassword
      );
      if (user) {
        toast.success("در حال ورود 😍", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          onClose : () => navigate("/auth/verify")
        });
        localStorage.setItem("Verified" , true )
        localStorage.setItem("Login" , true )
        localStorage.setItem("email" , user.email)
      }else{

        toast.error("کاربر یافت نشد 😢 ", {
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
    } catch (error) {}
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
  const { data: login } = useQuery({
    queryKey: ["login"],
    queryFn: loginData,
  });
  return (
    <div className="wrapper">
      <ToastContainer />
      <div className="model">
        <img src="/assets/images/login.png" alt="model login" />
      </div>

      <form onSubmit={loginData}>
        <h3>BLACK DARK</h3>
        <div className="details">
          <Input formType={formType} />
          <button type="submit" className="formBtns">ورود</button>
          <div className="row">
            <Link to="/auth/register" >ثبت نام</Link>
            <Link to="/auth/R-password">فراموشی رمز عبور</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
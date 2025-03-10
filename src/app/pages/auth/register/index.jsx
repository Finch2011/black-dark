import React , { useContext, useEffect } from "react";
import "../authentication.scss"
import { ToastContainer , toast , Bounce } from "react-toastify";
import { Link , useNavigate } from "react-router-dom";
import Input from "@app/ui/components/input";

import {AuthenticationContext} from '@app/context/InputContext';
import { baseUrl } from "@app/helpers/vb";
import axios from "axios";

import { useMutation } from "@tanstack/react-query";

export default function Register() {
  const {username , email , password , confirmPassword} = useContext(AuthenticationContext)
  const formType = "register"; 
  const navigate = useNavigate()
  useEffect(()=>{
     if(localStorage.getItem("Register") !== null ){
       navigate("/auth/login")
     }
    },[localStorage.getItem("Register")])
  const registerUser =  async (e) => {
    e.preventDefault();
    if(username !== "" && email !== "" && password !== "" ){
       if(password === confirmPassword && password.length >= 8){
        try {
          const response = await axios.post(`${baseUrl}/register` , {
            "username" : username,
            "email" : email,
            "password" : password,
            "admin" : false
          });
          toast.success('درحال ثبت نام 😃', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            onClose : () => navigate("/auth/login")
            });
            localStorage.setItem("Register", true);
        } catch (error) {
          console.error(error.message)
        }
    }else{
      toast.error(' رمز عبور با تکرار آن مطابقت ندارد یا کمتر از 8 حرف است', {
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
}

  const {mutate : register} = useMutation({
    mutationFn : registerUser,
  })

  return (
    <div className="wrapper">
      <ToastContainer/>
      <div className="model">
        <img src="/assets/images/register.png" alt="model sign up" />
      </div>
      <form onSubmit={register}>
        <h3> BLACK DARK </h3>
        <div className="details">
          <Input formType={formType}/>
          <button type="submit" className="formBtns">ثبت نام</button>
        </div>
        <Link to="/auth/login"> حساب کاربری دارید؟ ورود </Link>
      </form>
    </div>
  );
}
import React, { useContext } from "react";
import "../authentication.scss";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { InputContext } from "@app/context/InputContext";

import { Link } from "react-router-dom";
import Input from "@app/ui/components/input";

export default function Register() {
  const { value } = useContext(InputContext);

  const formInputs = [
    {
      id: 0,
      type: "text",
      placeholder: "نام کاربری",
    },

    {
      id: 1,
      type: "text",
      placeholder: "شماره موبایل",
    },

    {
      id: 2,
      type: "password",
      placeholder: "رمز عبور",
    },
    {
      id: 3,
      type: "password",
      placeholder: "تکرار رمز عبور",
    },
  ];

  const registerUser = async (event) => {
    event.preventDefault();

    try{
      const response = await axios.post('http://localhost:3001/rigester' , {
        id : Math.floor(Math.random()*10000000) ,
        username : value[0],
        phone_number : value[1],
        password : value[2],
      })
      console.log(response.data);
    }catch(error){
      console.log(error.message)
    }
  

  };

  const {mutation : register} = useMutation({
    mutationKey : ["register"],
    mutationFn: registerUser
  })

  return (
    <div className="wrapper">
      <div className="model">
        <img src="/assets/images/register.png" alt="model sign up" />
      </div>
      <form onSubmit={registerUser}>
        <h3> BLACK DARK </h3>
        <div className="details">
          {formInputs.map((detail) => (
            <Input
              id={detail.id}
              key={detail.id}
              type={detail.type}
              placeholder={detail.placeholder}
            />
          ))}
          <button type="submit">ثبت نام</button>
        </div>
        <Link to="/auth/login"> حساب کاربری دارید؟ ورود </Link>
      </form>
    </div>
  );
}
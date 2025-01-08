import React from "react";
import "../authentication.scss";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import { InputContext } from "@app/context/InputContext";
import Input from "@ui/components/input";

export default function Login() {
  const formInputs = [
    {
      id: 0,
      type: "text",
      placeholder: "نام کاربری",
    },
    {
      id: 1,
      type: "password",
      placeholder: "رمز عبور",
    },
  ];

  const LoginUser = async (event) => {
    event.preventDefault();

    try{
      const response = await axios.get('http://localhost:3001/rigester')
      console.log(response.data);
    }catch(error){
      console.log(error.message)
    }
  

  };

  const {query : register} = useQuery({
    queryKey : ["register"],
    queryFn: LoginUser
  })

  return (
    <div className="wrapper">
      <div className="model">
        <img src="/assets/images/login.png" alt="model login" />
      </div>

      <form onSubmit={LoginUser}>
        <h3>BLACK DARK</h3>

        <div className="details">
          {formInputs.map((input) => (
            <Input
              key={input.id}
              type={input.type}
              placeholder={input.placeholder}
            />
          ))}

          <button type="submit">ورود</button>

          <div className="row">
            <Link to="/auth/register">ثبت نام</Link>
            <Link to="/auth/forget-password">فراموشی رمز عبور</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
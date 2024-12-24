import React from "react";
import "../authentication.scss";

import { Link } from "react-router-dom";

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

  return (
    <div className="wrapper">
      <div className="model">
        <img src="/assets/images/login.png" alt="model login" />
      </div>

      <form>
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

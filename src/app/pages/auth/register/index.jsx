import React from "react";
import "../authentication.scss";

import { Link } from "react-router-dom";
import Input from "@app/ui/components/input";

export default function index() {
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

  return (
    <div className="wrapper">
      <div className="model">
        <img src="/assets/images/register.png" alt="model sign up" />
      </div>
      <form>
        <h3> BLACK DARK </h3>
        <div className="details">
          {formInputs.map((detail) => (
            <Input
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

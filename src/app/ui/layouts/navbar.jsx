import React from "react";
import "./navbar.scss";

import { Link } from "react-router-dom";

export default function navbar() {
  const LocalStorage = localStorage.getItem("verify");
  const links = [
    {
      id: 0,
      title: "تماس با ما",
      url: "/contact-us",
    },
    {
      id: 1,
      title: "درباره ما",
      url: "/about-us",
    },
    {
      id: 2,
      title: "وبلاگ",
      url: "#",
    },
  ];

  const Links = [
    {
      id: 0,
      title: "کاپشن",
      url: "#",
    },
    {
      id: 1,
      title: "ژاکت",
      url: "#",
    },
    {
      id: 2,
      title: "کت و شلوار",
      url: "#",
    },
    {
      id: 4,
      title: "شلوار",
      url: "#",
    },
    {
      id: 5,
      title: "تیشرت",
      url: "#",
    },
    {
      id: 5,
      title: "پیراهن",
      url: "#",
    },
  ];

  return (
    <>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <Link to={link.url}> {link.title} </Link>
            </li>
          ))}
        </ul>

        <button className="cart">
          سبد خرید
          <div className="indicator">2</div>
        </button>
       <Link to={!LocalStorage ? "/auth/login" : "/profil/user"}><button className="profile-me" >{LocalStorage ? "پروفایل من" : "ثبت نام / ورود"}</button></Link> 
      </nav>
      <div className="nav2">
        <div className="input">

        <svg className="svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            stroke="#808080"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22 22L20 20"
            stroke="#808080"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <input type="search" placeholder="جستجو" />
        </div>
        <ul>
          {Links.map((links) => (
            <li key={links.id}>
              <Link to={links.url}> {links.title} </Link>
            </li>
          ))}
        </ul>
        <h3>BLACK DARK</h3>
      </div>
    </>
  );
}

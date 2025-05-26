import React, { useEffect, useState } from "react";
import "./navbar.scss";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "@app/helpers/variables";

export default function navbar() {

  const loginState = localStorage.getItem('verified');
  const adminState = localStorage.getItem('admin');

  const navigate = useNavigate()
  const [links , setLinks] = useState([])
  useEffect(()=>{
     const handelLinks = async() =>{
     
      const res = await axios.get(`${baseUrl}/categories`)
      setLinks(res.data)
     }
     handelLinks();
  },[])

  const link = [
    {
      id: 0,
      title: "صفحه اصلی",
      url: "/",
    },
    {
      id: 1,
      title: "تماس با ما",
      url: "/contact-us",
    },
    {
      id: 2,
      title: "درباره ما",
      url: "/about-us",
    },
    {
      id: 3,
      title: "وبلاگ",
      url: "/blog",
    },
  ];
  return (
    <>
      <nav>
        <ul>
          {link.map((link) => (
            <li key={link.id}>
              <Link to={link.url}> {link.title} </Link>
            </li>
          ))}
        </ul>

        <button className="cart">
          سبد خرید
          <div className="indicator">2</div>
        </button>
        <button className="profile-me" onClick={() => navigate(loginState ? `/profile${adminState == "true" ? "/admin" : "/user"}` : '/auth/register')}>
          {loginState ? "پروفایل من" : "ثبت نام / ورود"}
        </button>
      </nav>
      <div className="sub-nav">
        <div className="search-bar">
          <img src="/assets/icons/search.svg" alt="search ico" />
          <input type="text" name="search-all" id="searchTheWholeSite" placeholder="جستجو" />
        </div>
        <ul>
          {links.map((Links) => (
            <li key={Links.id}>
              <Link style={{color: "black"}}> {Links.category} </Link>
            </li>
          ))}
        </ul>
        <h3>BLACK DARK</h3>
      </div>
    </>
  );
}

import React, { useState, useRef, useEffect, useContext } from "react";
import "../authentication.scss";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast, Bounce, ToastContainer } from "react-toastify";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { AuthenticationContext } from "@app/context/InputContext";
import { baseUrl } from "@app/helpers/vb";
const numberInputs = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export default function Verification() {
  const [code, setcode] = useState(Math.floor(Math.random() * 99999) + 1000);
  const [values, setValues] = useState(["", "", "", "", ""]); // Track values of each input
  const inputRefs = useRef([]); // Store refs for each input element
  const navigate = useNavigate();
  // const { loginPassword, loginUsername } = useContext(AuthenticationContext);

  const loginUsername = "moh";
  const loginPassword = "12345678";

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${baseUrl}/register`);
      const user = res.data.find(
        (user) =>
          user.username === loginUsername && user.password === loginPassword
      );
      console.log(user);
      if (user) {
        alert("test");
        localStorage.setItem("admin", user.admin);
      }
    };
    getData();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    const newValues = [...values];
    newValues[index] = value;

    // Move to the next input if there's a value
    setValues(newValues);
    if (value && index < numberInputs.length - 1) {
      // Focus next input
      inputRefs.current[index + 1]?.focus();
    }
  };
  // seting email
  emailjs.init({
    publicKey: "cBYh4_JDWUITDNyST",
    limitRate: {
      id: "app",
      throttle: 1000000,
    },
  });
  useEffect(() => {
    if (
      localStorage.getItem("Verified") === null &&
      localStorage.getItem("verify") === null &&
      localStorage.getItem("email") === null
    ) {
      navigate("/auth/login");
    } else if (localStorage.getItem("Verified") == "true") {
      emailjs.send("service_sz7lmj3", "template_5wqgv6m", {
        code: code,
        email: localStorage.getItem("email"),
      });
      localStorage.setItem("code", code);
    }
  }, [localStorage.getItem("email")]);
  // end

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && values[index] === "") {
      // Focus previous input if backspace is pressed and the current input is empty
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "Backspace" && values[index] !== "") {
      // If there's a value, just delete it
      const newValues = [...values];
      newValues[index] = "";
      setValues(newValues);
    } else if (e.key === "Delete" && values[index] === "") {
      // Focus next input if delete is pressed and current input is empty
      if (index < numberInputs.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (e.key === "Delete" && values[index] !== "") {
      // If there's a value, just delete it
      const newValues = [...values];
      newValues[index] = "";
      setValues(newValues);
    }
  };
  code.map;
  const VerifyUser = async (e) => {
    e.preventDefault();
    // if (localStorage.getItem("code") == values.join("")) {
    //   toast.success("حساب کاربری با موفقیت تایید شد❤", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: false,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //     transition: Bounce,
    //     onClose: () => {
    //       if (localStorage.getItem("admin")) {
    //         navigate("/profil/admin");
    //       } else {
    //         navigate("/profil/user");
    //       }
    //     },
    //   });
    //   localStorage.setItem("verify", true);
    // } else {
    //   toast.error("کد وارد شده نامعتبر است🤦‍♂️", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: false,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //     transition: Bounce,
    //   });
    // }
  };
  const [edit, setEdit] = useState(true);
  const [emailnow, setemailnow] = useState("");
  const data = async () => {
    setEdit(true);
    try {
      const respans = await axios.get(`${baseUrl}/register`);
      const user = respans.data.find(
        (user) =>
          user.username === loginUsername && user.password === loginPassword
      );
      if (user) {
        const respans = await axios.patch(`${baseUrl}/register/${user.id}`, {
          email: emailnow,
        });
        console.log(respans.data);
        localStorage.setItem("email", emailnow);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { query: register } = useQuery({
    queryKey: ["register"],
    queryFn: VerifyUser,
  });
  return (
    <div className="wrapper">
      <ToastContainer />
      <div className="model">
        <img src="/assets/images/verification.png" alt="model sign up" />
      </div>
      <form onSubmit={VerifyUser}>
        <h3>BLACK DARK</h3>
        {edit ? (
          <div className="details">
            <div className="box-container">
              {numberInputs.map((number, index) => (
                <input
                  key={number.id}
                  type="text"
                  className="numbers"
                  value={values[index]}
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  // onInput={(e) => VerifyUser(e)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <button type="submit" className="formBtns">
              {" "}
              تایید کد{" "}
            </button>
            <div className="row">
              <span className="countdown"> ارسال مجدد ۴:۵۹ </span>
              <button className="editEmail" onClick={() => setEdit(false)}>
                ویرایش ایمیل
              </button>
            </div>
          </div>
        ) : (
          <div className="details">
            <input
              value={emailnow}
              onInput={(e) => setemailnow(e.target.value)}
              type="email"
              placeholder="ایمیل جدید را وارد کنید !"
            />{" "}
            <button type="button" onClick={data} className="formBtns">
              ارسال ایمیل
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

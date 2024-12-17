import React from "react";
import "./input.scss";

export default function Input({ type, placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onInput={(e) => setValue(e.target.value)}
    />
  );
}

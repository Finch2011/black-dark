import React from "react";
import "./product.scss";
import { Link } from "react-router-dom";
import Off from "@app/ui/components/off";
export default function Product({
  image,
  title,
  Ogprice,
  Finalprice,
  addres,
  offervalue,
}) {
  return (
    <Link to={addres}>
      <div className="main-product">
        <Off offervalue={offervalue} />
        <img src={image} alt="" />
        <div className="info">
          <img className="bg-arrow" src="/assets/images/bg.svg" alt="" />
          <img className="arrow" src="/assets/images/arrow2.svg" alt="" />
          <h4>{title}</h4>
          <div className="prices">
            <span className="s1">{Ogprice}</span>
            <span className="s2">{Finalprice}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

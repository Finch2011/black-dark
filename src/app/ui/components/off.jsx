import React from 'react';
import "./offer.scss";

export default function Off() {
    const offervalue = 30;
  return (
    <div className='offer-container'>
        <span>OFF</span>
        <span>{offervalue}%</span>
    </div>
  )
}

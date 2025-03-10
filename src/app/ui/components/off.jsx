import React from 'react';
import "./offer.scss";

export default function Off({offervalue}) {
  return (
    <div className='offer-container'>
        <span>OFF</span>
        <span>{offervalue}%</span>
    </div>
  )
}

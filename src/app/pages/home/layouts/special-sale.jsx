import React, { useState } from 'react';
import './special-sales.scss';
import Product from '../components/product';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '@app/helpers/variables';

export default function SpecialSale() {
  const queryFn = async () =>{
    try {
      const {data} = await axios.get(`${baseUrl}/special-offers`)
      console.log(data)
       return data
    } catch (error) {
      console.error(error.massage)
    }
  }
  const {data : specialOffers} = useQuery({
    queryKey : ["Specialoffers"],
    queryFn
  })

  return (
    <div className='products-details'>
      {specialOffers?.map((product)=>(
        <Product
        key={product.id}
        address={`/products/${product.slug}`}
        title={product.title}
        ogPrice={product.originalPrice}
        finalPrice={product.offerPrice}
        image={product.image}
        offer={product.percentage}
        />
      ))}
    </div>
  )
}

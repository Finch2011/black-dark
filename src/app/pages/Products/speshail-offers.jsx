import { baseUrl } from '@app/helpers/vb'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
export default function Speshailoffers() {
    const [productDitails , setProductDitails] = useState([])
    const { slug }  = useParams()
    const getproductdata =  async () => {
        const res = await axios.get(`${baseUrl}/Speshial-offers?slug=${slug}`)
         setProductDitails(res.data)
    }
    useEffect(()=>{
      getproductdata();
    },[])
        
  return (
    <>
     {productDitails.map((p)=>(
        <div>
         <h1>{p.title}</h1>
         <span>{p.Ogprice}</span>
         <span>{p.Fainalprice}</span>
         <img src={p.image} alt={p.title} />
         <p>offer : {p.offervalue}%</p>
        </div>
     ))}
    </>
  )
}

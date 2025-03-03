import React, { useState } from 'react'
import Product from './product'
import Model1 from "@assets/images/Model1.png"
import Model2 from "@assets/images/Model2.png"
import Model3 from "@assets/images/Model3.png"
import Model4 from "@assets/images/Model4.png"
import Model5 from "@assets/images/Model5.png"
export default function Products() {
    const [ProductData , setProductData] = useState([
        {
            id:0 ,
            title : "کت بربری Burberry مدل A8 " ,
            Ogprice: "2,000,000",
            Fainalprice :"1,400,000",
            image: Model1
            
        },
        {
            id:1 ,
            title : "کت شلوار  بروکس Brooks  " ,
            Ogprice: "3,000,000",
            Fainalprice :"1,500,000",
            image: Model2
        },
        {
            id:2 ,
            title : "کت شلوارکانالی 320 Canali" ,
            Ogprice: "6,800,000",
            Fainalprice :"4,800,000",
            image: Model3
        },
        {
            id:3 ,
            title : "کت زنانه اس پی ایتالیا SP Italy" ,
            Ogprice: "7,000,000",
            Fainalprice :"6,500,000",
            image: Model4
        },
        {
            id:4 ,
            title : "کت چرمی بلک مدل وسطای vstay" ,
            Ogprice: "12,500,000",
            Fainalprice :"8,600,000",
            image: Model5
        },
    ])
  return (
    <>
     {ProductData.map((p)=>(
        <Product
         title={p.title}
         Ogprice={p.Ogprice}
         Finalprice={p.Fainalprice}
         image={p.image}
        />
     ))}
    </>
  )
}

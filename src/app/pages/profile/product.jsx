import React, { useState } from 'react'
import { baseUrl } from '@app/helpers/variables'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function Productss() {
    const [queryValue, setQueryValue] = useState("")
    const queryFn = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/special-offers`)
            return data
        } catch (error) {
            console.log(error.massage)
            return error
        }
    }
    const { data: products } = useQuery({
        queryKey: ["products", queryValue],
        queryFn
    })
    const handelmap = (e) =>{
    setQueryValue(e)
    }
    const filtercat = products?.filter((product) => product.cat === queryValue)
    console.log(queryValue)
    const cat =  [...new Set( products?.map(product => product.cat))]
    return (
        <div className='container' style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <ul style={{ width: "600px", display: 'flex', justifyContent: "space-evenly", alignItems: "center", marginTop: "1rem", cursor: "pointer" }}>
             
             {cat.map((cat , index)=>(
                <li onClick={(e) => handelmap(e.target.textContent)} key={index}>{cat}</li>
             ))}
            </ul>
            <section style={{ margin: " 3rem" }}>
                {queryValue !== "" ? filtercat?.map((product) => (
                    <>
                        <h3 key={1}>{ product.title}</h3>
                         <p key={12}>{product.percentage}</p>
                         <p key={123}>{product.enTitle}</p>
                         <p key={1234}>{product.brand}</p>
                         <p key={12345}>{product.originalPrice}</p>
                         <p key={123456}>{product.offerPrice}</p>
                    </>
                ))  : products?.map((product) => (
                    <>
                        <h3 key={1}>{ product.title}</h3>
                         <p key={12}>{product.percentage}</p>
                         <p key={123}>{product.enTitle}</p>
                         <p key={1234}>{product.brand}</p>
                         <p key={12345}>{product.originalPrice}</p>
                         <p key={123456}>{product.offerPrice}</p>
                    </>
                ))}
                {}
            </section>
        </div>
    )
}

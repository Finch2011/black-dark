import React, { useState } from 'react'
import { baseUrl } from '@app/helpers/variables'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function Productss() {
    const [queryValue, setQueryValue] = useState("")
    const queryFn = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/special-offers?cat=${queryValue}`)
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
    const handelcat = (cat) => {
        setQueryValue(cat)
    }
    return (
        <div className='container' style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <ul style={{ width: "600px", display: 'flex', justifyContent: "space-evenly", alignItems: "center", marginTop: "1rem", cursor: "pointer" }}>
                <li onClick={(e) => handelcat(e.target.textContent)}>پیراهن</li>
                <li onClick={(e) => handelcat(e.target.textContent)}>تیشرت</li>
                <li onClick={(e) => handelcat(e.target.textContent)}>شلوار</li>
                <li onClick={(e) => handelcat(e.target.textContent)}>کت شلوار</li>
                <li onClick={(e) => handelcat(e.target.textContent)}>ژاکت</li>
                <li onClick={(e) => handelcat(e.target.textContent)}>کاپشن</li>
            </ul>
            <section style={{ margin: " 3rem" }}>
                {products && products.map((product) => {
                    <>
                        <h3>{ product.title}</h3>
                        <p>{product.percentage}</p>
                        <p>{product.enTitle}</p>
                        <p>{product.brand}</p>
                        <p>{product.originalPrice}</p>
                        <p>{product.offerPrice}</p>
                    </>

                })}
            </section>
        </div>
    )
}

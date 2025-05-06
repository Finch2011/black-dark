import { baseUrl } from '@app/helpers/variables';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./special-offers.scss"
import { useParams } from 'react-router-dom';

export default function SpecialOffers() {

    const [productDetails, setProductDetails] = useState([]);

    const { slug } = useParams();


    useEffect(() => {
        const getProductData = async () => {

            const response = await axios.get(`${baseUrl}/special-offers?slug=${slug}`);
            setProductDetails(response.data);
        }
        getProductData();
    }, [])


    return (
        <>
            {productDetails.map((product) => (
                <div className='conteainer' key={product.id}>
                    <h1>{product.title}</h1>
                    <span>{product.originalPrice}</span>
                    <span>{product.offerPrice}</span>
                    <img src={product.image} alt={product.title} />
                    <p>Product offer sale : {product.percentage}</p>
                </div>
            ))}
        </>
    )
}

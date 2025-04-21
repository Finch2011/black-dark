import React, { useState } from 'react';
import './newProduct.scss';
import axios from 'axios';
import { baseUrl } from '@app/helpers/variables';
import { useMutation } from '@tanstack/react-query';

export default function NewProduct() {
    const [imagePreview, setImagePreview] = useState("");
    const [imageSrc, setImageSrc] = useState("");

    const handleImageChange = (event) => {

        console.log(event.target.files[0])

        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setImageSrc(file.name);
        }
    };
    const createNewProduct = async (formData) => {
        try {
            const response = await axios.post(`${baseUrl}/special-offers`, {
                title: formData.get('title'),
                img: imageSrc ,
                enTitle: formData.get('en-title'),
                brand: formData.get('brand'),
                sizeSM: formData.get('sizeSM'),
                sizeS: formData.get('sizeS'),
                sizeM: formData.get('sizeM'),
                sizeL: formData.get('sizeL'),
                sizeXL: formData.get('sizeXL'),
                colorB: formData.get('colorB'),
                colorBe: formData.get('colorBe'),
                colorR: formData.get('colorR'),
                colorG: formData.get('colorG'),
                colorP: formData.get('colorP'),
                originalPrice: formData.get('originalPrice'),
                offerPrice: formData.get('offerPrice'),
                percentage: formData.get('percentage'),
                slug: formData.get('en-title'),
            });
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: (formData) => createNewProduct(formData),
        onSuccess: () => {
            alert("محصول با موفقیت ایجاد شد!");
            // Reset form or do other success actions
        },
        onError: (error) => {
            console.error("خطا در ایجاد محصول:", error);
            alert("خطا در ایجاد محصول!");
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        mutate(formData);
    };

    return (
        <>
            <form className='newProduct' onSubmit={handleSubmit}>
                <section className='rightSide'>
                    <fieldset>
                        <legend> اطلاعات کلی محصول </legend>
                        <input className="newPrInput" name='title' type="text" placeholder='عنوان محصول شما' />
                        <input className="newPrInput" name='en-title' type="text" placeholder='عنوان انگیلیسی محصول شما' />
                        <input className="newPrInput" name='brand' type="text" placeholder='برند مصحول شما' />
                    </fieldset>
                    <fieldset>
                        <legend> رنگ و سایزبندی </legend>
                        <div className="sizes">
                            <label htmlFor="sizes"> سایز های موجود محصول </label>
                            <label htmlFor="siezSM"> SM </label><input type="checkbox" name="sizeSM" id="sizeSM" />
                            <label htmlFor="sizeS"> S </label><input type="checkbox" name="sizeS" id="sizeS" />
                            <label htmlFor="sizeM"> M </label><input type="checkbox" name="sizeM" id="sizeM" />
                            <label htmlFor="sizeL"> L </label><input type="checkbox" name="sizeL" id="sizeL" />
                            <label htmlFor="sizeXL"> XL </label><input type="checkbox" name="sizeXL" id="sizeXL" />
                        </div>
                        <div className="colors">
                            <label htmlFor="colors"> رنگ های موجود محصول </label>
                            <label htmlFor="colorB"> Blue </label><input type="checkbox" name="colorB" id="colorB" />
                            <label htmlFor="colorBe"> Beige </label><input type="checkbox" name="colorBe" id="colorBe" />
                            <label htmlFor="colorR"> Red </label><input type="checkbox" name="colorR" id="colorR" />
                            <label htmlFor="colorG"> Green </label><input type="checkbox" name="colorG" id="colorG" />
                            <label htmlFor="colorP"> Pink </label><input type="checkbox" name="colorP" id="colorP" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend> قیمت و تخفیف های محصول </legend>
                        <input className="newPrInput" name='originalPrice' type="text" placeholder='قیمت اصلی محصول' />
                        <input className="newPrInput" name='offerPrice' type="text" placeholder='قیمت بعد از تخفیف' />
                        <input className="newPrInput" name='percentage' type="text" placeholder='درصد تخفیف' />
                    </fieldset>
                </section>
                <section className='leftSide'>
                    <fieldset>
                        <legend> عکس های مصحول شما </legend>
                        <input
                            type="file"
                            name="image-product"
                            id="imageProduct"
                            onChange={(e)=> handleImageChange(e)}
                        />
                        {imagePreview && <img src={imagePreview} alt="Preview" />}
                    </fieldset>
                <button type='submit' disabled={isLoading}>
                    {isLoading ? 'در حال ایجاد...' : 'ایجاد محصول'}
                </button>
                </section>
                {isError && <div className="error-message">{error.message}</div>}
            </form>
        </>
    );
}
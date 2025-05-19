import React, { useState, useEffect, useRef } from 'react';
import './newProduct.scss';
import axios from 'axios';
import { baseUrl , IMAGEBBKEY , IMAGEBBURL } from '@app/helpers/variables';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function NewProduct() {
    const queryClient = useQueryClient();
    const [imageSrc, setImageSrc] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const dropdownRef = useRef(null);

    // Constants for sizes and colors to avoid repetition
    const sizes = [
        { id: 'sizeSM', label: 'SM', name: 'sizeSM' },
        { id: 'sizeS', label: 'S', name: 'sizeS' },
        { id: 'sizeM', label: 'M', name: 'sizeM' },
        { id: 'sizeL', label: 'L', name: 'sizeL' },
        { id: 'sizeXL', label: 'XL', name: 'sizeXL' }
    ];

    const colors = [
        { id: 'colorB', label: 'Blue', name: 'colorB' },
        { id: 'colorBe', label: 'Beige', name: 'colorBe' },
        { id: 'colorR', label: 'Red', name: 'colorR' },
        { id: 'colorG', label: 'Green', name: 'colorG' },
        { id: 'colorP', label: 'Pink', name: 'colorP' }
    ];

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`${IMAGEBBURL}?key=${IMAGEBBKEY}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setImageSrc(response.data.data.url);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await axios.get(`${baseUrl}/categories`);
            return data;
        }
    });

    const filteredCategories = categories.filter(cat =>
        cat.category.toLowerCase().includes(categoryInput.toLowerCase())
    );

    const handleSelectCategory = (value) => {
        setCategoryInput(value);
        setShowSuggestions(false);
    };

    const createNewProduct = async (formData) => {
        const selectedCategory = formData.get('categories');
        const isNewCategory = !categories.some(
            cat => cat.category.toLowerCase() === selectedCategory.toLowerCase()
        );

        if (selectedCategory && isNewCategory) {
            await axios.post(`${baseUrl}/categories`, { category: selectedCategory });
        }

        const productData = {
            title: formData.get('title'),
            enTitle: formData.get('en-title'),
            brand: formData.get('brand'),
            ...sizes.reduce((acc, size) => {
                acc[size.name] = formData.get(size.name) === 'on';
                return acc;
            }, {}),
            ...colors.reduce((acc, color) => {
                acc[color.name] = formData.get(color.name) === 'on';
                return acc;
            }, {}),
            originalPrice: formData.get('originalPrice'),
            offerPrice: formData.get('offerPrice'),
            percentage: formData.get('percentage'),
            imageSrc,
            category: selectedCategory,
            slug: formData.get('en-title'),
        };

        return axios.post(`${baseUrl}/special-offers`, productData);
    };

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            return createNewProduct(formData);
        },
        onSuccess: () => {
            alert("محصول با موفقیت ایجاد شد!");
            setImageSrc("");
            setCategoryInput("");
        },
        onError: (error) => {
            console.error("خطا در ایجاد محصول:", error);
            alert("خطا در ایجاد محصول!");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['product-detail'] });
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        }
    });

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="new-product-container">
            <form className='newProduct' onSubmit={mutate}>
                <section className='rightSide'>
                    <fieldset>
                        <legend>اطلاعات کلی محصول</legend>
                        <div className="form-group">
                            <input className="newPrInput" name='title' type="text" placeholder='عنوان محصول شما' required />
                        </div>
                        <div className="form-group">
                            <input className="newPrInput" name='en-title' type="text" placeholder='عنوان انگلیسی محصول شما' required />
                        </div>
                        <div className="form-group">
                            <input className="newPrInput" name='brand' type="text" placeholder='برند محصول شما' required />
                        </div>
                        <div className="form-group category-wrapper" ref={dropdownRef}>
                            <input
                                className="newPrInput"
                                name="categories"
                                type="text"
                                placeholder="دسته‌بندی محصول شما"
                                value={categoryInput}
                                onChange={(e) => {
                                    setCategoryInput(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                autoComplete="off"
                                required
                            />
                            {showSuggestions && categoryInput && (
                                <ul className="suggestions">
                                    {filteredCategories.length > 0 ? (
                                        filteredCategories.map((cat, i) => (
                                            <li key={i} onClick={() => handleSelectCategory(cat.category)}>
                                                {cat.category}
                                            </li>
                                        ))
                                    ) : (
                                        <li onClick={() => handleSelectCategory(categoryInput)}>
                                            ایجاد دسته‌بندی جدید: "{categoryInput}"
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>رنگ و سایزبندی</legend>
                        <div className="sizes">
                            <label className="section-label">سایزهای موجود محصول</label>
                            <div className="sizes">
                                {sizes.map(size => (
                                    <div className="checkbox-item" key={size.id}>
                                        <input type="checkbox" name={size.name} id={size.id} />
                                        <label htmlFor={size.id}>{size.label}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="colors">
                            <label className="section-label">رنگ‌های موجود محصول</label>
                            <div className="colors">
                                {colors.map(color => (
                                    <div className="checkbox-item" key={color.id}>
                                        <input type="checkbox" name={color.name} id={color.id} />
                                        <label htmlFor={color.id}>{color.label}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>قیمت و تخفیف‌های محصول</legend>
                        <div className="form-group">
                            <input className="newPrInput" name='originalPrice' type="text" placeholder='قیمت اصلی محصول' required />
                        </div>
                        <div className="form-group">
                            <input className="newPrInput" name='offerPrice' type="text" placeholder='قیمت بعد از تخفیف' required />
                        </div>
                        <div className="form-group">
                            <input className="newPrInput" name='percentage' type="text" placeholder='درصد تخفیف' required />
                        </div>
                    </fieldset>
                </section>

                <section className='leftSide'>
                    <fieldset>
                        <legend>عکس‌های محصول شما</legend>
                        <div className="image-upload">
                            <label htmlFor="imageProduct" className="upload-label">
                                {imageSrc ? 'تغییر عکس' : 'انتخاب عکس'}
                            </label>
                            <input
                                type="file"
                                name="image-product"
                                id="imageProduct"
                                onChange={handleImageChange}
                                accept="image/*"
                                required
                            />
                            {imageSrc && (
                                <div className="image-preview">
                                    <img src={imageSrc} alt="Preview" />
                                </div>
                            )}
                        </div>
                    </fieldset>
                    
                    <button type='submit' className="submit-btn" disabled={isLoading}>
                        {isLoading ? 'در حال ایجاد...' : 'ایجاد محصول'}
                    </button>
                    
                    {isError && (
                        <div className="error-message">
                            {error.response?.data?.message || error.message || "خطا در ایجاد محصول"}
                        </div>
                    )}
                </section>
            </form>
        </div>
    );
}
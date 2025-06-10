import React, { useState } from 'react';
import './special-offers.scss';
import { baseUrl } from '@app/helpers/variables';
import axios from 'axios';

import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function SpecialOffers() {
    const { slug } = useParams();
    const [position , setPosition] =useState("info");
    const currentLocation = window.location.pathname;
    const optimizedSlug = slug.replace(/ /g, "%20");

    const filtredLocation = currentLocation.replace(optimizedSlug, "");

    const queryFn = async () => {
        const { data } = await axios.get(`${baseUrl}/special-offers?slug=${slug}`);
        return data
    }

    const { data: productDetails } = useQuery({
        queryKey: ['product-details'],
        queryFn
    })

    const category = productDetails?.map((product) => product.categories)

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedImg , setselectedImg] = useState(false)

    const handleSize = (index) => {
        setSelectedSize(index)
    }

    const handleColor = (index) => {
        setSelectedColor(index)
    }

    return (
        <div>
            <div className="bread-crumb">
                <Link to={'/'}> خانه </Link>
                <button className='bread-arrow' />
                <Link to={filtredLocation}> پوشاک </Link>
                <button className='bread-arrow' />
                <Link to={currentLocation}> {category} </Link>
            </div>

            {productDetails?.map((product) => (
                <div className="special-offers-container">
                    <section  className={selectedImg ? "body" : "general-info"}>
                        <section className="purchase-info">
                            <h2 className="title">{product.title}</h2>
                            <h3 className="en-title">{product.enTitle}</h3>
                            <ul className="sizes-chooser">
                                <span> راهنما سایــز </span>
                                {product.Sizes?.map((size, index) => (
                                    <li onClick={() => handleSize(index)} className={selectedSize === index ? 'selectedSize' : ''} key={index}> {size} </li>
                                ))}
                            </ul>
                            <ul className="colors-picker">
                                {product.Colors?.map((color, index) => (
                                    <li onClick={() => handleColor(index)} style={selectedColor === index?{backgroundColor : color.color} : {}} className={selectedColor === index ? 'selectedColor' : 'mainClassColor'} key={index}> {selectedColor === index? color.text : color.letter} </li>
                                ))}
                            </ul>
                            <div className="row">
                                <span className='brand'>{product.brand}</span>
                                <div className="prices">
                                    <h3>{product.originalPrice}</h3>
                                    <h2>{product.offerPrice}</h2>
                                    <div className='offer'>
                                    <p>
                                   {product.percentage}%
                                    </p>
                                 </div>
                                </div>
                            </div>
                            <div className='buyingButton'>
                            <button> افزودن به سبد خرید </button>
                            </div>
                        <section className="more-details"></section>
                        </section>
                    </section>
                    <section className="image-holder">
                        <img className={selectedImg ? "selectedImg" : "notselectedImg"} onClick={()=>{setselectedImg(true)}} onDoubleClick={()=>{setselectedImg(false)}} src={product.image} alt="" />
                        <div className={selectedImg ? "body" : "miniImg"}>
                            {product.images?.map((img)=>(
                                <img key={img.id} src={img} alt="" />
                            ))}
                        </div>
                    </section>
                   
                </div>
            ))}
             <div className='main-navigate'>
                      <button onClick={()=> setPosition("commit")} className={position === "commit" ? "selected" : ""}>نظرات کاربران</button>
                      <button onClick={()=> setPosition("discription")} className={position === "discription" ? "selected" : "" }>مشخصات</button>
                      <button onClick={()=> setPosition("info")} className={position === "info" ? "selected" : ""}>توضیحات</button>
                      <div>
                       {position === "commit" ? <div> very very bad  </div> : ""}
                       {position === "info" ? <div className='info-dit'> 
                        <div className='text'>

                        <h4>پارچه پشمی درجه یک </h4>
                        <h4> طراحی برجسته</h4>
                        <h4>دوخته شده با نخ بز</h4>
                        <h4>پارچه  پشمی درجه </h4>
                        <p>کت و شلوار مردانه شامل یک کت، یک شلوار و گاهی یک جلیقه است که از یک نوع پارچه دوخته‌شده‌اند. توجه کنید که یک شلوار و یک کت با پار‌چه‌ای مشابه به عنوان کت و شلوار شناخته نمی‌شود و حتماً باید در دوخت تمامی آیتم‌ها از یک پارچه استفاده شده باشد. امروزه مدل‌های کت و شلوار زیادی برای انتخاب وجود دارد، اما همه آن‌ها بر اساس سه سبک کلی طبقه‌بندی می‌شوند: آمریکایی، اروپایی/ایتالیایی و انگلیسی. اگرچه برخی از عناصر هر یک از این سبک‌ها مشابه سبک‌های دیگر هستند، اما همچنان به عنوان یک راهنمای مفید در تعیین اینکه کدام مدل برش برای تیپ بدنی شما مناسب‌تر است، در نظر گرفته می‌شوند.</p>
                       </div>
                        <img src="/assets/images/model-2.png" alt="model sign up" />

                       </div> : ""}
                       {position === "discription" ? <div className='main-table'>
                        <table>
                           <tbody className='info-table'>
                            <td>
                                <tr>جنس پارچه :</tr>
                                <th>پنبه ابریشمی</th>
                            </td>
                            <td>
                                <tr>طراحی :</tr>
                                <th>mr. davinchi</th>
                            </td>
                            <td>
                                <tr>تولید :</tr>
                                <th>کشور ایتالیا</th>
                            </td>
                            <td>
                                <tr>رنگبندی :</tr>
                                <th>سبز و صورتی و بژ و قرمز و آبی</th>
                            </td>
                            <td>
                                <tr>دیگر موارد :</tr>
                                <th>دوخته شده از نخ بزی - رنگ طبیعی</th>
                            </td>
                           </tbody>
                        </table>
                       </div> : ""}
                       
                      </div>
                    </div>
                    </div>
                )
}
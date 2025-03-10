import React, { useEffect, useState } from "react";
import Product from "./product";
import Model1 from "@assets/images/Model1.png";
import Model2 from "@assets/images/Model2.png";
import Model3 from "@assets/images/Model3.png";
import Model4 from "@assets/images/Model4.png";
import Model5 from "@assets/images/Model5.png";
import Off from "@app/ui/components/off";
import axios from "axios";
import { baseUrl } from "@app/helpers/vb";
export default function Products() {
  const [ProductData, setProductData] = useState([]);
  const getdata = async () => {
    const res = await axios.get(`${baseUrl}/Speshial-offers`);
    setProductData(res.data);
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      {ProductData.map((p) => (
        <Product
          title={p.title}
          addres={p.addres}
          Ogprice={p.Ogprice}
          Finalprice={p.Fainalprice}
          image={p.image}
          offervalue={p.offervalue}
        />
      ))}
    </>
  );
}

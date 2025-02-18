import React from "react";

import "./home.scss";

export default function Home() {
    return(
        <>
        <div className="main-div">
            <div>
            <img className="prson" src="./assets/images/prson.png" alt="" />
            <img className="hakopian" src="./assets/images/Hakopian.svg" alt="" />
            <img className="imgh" src="./assets/images/imgh.svg" alt="" />
            </div>
            <div className="text-hakopian">
            <h1>کت شلوار های هاکوپیان</h1>
            <p>انواع کت شلوار های مردانه و زنانه در بلک دارک<img src="assets/images/arrow.svg" alt="" /></p>
            </div>
        <div className="position-w">
         <div className="button-vuesax">
          <img src="/assets/images/arrow-right.svg" alt="" />
         </div>
        </div>
        </div>
        <div className="main-prson">
            <div className="women">
            <h3 className="text-women"> پـوشـاک  زنـانـه <img src="./assets/images/peikan.svg" alt="" /></h3>
            </div>
            <div className="men">
                <h3 className="text-men"> پـوشـاک مـردانـه  <img src="./assets/images/peikan.svg" alt="" /></h3>

            </div>
            <div className="position-1"></div>
            <div className="position-2"></div>
            <img className="position-menprson" src="./assets/images/man.png" alt="" />
            <img className="position-womenprson" src="./assets/images/women.png" alt="" />
            <img className="position-women" src="./assets/images/women.svg" alt="" />
            <img className="position-men" src="./assets/images/men.svg" alt="" />
        </div>
        </>
    )
}

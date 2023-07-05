import React, { useRef, useState } from "react";
import { Carousel } from "antd";
import './About.scss'
export default function About() {
    const slider = useRef();
    const [banners, setBanners] = useState([
        {
            id: 1,
            url: "../images/banner_about/banner_1.png",
        },
        {
            id: 2,
            url: "../images/banner_about/banner_2.png",
        },
    ]);

    return (
        <>
            <Carousel
                ref={slider}
                autoplay
                autoplaySpeed={1000}
                effect={"fade"}
                dots={true}
                dotPosition={"bottom"}
                waitForAnimate={"true"}
            >
                {banners.map((banner, index) => (
                    <div className="items" key={banner.id + index}>
                        <img
                            style={{ width: "100%", height: "350px" }}
                            className="items-img"
                            src={banner.url}
                        />
                    </div>
                ))}
            </Carousel>
            <div className="about__main">
            <div className="about__one">
                  <h1>OUR EL GAUCHO STEAKHOUSE – CONTEMPORARY AND SPECIALISED</h1>
                  <p>Food is our passion and it's our aim to establish the benchmark
                  in Southeast Asia and beyond for a contemporary, specialized steakhouse
                  concept. We are proud to serve you the finest steakhouse-style food, using
                  only the best available meat products sourced from selected farms in Victoria,
                  New South Wales and the United States.</p>
            </div>
            <div className="about__two">
                  <div className="about__two__left" >
                      <img src="../images/banner_about/about_banner_1.png" alt="" />
                  </div>
                  <div className="about__two__right" >
                      <h1>PREMIUM CUTS</h1>
                      <p>OUR USDA PRIME STEAKS ARE FROM CERTIFIED ORGANIC COWS, 120 - 220 DAYS CORN-FED,
                         NON HORMONE TREATED CATTLE (NHTC) AND PACKED BY GREATER OMAHA PACKING CO, INC. 
                         EXCLUSIVELY FOR EL GAUCHO RESTAURANTS IN SOUTHEAST ASIA AND EUROPE. BLACK ANGUS
                         IS FROM PREMIUM AUSTRALIAN GRASS-FED CATTLE.</p>
                  </div>
            </div>
            <div className="about__three">
                  
                  <img src="../images/banner/banner_3.png" alt="" />
            </div>
            <div className="about__four">
              <div className="about__four__detail"> 
                  <h1>OUR SIGNATURE DESIGN AND STELLAR SERVICE</h1>
                  <p>When you walk into an El Gaucho restaurant, it does not matter if it's in Hai Ba Trung 
                  in Ho Chi Minh or Soi 19 in Thailand. The distinctive design and use of brick, dark wood 
                  and metal details can be found in every location. At El Gaucho, we aim to provide a satisfying
                  gastronomic experience, which starts by providing a space you can enjoy with family and friends.
                  It's the perfect setting for an office party, an anniversary or an evening out with your loved ones.
                  Come and enjoy an evening at El Gaucho and discover why we are the place for steaks.</p>
                  </div>
            </div>
            </div>
        </>
    );
}

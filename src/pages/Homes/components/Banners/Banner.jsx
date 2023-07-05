// import React from 'react'

// export default function Banner() {
//   return (
//     <div>Banner</div>
//   )
// }

import React, { useRef, useState } from "react";
import { Carousel } from "antd";
import "./Banner.scss";

export default function Banner() {
  const slider = useRef();
  const [banners, setBanners] = useState([
    {
      id: 1,
      url: "../images/banner/banner_1.png"
    },
    {
      id: 2,
      url: "../images/banner/banner_2.png"
    },
    {
      id: 3,
      url:"../images/banner/banner_3.png"
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
            <img style={{width:"100%",height: "550px"}} className="items-img" src={banner.url} />
          </div>
        ))}
      </Carousel>
    </>
  );
}
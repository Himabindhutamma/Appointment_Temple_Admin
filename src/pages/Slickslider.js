import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slickslider = ()=>{
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        arrows: true,
      };
    return(
        <>
        <Slider {...settings}>
      <div>
          <img src="https://gigaland.io/images/carousel/crs-12.jpg"/>
      </div>
      <div >
      <img src="https://gigaland.io/images/carousel/crs-12.jpg"/>
      </div>
      <div >
        <img src="https://gigaland.io/images/carousel/crs-14.jpg"/>
      </div>
      <div >
      <img src="https://gigaland.io/images/carousel/crs-12.jpg"/>
      </div>
      <div >
      <img src="https://gigaland.io/images/carousel/crs-12.jpg"/>
      </div>
      <div >
      <img src="https://gigaland.io/images/carousel/crs-12.jpg"/>
      </div>
     
      
    </Slider>
        </>
    )
}
export default Slickslider
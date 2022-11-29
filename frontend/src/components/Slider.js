import React from "react";

import img1 from "../asset/image/slide/01.jpg";
import img2 from "../asset/image/slide/02.jpg";
import { Carousel } from "antd";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const slide = [
  {
    title: "Slide1",
    src: img1,
  },
  {
    title: "Slide2",
    src: img2,
  },
];
const Slider = () => {
  return (
    <Carousel autoplay>
      {slide.map((slide, index) => (
        <div key={index}>
          <img src={slide.src} style={{width: "100%"}} />
          
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;

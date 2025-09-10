import React from 'react';
import Slider from 'react-slick';
import img1 from '../assets/women/women.png';
import img2 from '../assets/women/women3.png';
import img3 from "../assets/fash2.png"

const slides = [
  {
    img: img1,
    text: "Secure, fast, and reliable – your next favorite tool."
  },
  {
    img: img2,
    text: "Experience seamless authentication like never before."
  },
  {
    img: img3,
    text: "Experience seamless authentication like never before."
  }
];

const AuthSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: dots => (
      <div className="absolute z-20 flex justify-center w-full bottom-5">
        <ul className="flex space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-3 h-3 bg-white rounded-full opacity-60 hover:opacity-100"></div>
    )
  };

  return (
    <div className="relative w-full h-full">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-screen">
            <img
              src={slide.img}
              alt={`Slide ${index}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute z-10 text-xl font-semibold text-white bottom-10 left-10">
              {slide.text}
            </div>
            <div className="absolute inset-0 z-0 bg-black opacity-30"></div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AuthSlider;

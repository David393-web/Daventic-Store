import React from "react";
import Slider from "react-slick";
import Image1 from "../../assets/hero/Women.png";
import Image2 from "../../assets/fash.png";
import Image3 from "../../assets/fash2.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    id: 1,
    img: Image1,
    title: "Exclusive Winter Collections",
    description:
      "Step into the season in style with our cozy, chic, and comfortable winter wear. Curated just for you."
  },
  {
    id: 2,
    img: Image2,
    title: "Free Shipping On Orders Over $50",
    description: "Enjoy fast, free shipping across Nigeria when you shop above ₦25,000. Shop smart, save big.",
  },
  {
    id: 3,
    img: Image3,
    title: "Sign Up & Get 10% Off Your First Order",
    description: "Join the Daventic community today and enjoy instant discounts, plus early access to new arrivals."
  }
];

const AuthSlider = () => {
  
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
    fade: true
  };

  return (
    <div className="w-full h-full bg-white dark:bg-gray-900">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex flex-col items-center justify-center w-full h-full p-8 text-center"
          >
            <div className="flex flex-col items-center justify-center w-full h-full max-w-lg mx-auto">
              <img
                src={slide.img}
                alt="Slide"
                className="w-full max-h-[350px] object-contain mb-6 drop-shadow-lg"
              />
              <h2 className="mb-2 text-2xl font-bold text-primary">{slide.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>

  );
};

export default AuthSlider;

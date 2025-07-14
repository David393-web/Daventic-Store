import React from 'react'
import Image1 from "../../assets/hero/Women.png"
import Image2 from "../../assets/hero/Shopping.png"
import Image3 from "../../assets/hero/Sale.png"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const image = [
  {
    id: "1",
    img: Image1,
    title: " Up to 50% off all Men's wear",
    description:
      " Lorem His Life will forever be changed dolor sit amet consectetur adipisicing elit. Eaque cupiditate quisquam dolorum quia aliquam obcaecati suscipit eligendi eveniet, ipsam maiores."
  },
  {
    id: "2",
    img: Image2,
    title: "30% off on all women's wear",
    description:
      "Who's there Lorem ipsum  dolor sit amet consectetur adipisicing elit. Eaque cupiditate quisquam dolorum quia aliquam obcaecati suscipit eligendi eveniet, ipsam maiores."
  },
  {
    id: "3",
    img: Image3,
    title: "70% off on all Products Sale",
    description:
      "Who's there Lorem ipsum  dolor sit amet consectetur adipisicing elit. Eaque cupiditate quisquam dolorum quia aliquam obcaecati suscipit eligendi eveniet, ipsam maiores."
  },
]

const Hero = () => {

  const setings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    cssEase: "Ease-in",
    pauseOnHover: true,
    pauseOnFocus: true,
  }

  return (
    <div className='relative overflow-hidden min-h-[550px] 
    sm:min-h-[650px] bg-gray-100 flex justify-center
     items-center dark:bg-gray-950 dark:text-white 
     duration-200'>
      {/* background pattern  */}
      <div className="h-[700px] w-[700px] bg-primary/40 
    absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-[8] ">
      </div>
      {/* hero section  */}
      <div className='container pb-8 sm:pb-0'>
        <Slider {...setings}>
          {image.map((data) => (
            <div>
              <div className='grid grid-cols-1 sm:grid-cols-2'>
                {/* text content section  */}
                <div
                  className='relative z-10 flex flex-col 
            justify-center order-2 gap-4 pt-12 text-center
              sm:pt-0 sm:text-left sm:order-1'
                >
                  <h1
                    data-aos="zoom-out"
                    data-aos-duration="500"
                    data-aos-once="true"
                    className='text-5xl font-bold sm:text-6xl 
              lg:text-7xl'>{data.title}</h1>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="100"
                    className='text-sm'>
                    {data.description}
                  </p>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-once="300"
                  >
                    <button className='px-4 py-2 text-white 
                duration-200 rounded-full bg-gradient-to-r
              from-primary to-secondary hover:scale-105'>
                      Order Now
                    </button>
                  </div>
                </div>
                {/* image section  */}
                <div className='order-1 sm:order-2'>
                  <div
                    data-aos="zoom-in"
                    data-aos-once="true"
                    className='relative z-10'>
                    <img src={data.img} alt=""
                      className='w-[300px] h-[300px] sm:h-[450px] 
                sm:w-[450px] sm:scale-125 lg:scale-120 object-contain 
                mx-auto'/>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </Slider>
      </div>
    </div>
  )
}

export default Hero

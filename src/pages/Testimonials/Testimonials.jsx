import React from 'react'
import Slider from "react-slick"

const TestimonialsData = [
    {
        id: 1,
        name: "Victor",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, odio Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, odio",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s",
    },
    {
        id: 2,
        name: "Satya Nadella",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, odio Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, odio",
        img: "https://static-cse.canva.com/blob/2103212/1600w-B-cRyoh7b98.jpg",
    },
    {
        id: 3,
        name: "Virat Kohli",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, odio Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, odio",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6BkMQEKHWILXy8SzbX5aocWP6YWv0mZnSDA&s",
    },
    {
        id: 4,
        name: "Sachin Tendulkar",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, odio Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, odio",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Hb5xzFZJCTW4cMqmPwsgfw-gILUV7QevvQ&s",
    },
]

const Testimonials = () => {

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        cssEase: "Linear",
        pauseOnHover: true,
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
             {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    }

    return (
        <div className='py-10 mb-10'>
            <div className='container'>
                {/* header section    */}
                <div className='max-w-xl mx-auto mb-24 text-center'>
                    <p data-aos="fade-up" className='text-sm
                     text-primary'>
                        What our customers are saying
                    </p>
                    <h1 data-aos="fade-up" className='text-3xl 
                    font-bold'>Testimonial</h1>
                    <p data-aos="fade-up" className='text-xs
                     text-gray-400'>Lorem ipsum dolor sit, 
                     amet consectetur adipisicing elit. Iste, odio.</p>
                </div>

                {/* Testimonials cards  */}
                <div data-aos="zoom-in">
                   <Slider {...settings}>
                    {
                        TestimonialsData.map((data)=>(
                           <div className='my-6 '>
                             <div
                            key={data.id}
                            className='flex flex-col gap-4
                            shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800
                            bg-primary/10 relative'
                            >
                                  <div className='mb-4'>
                                    <img src={data.img} alt=""
                                    className='rounded-full w-20 h-20' />
                                  </div>
                                  <div className='flex flex-col items-center gap-4'>
                                    <div className='space-y-3'>
                                        <p
                                    className='text-xs text-gray-400' 
                                    >{data.text}</p>
                                    <h1
                                    className='text-xl font-bold text-black/80
                                    dark:text-light'
                                    >{data.name}</h1>
                                    </div>
                                  </div>
                                  <p className='text-black/20 text-9xl
                                  font-serif absolute top-0 right-0'>
                                    ,,
                                  </p>
                            </div>
                           </div>
                        ))
                    }
                    </Slider> 
                </div>
            </div>
        </div>
    )
}

export default Testimonials
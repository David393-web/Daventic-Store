import React from 'react';
import Img1 from "../../assets/shirt/shirt.png";
import Img2 from "../../assets/shirt/shirt2.png";
import Img3 from "../../assets/shirt/shirt3.png";
import { FaStar } from 'react-icons/fa';

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Casual Wear",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad saepe commodi minus maxime, doloribus quaerat dicta beatae officiis magnam quas!"
  },
  {
    id: 2,
    img: Img2,
    title: "Printed Shirt",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad saepe commodi minus maxime, doloribus quaerat dicta beatae officiis magnam quas!"
  },
  {
    id: 3,
    img: Img3,
    title: "Women Shirt",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad saepe commodi minus maxime, doloribus quaerat dicta beatae officiis magnam quas!"
  }
];

const TopProducts = () => {
  return (
    <div>
      <div className="container">
        {/* Header section */}
        <div className="max-w-xl mx-auto mb-24 text-center">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Rated Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Best Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, odio.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 place-items-center">
          {ProductsData.map((data) => (
            <div
            data-aos="zoom-out"
              key={data.id}
              className="relative bg-white shadow-xl rounded-2xl dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white duration-300 group max-w-[300px] min-h-[320px] flex flex-col justify-between"
            >
              {/* Image section */}
              <div className="h-[10px] flex items-center justify-center">
                <img
                  src={data.img}
                  alt=""
                  className="drop-shadow-md max-w-[140px] transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Details section */}
              <div className="px-4 pb-4 text-center">
                {/* star rating */}
                <div className="flex items-center justify-center gap-1 mb-2 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p className="text-sm text-gray-500 duration-300 group-hover:text-white line-clamp-2">
                  {data.description}
                </p>
                <button
                  className="px-4 py-1 mt-4 text-white duration-300 rounded-full bg-primary hover:scale-105 group-hover:bg-white group-hover:text-primary"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;

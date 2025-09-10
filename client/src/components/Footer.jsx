import React from 'react';
import footerLogo from "../assets/Logo.png";
import Banner from "../assets/website/footer-pattern.jpg";
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow } from 'react-icons/fa6';
import { FaMobileAlt } from 'react-icons/fa';

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];

const Footer = () => {
  return (
    <div style={BannerImg} className="py-10 text-white">
      <div className="container">
        <div data-aos="zoom-in" className="grid pt-5 pb-20 md:grid-cols-3">
          {/* company details */}
          <div className="px-4 py-8">
            <h1 className="flex items-center gap-3 mb-3 text-xl font-bold text-justify sm:text-3xl sm:text-left">
              <img src={footerLogo} alt="Logo" className="max-w-[50px]" />
              Daventic
            </h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus
              excepturi quae iste ea id corrupti labore Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus
              excepturi quae iste ea id corrupti labore
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 col-span-2 sm:grid-cols-3 md:pl-10">
            <div className="px-4 py-8">
              <h1 className="mb-3 text-xl font-bold text-justify sm:text-3xl sm:text-left">
                Important Links
              </h1>
              <ul className="flex flex-col gap-3">
                {FooterLinks.map((data) => (
                  <li
                    className="text-gray-200 duration-300 cursor-pointer hover:text-primary hover:translate-x-1"
                    key={data.title}
                  >
                    <a href={data.link}>{data.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-4 py-8">
              <h1 className="mb-3 text-xl font-bold text-justify sm:text-3xl sm:text-left">
                Links
              </h1>
              <ul className="flex flex-col gap-3">
                {FooterLinks.map((data) => (
                  <li
                    className="text-gray-200 duration-300 cursor-pointer hover:text-primary hover:translate-x-1"
                    key={data.title}
                  >
                    <a href={data.link}>{data.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Social Links */}
            <div className="px-4 py-8">
              <div className="flex items-center gap-3 mb-4">
                <a href="#"><FaInstagram className="text-3xl" /></a>
                <a href="#"><FaFacebook className="text-3xl" /></a>
                <a href="#"><FaLinkedin className="text-3xl" /></a>
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <FaLocationArrow />
                  <p>Noida, Uttar Pradesh</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <FaMobileAlt />
                  <p>+91 123456789</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React, { useEffect, useState } from "react";
import Logo from '../../assets/Logo.png';
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";
import { Link } from "react-router-dom";



const Navbar = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="relative z-40 duration-200 bg-orange-200 shadow-md dark:bg-gray-900 dark:text-white">
      {/* Upper Navbar */}
      <div className="py-2 bg-primary/40">
        <div className="container flex items-center justify-between">
          {/* Left - Logo */}
          <div className="flex items-center font-sans font-bold">
            <a href="#" className="flex gap-2 text-2xl font-bold sm:text-3xl">
              <img src={Logo} alt="Logo" className="w-10" />
            </a>
            Daventic
          </div>

          {/* Right - Search, Order, Dark Mode, Greeting */}
          <div className="flex items-center gap-4">
            {/* Greeting */}
            {username && (
              <span className="hidden text-sm font-medium sm:block">
                Hi {username}
              </span>
            )}

            {/* Search bar */}
            <div className="relative hidden group sm:block">
              <input
                type="text"
                placeholder="search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
              />
              <IoMdSearch className="absolute text-gray-500 -translate-y-1/2 group-hover:text-primary top-1/2 right-3" />
            </div>

            {/* Order button */}
            <button
              onClick={() => alert("This feature is currently not available")}
              className="flex items-center gap-3 px-4 py-1 text-white transition-all duration-200 bg-orange-400 rounded-full from-primary to-secondary group"
            >
              <span className="hidden transition-all duration-200 group-hover:block">
                Order
              </span>
              <FaCartShopping className="text-xl text-white cursor-pointer drop-shadow-sm" />
            </button>

            {/* Darkmode Switch */}
            <DarkMode />
          </div>
        </div>
      </div>

      {/* Lower Navbar */}
      <div className="flex justify-center bg-white dark:bg-gray-800 dark:text-white">
        <ul className="items-center hidden gap-4 sm:flex">

          <Link to="/"><li
            className="inline-block px-4 duration-200 hover:text-primary"
          >Home</li></Link>
          <Link to="/TopProducts">
            <li
              className="inline-block px-4 duration-200 hover:text-primary"
            >Top Rated</li>
          </Link>
          <Link to="/TopProducts">
            <li
              className="inline-block px-4 duration-200 hover:text-primary"
            >Kids Wear</li>
          </Link>
          <Link to="/TopProducts">
            <li
              className="inline-block px-4 duration-200 hover:text-primary"
            >Mens Wear</li>
          </Link>
          <Link to="/TopProducts">
            <li
              className="inline-block px-4 duration-200 hover:text-primary"
            >Electronics</li>
          </Link>

          {/* Dropdown Menu */}
          <li className="relative cursor-pointer group">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Trending Items
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white dark:bg-gray-800 p-2 text-black dark:text-white shadow-md">
              <ul>
                <Link to="/Products">
                  <li>Trending Books</li>
                </Link>
                <Link to="/Products">
                  <li>Best Selling</li>
                </Link>
                <Link to="/Products">
                  <li>Authors</li>
                </Link>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

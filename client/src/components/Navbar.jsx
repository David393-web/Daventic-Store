import React, { useState } from "react";
import { useSelector } from "react-redux";
import Logo from '../assets/Logo.png';
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi"; // Icons for hamburger and close button
import DarkMode from "../components/DarkMode"; // Assuming this is your DarkModeToggle component
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
    { name: "Home", link: "/" },
    { name: "Top Rated", link: "/Product" },
    { name: "Kids Wear", link: "/Product" },
    { name: "Mens Wear", link: "/Product" },
    { name: "Electronics", link: "/Product" },
];

const trendingItems = [
    { name: "Trending Books", link: "/Books" },
    { name: "Best Selling", link: "/Top-Rated" },
    { name: "Authors", link: "/Product" },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.items);
    const user = useSelector((state) => state.user.user);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative z-50 duration-200 bg-orange-200 shadow-md dark:bg-gray-900 dark:text-white">
            {/* Upper Navbar */}
            <div className="py-2 bg-primary/40">
                <div className="container flex items-center justify-between">
                    {/* Left - Logo */}
                    <div className="flex items-center font-sans font-bold">
                        <Link to="/" className="flex gap-2 text-2xl font-bold sm:text-3xl">
                            <img src={Logo} alt="Logo" className="w-10" />
                        </Link>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* Search bar - Hidden on mobile */}
                        <div className="relative hidden group sm:block">
                            <input
                                type="text"
                                placeholder="search"
                                className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-primary dark:border-gray-500 dark:bg-gray-800"
                            />
                            <IoMdSearch className="absolute text-gray-500 -translate-y-1/2 group-hover:text-primary top-1/2 right-3" />
                        </div>

                        {/* Conditional Buttons (Login/Post) */}
                        {user ? (
                            <Link to="/post">
                                <button className="px-4 py-2 text-sm font-medium text-white rounded-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary">
                                    Post
                                </button>
                            </Link>
                        ) : (
                            // Changed this Link to match the route definition in App.jsx
                            <Link to="/LoginVendor"> 
                                <button className="px-4 py-2 text-sm font-medium text-white rounded-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary">
                                    Login
                                </button>
                            </Link>
                        )}
                        
                        {/* Cart Icon with Count */}
                        <Link to="/Cart" className="relative cursor-pointer">
                            <FaCartShopping className="text-xl text-white" />
                            {cart && cart.length > 0 && ( // Added null check for cart
                                <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        {/* Dark Mode */}
                        {/* Ensure your DarkMode component is correctly handling the dark mode logic and props */}
                        <DarkMode /> 

                        {/* Hamburger Menu Icon */}
                        <button onClick={toggleMenu} className="text-2xl sm:hidden dark:text-white">
                            {isMenuOpen ? <HiX /> : <HiMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Lower Navbar (Desktop) */}
            <div className="justify-center hidden bg-white sm:flex dark:bg-gray-800 dark:text-white">
                <ul className="flex items-center gap-4">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link to={link.link} className="inline-block px-4 py-2 duration-200 hover:text-primary">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    {/* Dropdown */}
                    <li className="relative cursor-pointer group">
                        <span className="flex items-center gap-[2px] py-2">
                            Trending Items
                            <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                        </span>
                        <div className="absolute z-[9999] hidden group-hover:block w-[170px] rounded-md bg-white dark:bg-gray-800 p-2 shadow-md text-black dark:text-white">
                            <ul className="space-y-2">
                                {trendingItems.map((item) => (
                                    <li key={item.name}>
                                        <Link to={item.link} className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Mobile Pop-up Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-[40]">
                    <div className="relative w-3/4 h-full max-w-xs transition-transform duration-300 ease-in-out transform translate-x-0 bg-white dark:bg-gray-800">
                        <div className="flex justify-end p-4">
                            <button onClick={toggleMenu} className="text-2xl dark:text-white">
                                <HiX />
                            </button>
                        </div>
                        <ul className="flex flex-col items-start gap-4 p-4 text-lg">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link onClick={toggleMenu} to={link.link} className="inline-block w-full py-2 duration-200 hover:text-primary">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            {/* Dropdown */}
                            <li className="relative cursor-pointer group">
                                <span className="flex items-center gap-[2px] py-2">
                                    Trending Items
                                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                                </span>
                                <ul className="ml-4 space-y-2">
                                    {trendingItems.map((item) => (
                                        <li key={item.name}>
                                            <Link onClick={toggleMenu} to={item.link} className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {/* Conditional Login/Post Button for mobile */}
                            <li className="w-full mt-4">
                                {user ? (
                                    <Link to="/post" onClick={toggleMenu}>
                                        <button className="w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary">
                                            Post
                                        </button>
                                    </Link>
                                ) : (
                                    // Changed this Link to match the route definition in App.jsx
                                    <Link to="/LoginVendor" onClick={toggleMenu}>
                                        <button className="w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary">
                                            Login
                                        </button>
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
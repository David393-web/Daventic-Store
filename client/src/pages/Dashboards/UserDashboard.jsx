import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaBoxOpen, FaHeart } from "react-icons/fa";

const BuyerDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <motion.h1
        className="mb-6 text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Buyer Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* My Orders */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center p-6 bg-white shadow-md rounded-2xl"
        >
          <FaBoxOpen size={40} className="mb-3 text-blue-500" />
          <h2 className="text-lg font-semibold">My Orders</h2>
          <p className="text-gray-500">Track your purchases</p>
        </motion.div>

        {/* Wishlist */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center p-6 bg-white shadow-md rounded-2xl"
        >
          <FaHeart size={40} className="mb-3 text-pink-500" />
          <h2 className="text-lg font-semibold">Wishlist</h2>
          <p className="text-gray-500">Save items you love</p>
        </motion.div>

        {/* Cart */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center p-6 bg-white shadow-md rounded-2xl"
        >
          <FaShoppingCart size={40} className="mb-3 text-green-500" />
          <h2 className="text-lg font-semibold">Cart</h2>
          <p className="text-gray-500">View your shopping cart</p>
        </motion.div>
      </div>
    </div>
  );
};

export default BuyerDashboard;

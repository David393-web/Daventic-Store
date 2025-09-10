// src/pages/CartPage/CheckoutPage.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from "../../redux/slices/CartSlice"; // Ensure this path and slice exist
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Navbar and Footer directly, assuming they are in src/components/
import Navbar from '../../components/Navbar'; // Ensure this path is correct
import Footer from '../../components/Footer'; // Ensure this path is correct

const CheckoutPage = ({ toggleDarkMode, isDarkMode }) => { // Accept dark mode props
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!", { position: "top-right", autoClose: 3000 });
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      // In a real app:
      // 1. Send order details to backend
      // 2. Handle payment gateway response
      // 3. Clear cart ONLY on successful payment/order creation

      dispatch(clearCart()); // Clear cart after "successful" order
      setOrderConfirmed(true);
      setIsProcessing(false);
      toast.success("Order placed successfully!", { position: "top-right", autoClose: 3000 });
    }, 2000); // Simulate 2-second processing time
  };

  if (orderConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 dark:text-white">
        <ToastContainer />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg p-10 text-center bg-white rounded-lg shadow-xl dark:bg-gray-800"
        >
          <CheckCircle size={80} className="mx-auto mb-6 text-green-500" />
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Order Confirmed!</h1>
          <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">Thank you for your purchase. Your order has been placed successfully.</p>
          <Link to="/products" className="px-6 py-3 font-semibold text-white transition-colors duration-200 bg-blue-500 rounded-md hover:bg-blue-600">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} /> {/* Render Navbar */}
      <main className="container flex-grow px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <ToastContainer />
        <h1 className="mb-10 text-4xl font-bold text-center text-gray-900 dark:text-white">Checkout</h1>

        {cartItems.length === 0 && !orderConfirmed ? (
          <div className="p-8 text-center bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">Your cart is empty. Please add items before checking out.</p>
            <Link to="/products" className="px-6 py-3 font-semibold text-white transition-colors duration-200 bg-blue-500 rounded-md hover:bg-blue-600">
              Go to Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800 md:p-8 lg:grid-cols-3">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between pb-2 border-b dark:border-gray-700 last:border-b-0">
                    <div className="flex items-center">
                      <img src={item.product.image || `https://placehold.co/64x64/CCCCCC/white?text=${encodeURIComponent(item.product.name)}`} alt={item.product.name} className="object-cover w-16 h-16 mr-3 rounded-md" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/CCCCCC/white?text=${encodeURIComponent(item.product.name)}`; }} />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{item.product.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.quantity} x ${item.product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Payment & Shipping Details */}
            <div className="p-6 rounded-lg shadow-inner lg:col-span-1 bg-gray-50 dark:bg-gray-900">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Payment Details</h2>
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div>
                  <label htmlFor="cardName" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Name on Card</label>
                  <input type="text" id="cardName" placeholder="John Doe" className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                </div>
                <div>
                  <label htmlFor="cardNumber" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Card Number</label>
                  <input type="text" id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Expiry Date</label>
                    <input type="text" id="expiry" placeholder="MM/YY" className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">CVV</label>
                    <input type="text" id="cvv" placeholder="123" className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                  </div>
                </div>

                {/* Shipping Address (Simplified) */}
                <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-900 dark:text-white">Shipping Address</h3>
                <div>
                    <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                    <input type="text" id="address" placeholder="123 Main St" className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                        <input type="text" id="city" placeholder="Anytown" className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    </div>
                    <div>
                        <label htmlFor="zip" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Zip Code</label>
                        <input type="text" id="zip" placeholder="12345" className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-6 font-semibold text-white transition-colors duration-300 bg-orange-500 rounded-md hover:bg-orange-600"
                  disabled={isProcessing || cartItems.length === 0}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer /> {/* Render Footer */}
    </div>
  );
};

export default CheckoutPage;

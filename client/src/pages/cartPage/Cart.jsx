import React from 'react';
import { useSelector } from 'react-redux';
import CartProduct from '../cartPage/CartProduct';

const Cart = () => {
  const cart = useSelector(state => state.cart.items);

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto">
  <h1 className="mb-6 text-2xl font-bold text-gray-800">Shopping Cart</h1>

  <div className="flex flex-col-reverse gap-8 lg:flex-row ">
    {/* Left Section: Cart Items */}
    <div className="w-full space-y-6 lg:w-2/3">
      {cart.length > 0 ? (
        cart.map((p) => <CartProduct key={p.id} data={p} />)
      ) : (
        <p className="px-5 py-5 text-gray-500 rounded-md bg-slate-400">Your cart is empty.</p>
      )}
    </div>

    {/* Right Section: Summary */}
    <div className="w-full lg:w-1/3">
      <div className="sticky p-6 bg-white border shadow rounded-xl top-20">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Order Summary</h2>
        <div className="flex justify-between mb-2 text-gray-700">
          <span>Total Items</span>
          <span>{cart.length}</span>
        </div>
        <div className="flex justify-between mb-4 text-gray-700">
          <span>Total Price</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button
          className="w-full py-2 font-semibold text-white transition rounded-full bg-primary hover:bg-primary/90"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default Cart;

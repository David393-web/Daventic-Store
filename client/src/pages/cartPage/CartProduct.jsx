import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../../Redux/slices/CartSlice'; // ✅ Ensure this path is correct


const CartProduct = ({ data }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    if (data.quantity < 10) {
      dispatch(updateQuantity({ id: data.id, quantity: data.quantity + 1 }));
    }
  };

  const handleDecrease = () => {
    if (data.quantity > 1) {
      dispatch(updateQuantity({ id: data.id, quantity: data.quantity - 1 }));
    }
  };

  const handleRemove = () => {
    dispatch(removeItem(data.id));
  };

  return (
    <div className="flex items-center p-4 mb-4 border rounded shadow-sm">
      <img
        src={data.img}
        alt={data.name}
        className="w-[80px] h-[80px] object-cover rounded mr-4"
      />
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{data.title}</h2>
        <p className="text-gray-600">${data.price}</p>
        <div className="flex items-center gap-4 mt-2">
          <button 
            className="px-3 py-1 bg-gray-200 rounded" 
            onClick={handleDecrease}
          >
            -
          </button>
          <span>{data.quantity}</span>
          <button 
            className="px-3 py-1 bg-gray-200 rounded" 
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <button 
          onClick={handleRemove} 
          className="px-3 py-1 mt-2 text-red-500 transition border border-red-500 rounded hover:bg-red-500 hover:text-white"
        >
          🗑️ Remove
        </button>
      </div>
    </div>
  );
};

export default CartProduct;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/CartSlice";

const UserDashboardProducts = ({ isDarkMode }) => {
  const products = useSelector((state) => state.products.list);
  const dispatch = useDispatch();

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Browse Products</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className={`p-4 rounded shadow ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-40 rounded"
            />
            <h3 className="mt-2 font-bold">{product.name}</h3>
            <p className="text-sm">{product.description}</p>
            <p className="mt-2 font-semibold">${product.price}</p>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="px-4 py-2 mt-2 text-white bg-green-500 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboardProducts;

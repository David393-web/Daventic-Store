// src/pages/UserDashboards/UserDashboardCart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../redux/slices/cartSlice";


const UserDashboardCart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">My Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-md"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>
                    ${item.price} × {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between mt-6">
            <h3 className="text-xl font-bold">Total: ${totalPrice}</h3>
            <button
              onClick={() => {
                alert("Payment integration coming soon 🚀");
                dispatch(clearCart());
              }}
              className="px-6 py-2 text-white bg-green-600 rounded-lg"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardCart;

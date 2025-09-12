import React from "react";
import { useSelector } from "react-redux";

const UserDashboardOrders = ({ isDarkMode }) => {
  const orders = useSelector((state) => state.orders.list);

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`p-4 rounded shadow ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <h3 className="font-bold">Order #{order.id}</h3>
              <p>Date: {order.date}</p>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <ul className="mt-2 ml-6 list-disc">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.product.name} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboardOrders;

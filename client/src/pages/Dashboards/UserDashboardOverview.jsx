import React from "react";
import { useSelector } from "react-redux";

const UserDashboardOverview = ({ isDarkMode }) => {
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.orders.list);

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Overview</h2>
      <p>Welcome back, {user?.username || "User"}!</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-4 text-white bg-blue-500 rounded shadow">
          <h3 className="text-lg">Cart Items</h3>
          <p className="text-2xl font-bold">{cart.length}</p>
        </div>
        <div className="p-4 text-white bg-green-500 rounded shadow">
          <h3 className="text-lg">Orders</h3>
          <p className="text-2xl font-bold">{orders.length}</p>
        </div>
        <div className="p-4 text-white bg-purple-500 rounded shadow">
          <h3 className="text-lg">Total Spent</h3>
          <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
        </div>
      </div>
      <p className="mt-6">Welcome back, {user?.username || "User"} 👋</p>
    </div>
  );
};

export default UserDashboardOverview;







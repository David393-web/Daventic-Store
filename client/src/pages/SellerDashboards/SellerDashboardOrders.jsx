// src/components/Dashboards/SellerDashboardOrders.jsx
import React from 'react';
import { ShoppingCart, PackageCheck, Truck } from 'lucide-react';

const SellerDashboardOrders = ({ isDarkMode }) => {
  const orders = [
    { id: 'ORD001', customer: 'John Doe', total: 70.00, status: 'Pending', items: ['Handmade Clay Mug (x2)', 'Knitted Scarf (x1)'] },
    { id: 'ORD002', customer: 'Jane Smith', total: 12.00, status: 'Shipped', items: ['Organic Lavender Soap (x1)'] },
    { id: 'ORD003', customer: 'Bob Johnson', total: 25.00, status: 'Delivered', items: ['Handmade Clay Mug (x1)'] },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-200';
      case 'Shipped': return 'text-blue-600 bg-blue-100 dark:bg-blue-800 dark:text-blue-200';
      case 'Delivered': return 'text-green-600 bg-green-100 dark:bg-green-800 dark:text-green-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <ShoppingCart className="w-4 h-4 mr-2" />;
      case 'Shipped': return <Truck className="w-4 h-4 mr-2" />;
      case 'Delivered': return <PackageCheck className="w-4 h-4 mr-2" />;
      default: return null;
    }
  };

  return (
    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
      <h2 className="flex items-center mb-4 text-2xl font-semibold">
        <ShoppingCart className="w-6 h-6 mr-2" />
        My Orders
      </h2>
      {orders.length === 0 ? (
        <p className="py-8 text-lg text-center">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Order ID</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Customer</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Items</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Total</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ul className="list-disc list-inside">
                      {order.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}{order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SellerDashboardOrders;

// src/components/Dashboards/SellerDashboardOverview.jsx
import React from 'react';
import { LayoutDashboard } from 'lucide-react';

const SellerDashboardOverview = ({ isDarkMode }) => {
  return (
    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
      <h2 className="flex items-center mb-4 text-2xl font-semibold">
        <LayoutDashboard className="w-6 h-6 mr-2" />
        Dashboard Overview
      </h2>
      <p className="text-lg">Welcome to your seller dashboard! Here you can see a summary of your sales, products, and orders.</p>
      {/* Add charts, statistics, recent orders/products here */}
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
        <div className={`p-4 rounded-md shadow-sm ${isDarkMode ? 'bg-gray-700' : 'bg-blue-100 text-blue-800'}`}>
          <h3 className="mb-2 text-xl font-medium">Total Products</h3>
          <p className="text-3xl font-bold">120</p>
        </div>
        <div className={`p-4 rounded-md shadow-sm ${isDarkMode ? 'bg-gray-700' : 'bg-green-100 text-green-800'}`}>
          <h3 className="mb-2 text-xl font-medium">Pending Orders</h3>
          <p className="text-3xl font-bold">5</p>
        </div>
        <div className={`p-4 rounded-md shadow-sm ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-100 text-yellow-800'}`}>
          <h3 className="mb-2 text-xl font-medium">Total Sales</h3>
          <p className="text-3xl font-bold">$12,345</p>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardOverview;

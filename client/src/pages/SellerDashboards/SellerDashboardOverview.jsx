// src/components/Dashboards/SellerDashboardOverview.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { LayoutDashboard } from 'lucide-react';
import SellerDashboardAnalytics from '../../pages/SellerDashboards/SellerDashboardAnalytics';
import { createSelector } from 'reselect';
import { selectMonthlySales } from '../../redux/slices/orderSlice';

// --- Base selectors ---
const selectProducts = (state) => state.products.list || [];
const selectOrders = (state) => state.order?.orders || [];

// --- Memoized derived selectors ---
const selectTotalProducts = createSelector(
  [selectProducts],
  (products) => products.length
);

const selectPendingOrders = createSelector(
  [selectOrders],
  (orders) => orders.filter(order => order.status === 'pending').length
);

const selectTotalSales = createSelector(
  [selectOrders],
  (orders) =>
    orders
      .filter(order => order.status === 'completed')
      .reduce((acc, order) => acc + order.totalAmount, 0)
);

// --- Component ---
const SellerDashboardOverview = ({ isDarkMode }) => {
  const totalProducts = useSelector(selectTotalProducts);
  const pendingOrders = useSelector(selectPendingOrders);
  const totalSales = useSelector(selectTotalSales);
  const monthlySales = useSelector(selectMonthlySales); // pass this to analytics

  return (
    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
      <h2 className="flex items-center mb-4 text-2xl font-semibold">
        <LayoutDashboard className="w-6 h-6 mr-2" />
        Dashboard Overview
      </h2>

      <p className="text-lg">Welcome to your seller dashboard! Below is a summary of your sales, products, and orders.</p>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
        <div className={`p-4 rounded-md shadow-sm ${isDarkMode ? 'bg-gray-700' : 'bg-blue-100 text-blue-800'}`}>
          <h3 className="mb-2 text-xl font-medium">Total Products</h3>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </div>
        <div className={`p-4 rounded-md shadow-sm ${isDarkMode ? 'bg-gray-700' : 'bg-green-100 text-green-800'}`}>
          <h3 className="mb-2 text-xl font-medium">Pending Orders</h3>
          <p className="text-3xl font-bold">{pendingOrders}</p>
        </div>
        <div className={`p-4 rounded-md shadow-sm ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-100 text-yellow-800'}`}>
          <h3 className="mb-2 text-xl font-medium">Total Sales</h3>
          <p className="text-3xl font-bold">${totalSales.toLocaleString()}</p>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="mt-8">
        <SellerDashboardAnalytics isDarkMode={isDarkMode} monthlySales={monthlySales} />
      </div>
    </div>
  );
};

export default SellerDashboardOverview;

// src/pages/SellerDashboards/SellerDashboardAnalytics.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const SellerDashboardAnalytics = ({ monthlySales = [], isDarkMode }) => {
  return (
    <div
      className={`shadow rounded p-6 ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Sales Analytics</h2>
      {monthlySales.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={monthlySales}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDarkMode ? "#555" : "#ccc"}
            />
            <XAxis dataKey="month" stroke={isDarkMode ? "#eee" : "#333"} />
            <YAxis stroke={isDarkMode ? "#eee" : "#333"} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#1f2937" : "#fff",
                borderColor: isDarkMode ? "#555" : "#ccc",
                color: isDarkMode ? "#fff" : "#000",
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4F46E5"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>No sales data available yet.</p>
      )}
    </div>
  );
};

export default SellerDashboardAnalytics;

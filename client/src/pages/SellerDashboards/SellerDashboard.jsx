// src/pages/Dashboards/SellerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Global Layout Components
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// ✅ Dashboard Sub-Components (Imported from new src/pages/SellerDashboards)
// IMPORTANT: For these imports to work, you must physically move these component files
// from `src/components/Dashboards/` to `src/pages/SellerDashboards/`
import SellerDashboardSidebar from '../../pages/SellerDashboards/SellerDashboardSidebar';
import SellerHeader from '../../pages/SellerDashboards/SellerHeader';
import SellerDashboardOverview from '../../pages/SellerDashboards/SellerDashboardOverview';
import SellerDashboardProducts from '../../pages/SellerDashboards/SellerDashboardProducts';
import SellerDashboardOrders from '../../pages/SellerDashboards/SellerDashboardOrders';
import SellerDashboardSettings from '../../pages/SellerDashboards/SellerDashboardSettings';
import SellerDashboardProfile from '../../pages/SellerDashboards/SellerDashboardProfile';

// Assume ProductForm is in the same directory (src/pages/Dashboards)
import ProductForm from '../../pages/ProductPage/ProductForm';

// Assuming NotFoundPage is defined elsewhere and correctly imported.
import NotFoundPage from '../NotFoundPage';


// Main SellerDashboard Component
const SellerDashboard = ({ toggleDarkMode, isDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // ✅ Fixed Redux selector warning: select values individually
  const user = useSelector((state) => state.auth?.user);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const rehydrated = useSelector((state) => state._persist?.rehydrated);

  // Determine the active path for sidebar highlighting
  const pathSegments = location.pathname.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];
  const activePath = lastSegment === 'dashboard' || lastSegment === '' ? 'overview' : lastSegment;

  useEffect(() => {
    // Only perform redirect logic AFTER Redux Persist has rehydrated
    if (rehydrated) {
      if (!isAuthenticated) {
        toast.error("You need to log in to access the seller dashboard.", { position: "top-right", autoClose: 3000 });
        navigate('/seller-login', { replace: true });
      } else if (user?.accountType !== 'seller') {
        toast.error("Access Denied: You are not authorized as a seller.", { position: "top-right", autoClose: 3000 });
        navigate('/', { replace: true }); // Redirect to homepage or buyer dashboard
      }
    }
  }, [isAuthenticated, user, navigate, rehydrated, dispatch]);

  // Loading state while Redux Persist is rehydrating
  if (!rehydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        <p>Loading authentication status...</p>
      </div>
    );
  }

  // After rehydration, if not authenticated or not a seller, show redirecting and the useEffect will handle it
  if (!isAuthenticated || user?.accountType !== 'seller') {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        <p>Access Denied. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col lg:flex-row min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <ToastContainer />
      {/* Sidebar */}
      <SellerDashboardSidebar isDarkMode={isDarkMode} activePath={activePath} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {/* Seller Header */}
        <SellerHeader isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <div className="p-4 lg:p-8">
          <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <Routes>
              {/* Nested Routes for Dashboard Sections */}
              <Route path="/" element={<SellerDashboardOverview isDarkMode={isDarkMode} />} />
              <Route path="overview" element={<SellerDashboardOverview isDarkMode={isDarkMode} />} />
              <Route path="products" element={<SellerDashboardProducts isDarkMode={isDarkMode} />} />
              <Route path="orders" element={<SellerDashboardOrders isDarkMode={isDarkMode} />} />
              <Route path="settings" element={<SellerDashboardSettings isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
              <Route path="profile" element={<SellerDashboardProfile isDarkMode={isDarkMode} />} />
              <Route path="add-product" element={<ProductForm isDarkMode={isDarkMode} action="add" />} />
              <Route path="products/edit/:productId" element={<ProductForm isDarkMode={isDarkMode} action="edit" />} />

              {/* Catch-all for unknown dashboard paths */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
        <Footer isDarkMode={isDarkMode} />
      </main>
    </div>
  );
};

export default SellerDashboard;

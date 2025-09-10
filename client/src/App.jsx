// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useDispatch, useSelector, Provider } from 'react-redux';
// Redux import paths
import { initializeSession } from './redux/slices/authSlice'; // Corrected path
import { store, persistor } from './Redux/Store'; // Corrected path
import { PersistGate } from 'redux-persist/integration/react';

// Layouts import paths
import AuthLayout from './layouts/AuthLayout';

// Pages and Component import paths (assuming these exist and are in correct locations)
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import ProductListingPage from './pages/ProductPage/ProductListingPage';
import ProductDetailPage from './pages/ProductPage/ProductDetailPage';
import CartPage from './pages/CartPage/Cart';
import CheckoutPage from './pages/CartPage/CheckoutPage';

// Auth Pages
import LoadingScreen from './layouts/LoadingScreen'; // ✅ LoadingScreen import
import RoleSelectionPage from './pages/Auth/RoleSelectionPage'; // ✅ RoleSelectionPage import
import BuyerLoginPage from './pages/Auth/LoginPage';
import SellerLoginPage from './pages/Auth/SellerLoginPage';
import BuyerSignupPage from './pages/Auth/SignupPage';
import SellerSignupPage from './pages/Auth/SellerSignupPage';
import WelcomePage from './components/userAuth/WelcomePage'; // ✅ WelcomePage import
import ForgotPasswordPage from './components/userAuth/ForgotPassword'; // Assuming you have this
import ResetPasswordPage from './components/userAuth/ResetPasswordPage'; // Assuming you have this
import Verifyotp from './components/userAuth/Verifyotp'

// Dashboards (assuming they are in src/pages/Dashboards/)
import SellerDashboard from './pages/SellerDashboards/SellerDashboard';
import UserDashboard from './pages/Dashboards/UserDashboard'; // This is your Buyer Dashboard

import NotFoundPage from './pages/NotFoundPage';


const AppContent = () => {
  const dispatch = useDispatch();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('theme');
    return savedMode === 'dark' ? true : false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    dispatch(initializeSession());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Root path directs to RoleSelectionPage as the first step */}
        <Route path="/" element={<LoadingScreen />} />
        <Route path="/RoleSelectionPage" element={<RoleSelectionPage />} />


        {/* Product and Cart Pages */}
        <Route path="/products" element={<ProductListingPage toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
        <Route path="/products/:productId" element={<ProductDetailPage toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
        <Route path="/cart" element={<CartPage toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
        <Route path="/checkout" element={<CheckoutPage toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />

        {/* AUTHENTICATION PAGES */}
        <Route path="/login" element={<AuthLayout toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}><BuyerLoginPage /></AuthLayout>} />
        <Route path="/seller-login" element={<AuthLayout toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}><SellerLoginPage /></AuthLayout>} />
        <Route path="/signup" element={<AuthLayout toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}><BuyerSignupPage /></AuthLayout>} />
        <Route path="/seller-signup" element={<AuthLayout toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}><SellerSignupPage /></AuthLayout>} />

        <Route path="/forgot-password" element={<AuthLayout toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}><ForgotPasswordPage /></AuthLayout>} />
        <Route path="/reset-password" element={<AuthLayout toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}><ResetPasswordPage /></AuthLayout>} />
        <Route path="/verify-otp" element={<AuthLayout toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}><Verifyotp /></AuthLayout>} />
        {/* ✅ Welcome Page Route - AFTER LOGIN */}
        <Route path="/welcomepage" element={<WelcomePage />} />

        {/* DASHBOARDS - Protected by logic within the component itself */}
        <Route path="/seller/dashboard/*" element={<SellerDashboard toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
        <Route path="/User/dashboard" element={<UserDashboard toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />

        {/* The "/post" link from Navbar now directs to the seller dashboard add product section */}
        {/* Note: If /post is outside seller dashboard, it might need additional auth/redirect logic */}
        <Route path="/post" element={<SellerDashboard toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />

        {/* Catch-all for 404 Not Found */}
        <Route path="*" element={<NotFoundPage toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;

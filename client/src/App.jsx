// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, Provider } from "react-redux";
import { initializeSession } from "./redux/slices/authSlice";
import { store, persistor } from "./redux/Store.js";
import { PersistGate } from "redux-persist/integration/react";
import PrivateRoute from "./components/PrivateRoute";

// Layouts
import AuthLayout from "./layouts/AuthLayout";

// Shared Components
import NotFoundPage from "./pages/NotFoundPage";
import LoadingScreen from "./layouts/LoadingScreen";

// Auth Pages
import RoleSelectionPage from "./pages/Auth/RoleSelectionPage";
import BuyerLoginPage from "./pages/Auth/LoginPage";
import SellerLoginPage from "./pages/Auth/SellerLoginPage";
import BuyerSignupPage from "./pages/Auth/SignupPage";
import SellerSignupPage from "./pages/Auth/SellerSignupPage";
import WelcomePage from "./components/userAuth/WelcomePage";
import ForgotPasswordPage from "./components/userAuth/ForgotPassword";
import ResetPasswordPage from "./components/userAuth/ResetPasswordPage";
import Verifyotp from "./components/userAuth/Verifyotp";

// Product Pages
import ProductListingPage from "./pages/ProductPage/ProductListingPage";
import ProductDetailPage from "./pages/ProductPage/ProductDetailPage";
import CartPage from "./pages/CartPage/Cart";
import CheckoutPage from "./pages/CartPage/CheckoutPage";
import ProductForm from "./pages/ProductPage/ProductForm";

// Dashboards
import SellerDashboard from "./pages/SellerDashboards/SellerDashboard";
import UserDashboard from "./pages/Dashboards/UserDashboard";
import SellerDashboardOverview from "./pages/SellerDashboards/SellerDashboardOverview";
import SellerDashboardProducts from "./pages/SellerDashboards/SellerDashboardProducts";
import SellerDashboardOrders from "./pages/SellerDashboards/SellerDashboardOrders";
import SellerDashboardProfile from "./pages/SellerDashboards/SellerDashboardProfile";
import SellerDashboardSettings from "./pages/SellerDashboards/SellerDashboardSettings";

const AppContent = () => {
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("theme");
    return savedMode === "dark";
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  useEffect(() => {
    dispatch(initializeSession());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Root + Auth */}
        <Route path="/" element={<LoadingScreen />} />
        <Route path="/RoleSelectionPage" element={<RoleSelectionPage />} />
        <Route path="/login" element={<AuthLayout><BuyerLoginPage /></AuthLayout>} />
        <Route path="/seller-login" element={<AuthLayout><SellerLoginPage /></AuthLayout>} />
        <Route path="/signup" element={<AuthLayout><BuyerSignupPage /></AuthLayout>} />
        <Route path="/seller-signup" element={<AuthLayout><SellerSignupPage /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />
        <Route path="/reset-password" element={<AuthLayout><ResetPasswordPage /></AuthLayout>} />
        <Route path="/verify-otp" element={<AuthLayout><Verifyotp /></AuthLayout>} />
        <Route path="/welcomepage" element={<WelcomePage />} />

        {/* Products + Cart */}
        <Route path="/products" element={<ProductListingPage toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
        <Route path="/products/:productId" element={<ProductDetailPage toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
        <Route path="/cart" element={<CartPage toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
        <Route path="/checkout" element={<CheckoutPage toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />

        {/* Seller Dashboard (Protected + Nested) */}
        <Route
          path="/seller/dashboard"
          element={
            <PrivateRoute>
              <SellerDashboard toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
            </PrivateRoute>
          }
        >
          <Route index element={<SellerDashboardOverview toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
          <Route path="overview" element={<SellerDashboardOverview toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
          <Route path="products" element={<SellerDashboardProducts toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
          <Route path="products/edit/:productId" element={<ProductForm toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} action="edit" />} />
          <Route path="add-product" element={<ProductForm toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} action="add" />} />
          <Route path="orders" element={<SellerDashboardOrders toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
          <Route path="profile" element={<SellerDashboardProfile toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
          <Route path="settings" element={<SellerDashboardSettings toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
        </Route>

        {/* User Dashboard (Buyer) */}
        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute>
              <UserDashboard toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
            </PrivateRoute>
          }
        />

        {/* Shortcut: /post → seller add product */}
        <Route path="/post" element={<ProductForm toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} action="add" />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppContent />
    </PersistGate>
  </Provider>
);

export default App;

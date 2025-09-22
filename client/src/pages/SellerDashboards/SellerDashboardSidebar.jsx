// src/components/Dashboards/SellerDashboardSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  User,
  PlusCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const SellerDashboardSidebar = ({ isDarkMode }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.info("Logged out successfully.");
  };

  const navItems = [
    { name: "Overview", icon: LayoutDashboard, path: "overview" },
    { name: "Products", icon: Package, path: "products" },
    { name: "Orders", icon: ShoppingCart, path: "orders" },
    { name: "Add Product", icon: PlusCircle, path: "add-product" },
    { name: "Profile", icon: User, path: "profile" },
    { name: "Settings", icon: Settings, path: "settings" },
  ];

  const commonClasses = `flex items-center p-3 rounded-lg transition-colors duration-200`;
  const activeClasses = `bg-blue-700 text-white shadow-lg`;
  const inactiveClasses = `${
    isDarkMode
      ? "text-gray-300 hover:bg-gray-700"
      : "text-gray-700 hover:bg-gray-200"
  }`;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md shadow-lg ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 p-4 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:relative
        ${isDarkMode ? "bg-gray-800 border-r border-gray-700" : "bg-white border-r border-gray-200"}`}
      >
        <div className="flex flex-col h-full">
          {/* Dashboard Title */}
          <div className="mt-4 mb-8 text-center">
            <h2 className="text-2xl font-bold">Seller Panel</h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path} // relative path for nested routing
                className={({ isActive }) =>
                  `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`
                }
                onClick={() => setIsOpen(false)} // close on mobile after click
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <div className="pt-6 mt-auto border-t border-gray-700">
            <button
              onClick={handleLogout}
              className={`${commonClasses} w-full bg-red-600 hover:bg-red-700 text-white`}
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SellerDashboardSidebar;

// src/components/Dashboards/SellerDashboardSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
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
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice'; // Assuming you have a logout action
import { toast } from 'react-toastify';

const SellerDashboardSidebar = ({ isDarkMode, activePath }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false); // State for mobile sidebar visibility

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.info("Logged out successfully.");
    // Optionally redirect to home or login page after logout
  };

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/seller/dashboard/overview' },
    { name: 'Products', icon: Package, path: '/seller/dashboard/products' },
    { name: 'Orders', icon: ShoppingCart, path: '/seller/dashboard/orders' },
    { name: 'Add Product', icon: PlusCircle, path: '/seller/dashboard/add-product' },
    { name: 'Profile', icon: User, path: '/seller/dashboard/profile' },
    { name: 'Settings', icon: Settings, path: '/seller/dashboard/settings' },
  ];

  const commonClasses = `flex items-center p-3 rounded-lg transition-colors duration-200`;
  const activeClasses = `bg-orange-600 text-white shadow-lg`;
  const inactiveClasses = `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
          ${isDarkMode ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-gray-200'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Dashboard Title/Logo */}
          <div className="mt-4 mb-8 text-center">
            <h2 className="text-2xl font-bold">Seller Panel</h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`
                }
                onClick={() => setIsOpen(false)} // Close sidebar on click in mobile
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Logout Button */}
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

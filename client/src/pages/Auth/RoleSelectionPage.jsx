// src/pages/Auth/RoleSelectionPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Assuming logo path

const RoleSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null); // 'buyer' or 'seller'

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleNext = () => {
    if (selectedRole === 'buyer') {
      navigate('/signup'); // Navigate to generic signup for buyers
    } else if (selectedRole === 'seller') {
      navigate('/seller-signup'); // Navigate to specific seller signup
    }
    // The button is disabled if no role is selected, so no need for an else branch here.
  };

  return (
    // Main container: full screen height, bright white background, Inter font
    // Centered content using flexbox
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 font-inter p-4">
      {/* Logo - positioned absolutely at top-left for brand presence */}

      {/* Main Content Card Wrapper - this holds everything, matching the overall white card in the image */}
      <div
        className="w-full max-w-2xl bg-white p-8 sm:p-10 rounded-xl shadow-lg border border-gray-100 text-center" // Slightly lighter border
      >
        {/* Header Section */}
        <div className="mb-8 text-left"> {/* Align text left as in the image */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1"> {/* Tighter spacing */}
            Select User Type
          </h1>
          <p className="text-gray-600 text-base"> {/* Slightly smaller font */}
            You can change your account at any time
          </p>
        </div>

        {/* Role Selection Cards Container */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
          {/* Personal (Buyer) Card */}
          <div
            className={`flex flex-col items-center p-6 border rounded-xl cursor-pointer transition-colors duration-200 ease-in-out w-full sm:w-1/2
                        ${selectedRole === 'buyer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            onClick={() => handleRoleSelect('buyer')}
            role="button" // Indicate it's an interactive element for accessibility
            aria-pressed={selectedRole === 'buyer'} // ARIA attribute for selection state
          >
            {/* Icon for Personal - exactly as in the image */}
            <svg className={`w-20 h-20 mb-4 ${selectedRole === 'buyer' ? 'text-blue-600' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 11a4 4 0 100-8 4 4 0 000 8zm-2 9h4c.552 0 1-.448 1-1v-2c0-.552-.448-1-1-1h-4c-.552 0-1 .448-1 1v2c0 .552.448 1 1 1z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 11a4 4 0 100-8 4 4 0 000 8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 20h4c.552 0 1-.448 1-1v-2c0-.552-.448-1-1-1h-4c-.552 0-1 .448-1 1v2c0 .552.448 1 1 1z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="12" x2="12" y2="18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">USER</h3>
            <p className="text-sm text-gray-500 px-2"> {/* Added padding to text */}
              Discover unique artisan products
            </p>
          </div>

          {/* Business (Seller) Card */}
          <div
            className={`flex flex-col items-center p-6 border rounded-xl cursor-pointer transition-colors duration-200 ease-in-out w-full sm:w-1/2
                        ${selectedRole === 'seller' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            onClick={() => handleRoleSelect('seller')}
            role="button" // Indicate it's an interactive element for accessibility
            aria-pressed={selectedRole === 'seller'} // ARIA attribute for selection state
          >
            {/* Icon for Business - exactly as in the image */}
            <svg className={`w-20 h-20 mb-4 ${selectedRole === 'seller' ? 'text-blue-600' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 11a4 4 0 100-8 4 4 0 000 8zm-6 9c0-2.206 1.794-4 4-4h4c2.206 0 4 1.794 4 4v2H6v-2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 11a4 4 0 100-8 4 4 0 000 8zm-2 9h4c.552 0 1-.448 1-1v-2c0-.552-.448-1-1-1h-4c-.552 0-1 .448-1 1v2c0 .552.448 1 1 1z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 11a4 4 0 100-8 4 4 0 000 8zm-2 9h4c.552 0 1-.448 1-1v-2c0-.552-.448-1-1-1H4c-.552 0-1 .448-1 1v2c0 .552.448 1 1 1z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">SELER</h3>
            <p className="text-sm text-gray-500 px-2"> {/* Added padding to text */}
              Showcase and sell your handmade goods
            </p>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={selectedRole === null} // Disable if no role is selected
          className="w-full sm:w-auto px-10 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RoleSelectionPage;

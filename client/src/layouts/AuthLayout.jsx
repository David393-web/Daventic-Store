import React from 'react';

/**
 * AuthLayout component for authentication pages (Login, Signup, etc.).
 * It provides a minimal layout, typically centering the content.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be rendered within the layout (e.g., your login/signup forms).
 * @param {function} props.toggleDarkMode - Function to toggle dark mode (can be passed down if auth forms have DarkModeToggle).
 * @param {boolean} props.isDarkMode - Current dark mode status.
 */
const AuthLayout = ({ children, toggleDarkMode, isDarkMode }) => {
  return (
    <div className="flex flex-col min-h-screen text-gray-900 transition-colors duration-300 bg-gray-100 dark:bg-gray-950 dark:text-white">
      {/* Main content area for auth pages, typically centered */}
      <main className="flex items-center justify-center flex-grow">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;

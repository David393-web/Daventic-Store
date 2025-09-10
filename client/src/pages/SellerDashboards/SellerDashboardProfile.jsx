// src/components/Dashboards/SellerDashboardProfile.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { User, Mail, Phone, Store, Tag, Save, Edit } from 'lucide-react';
import { fetchUserProfile, updateUser } from '../../utils/authApi'; // Import API functions
import { loginUser as reduxLoginUser } from '../../redux/slices/authSlice'; // To update Redux state after profile update

const SellerDashboardProfile = ({ isDarkMode }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth); // Get user and token from Redux state

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    storeName: '',
    craftCategories: [], // Expecting an array
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When user data is available in Redux, populate form
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        storeName: user.storeName || '',
        // Ensure craftCategories is an array, even if empty
        craftCategories: Array.isArray(user.craftCategories) ? user.craftCategories : [],
      });
    }
  }, [user]);

  // Function to fetch full user profile on component mount (if needed, or assume Redux has it)
  // This is a fallback/refresh mechanism.
  const loadUserProfile = async () => {
    if (!token) {
      toast.error("Authentication token is missing. Please log in again.");
      return;
    }
    setLoading(true);
    try {
      const fetchedUser = await fetchUserProfile(token);
      setFormData({
        username: fetchedUser.data.username || '',
        email: fetchedUser.data.email || '',
        phoneNumber: fetchedUser.data.phoneNumber || '',
        storeName: fetchedUser.data.storeName || '',
        craftCategories: Array.isArray(fetchedUser.data.craftCategories) ? fetchedUser.data.craftCategories : [],
      });
      // Optionally update Redux state with fresh data
      dispatch(reduxLoginUser({ ...fetchedUser.data, token: token }));
      toast.success("Profile refreshed!");
    } catch (error) {
      toast.error(error.message || "Failed to load profile data.");
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load profile on component mount if user data in Redux is incomplete
  useEffect(() => {
    if (user && !user.phoneNumber) { // Example: if phoneNumber is missing, fetch full profile
      loadUserProfile();
    }
  }, [user, token]); // Dependencies for this effect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCraftCategoriesChange = (e) => {
    const { value } = e.target;
    // Assuming a single-select dropdown, so we convert to array of one item
    setFormData((prev) => ({ ...prev, craftCategories: [value] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!token) {
        toast.error("Authentication token missing. Please log in.");
        setLoading(false);
        return;
      }

      const updatedData = {
        username: formData.username,
        // Email is typically not updated via profile page, but through verification
        // email: formData.email,
        phoneNumber: formData.phoneNumber,
        storeName: formData.storeName,
        craftCategories: formData.craftCategories,
      };

      const response = await updateUser(token, updatedData); // Call your update API
      
      // Update Redux state with the new user data
      dispatch(reduxLoginUser({ ...response.data, token: token })); // Merge with current token
      
      toast.success("Profile updated successfully!");
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      toast.error(error.message || "Failed to update profile.");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Craft categories list (re-using from signup page)
  const craftCategoriesList = [
    "Art & Sculptures", "Beauty and Wellness", "Books and Poetry",
    "Fashion Clothing and Fabrics", "Jewelry and Gemstones", "Vintage and Antique Jewelry",
    "Home Décor and Accessories", "Vintage Stocks", "Plant and Seeds",
    "Spices, Condiments and Seasonings", "Local & Traditional Foods",
    "Traditional and Religious Items", "Local Food and Drink Products",
  ];

  return (
    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
      <h2 className="flex items-center justify-between mb-6 text-2xl font-semibold">
        <span className="flex items-center"><User className="w-6 h-6 mr-2" /> My Profile</span>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <Edit className="w-4 h-4 mr-2" /> Edit Profile
          </button>
        )}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block mb-1 text-sm font-medium">Username</label>
          <div className={`flex items-center border rounded-md p-2 ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
            <User className={`w-5 h-5 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
                required
              />
            ) : (
              <span>{formData.username}</span>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <div className={`flex items-center border rounded-md p-2 ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
            <Mail className={`w-5 h-5 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            {/* Email is typically read-only or updated via a separate verification flow */}
            <span>{formData.email}</span>
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 text-sm font-medium">Phone Number</label>
          <div className={`flex items-center border rounded-md p-2 ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
            <Phone className={`w-5 h-5 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            {isEditing ? (
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              />
            ) : (
              <span>{formData.phoneNumber || 'N/A'}</span>
            )}
          </div>
        </div>

        {/* Store Name (Seller Specific) */}
        <div>
          <label className="block mb-1 text-sm font-medium">Store Name</label>
          <div className={`flex items-center border rounded-md p-2 ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
            <Store className={`w-5 h-5 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            {isEditing ? (
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
                required
              />
            ) : (
              <span>{formData.storeName || 'N/A'}</span>
            )}
          </div>
        </div>

        {/* Craft Categories (Seller Specific) */}
        <div>
          <label className="block mb-1 text-sm font-medium">Craft Categories</label>
          <div className={`flex items-center border rounded-md p-2 ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
            <Tag className={`w-5 h-5 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            {isEditing ? (
              <select
                name="craftCategories"
                value={formData.craftCategories[0] || ''} // Select first item for single select
                onChange={handleCraftCategoriesChange}
                className="w-full bg-transparent outline-none"
                required
              >
                <option value="">Select a category</option>
                {craftCategoriesList.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            ) : (
              <span>{formData.craftCategories.join(', ') || 'N/A'}</span>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2 text-gray-700 transition-colors duration-200 border border-gray-300 rounded-md dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center px-5 py-2 text-white transition-colors duration-200 bg-orange-600 rounded-md hover:bg-orange-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" /> Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SellerDashboardProfile;

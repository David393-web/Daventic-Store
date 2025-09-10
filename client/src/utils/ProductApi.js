// src/utils/productApi.js
import axios from "axios"; // Ensure axios is imported

// Define your backend API base URL here.
// This should be the root of your API, without specific endpoints like /products.
// It must match your server.js base route (e.g., http://localhost:5000/api/v1)
const API_BASE_URL = "https://mbayy-be.onrender.com/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json", // Default content type, can be overridden
  },
});

// Utility function for consistent error handling
const handleError = (error, defaultMsg) => {
  console.error(defaultMsg, error.response?.data || error.message || error);
  // Throw a more user-friendly message for the frontend, preferably from backend response
  throw new Error(error.response?.data?.message || defaultMsg);
};

/**
 * Creates a new product on the backend (used by seller dashboard for 'Add Product').
 * Correlates with backend: POST /api/v1/products or /api/v1/products/upload
 * Assumes backend handles multipart/form-data for image uploads.
 * @param {string} token - The authentication token.
 * @param {object | FormData} productData - The product data, can be a plain object or FormData for files.
 * @returns {Promise<object>} - Backend response data (e.g., new product details).
 */
export const createProduct = async (token, productData) => {
  try {
    // Determine content type based on data type (for FormData/files)
    const contentType = productData instanceof FormData ? 'multipart/form-data' : 'application/json';

    const response = await api.post("/products/upload", productData, { // Assuming /products/upload for specific upload
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleError(error, "Failed to create product");
  }
};

/**
 * Fetches all products uploaded by the authenticated seller.
 * Correlates with backend: GET /api/v1/products/seller or /api/v1/seller-products
 * @param {string} token - The authentication token.
 * @returns {Promise<Array<object>>} - Array of product objects.
 */
export const fetchSellerProducts = async (token) => {
  try {
    const response = await api.get("/products/seller", { // Assuming this endpoint for seller's products
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.products; // Assuming backend sends { products: [...] }
  } catch (error) {
    throw handleError(error, "Failed to fetch seller's products");
  }
};

/**
 * Fetches a single product by its ID (can be used for public view or seller's edit).
 * Correlates with backend: GET /api/v1/products/:productId
 * @param {string} productId - The ID of the product.
 * @returns {Promise<object>} - Single product object.
 */
export const getProductById = async (productId) => { // Renamed from getVendorProductById
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data.product; // Assuming backend sends { product: {} }
  } catch (error) {
    throw handleError(error, "Failed to fetch product details");
  }
};

/**
 * Updates an existing product on the backend.
 * Correlates with backend: PUT /api/v1/products/:productId or PATCH /api/v1/products/:productId
 * @param {string} token - The authentication token.
 * @param {string} productId - The ID of the product to update.
 * @param {object | FormData} productData - The updated product data (can be plain object or FormData).
 * @returns {Promise<object>} - Updated product object.
 */
export const updateProduct = async (token, productId, productData) => { // Renamed from updateVendorProduct
  try {
    const contentType = productData instanceof FormData ? 'multipart/form-data' : 'application/json';

    // Using PUT for full resource replacement, PATCH is also common for partial updates.
    // Confirm with your backend if it expects PUT or PATCH for this route.
    const response = await api.put(`/products/${productId}`, productData, {
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleError(error, "Failed to update product");
  }
};

/**
 * Deletes a product from the backend.
 * Correlates with backend: DELETE /api/v1/products/:productId
 * @param {string} token - The authentication token.
 * @param {string} productId - The ID of the product to delete.
 * @returns {Promise<object>} - Backend response data (e.g., success message).
 */
export const deleteProduct = async (token, productId) => { // Renamed from deleteVendorProduct
  try {
    const response = await api.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleError(error, "Failed to delete product");
  }
};

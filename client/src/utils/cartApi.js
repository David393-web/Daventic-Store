// src/api/cartApi.js
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Adjust the base URL as needed

export const addToCart = async (sessionId, productId, quantity) => {
  try {
    const response = await axios.post(
      `${API_URL}/products/addtocart`,
      { sessionId, productId, quantity },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add item to cart");
  }
};

export const getCart = async (sessionId) => {
  try {
    const response = await axios.get(`${API_URL}/products/get/${sessionId}`);
    return response.data.cart.items; // Return only the items array
  } catch (error) {
    throw new Error("Failed to fetch cart");
  }
};

export const removeFromCart = async (sessionId, productId) => {
  try {
    const response = await axios.patch(
      `${API_URL}/products/removefromcart`,
      { sessionId, productId },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to remove item from cart");
  }
};

export const updateCartQuantity = async (sessionId, productId, quantity) => {
  try {
    const response = await axios.patch(
      `${API_URL}/products/update-quantity`,
      { sessionId, productId, quantity },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update cart quantity");
  }
};

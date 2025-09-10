// src/utils/orderApi.js
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "https://mbayy-be.onrender.com/api/v1/order",
  headers: { "Content-Type": "application/json" },
});

// Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else if (error.response?.status === 404) {
      toast.error("Resource not found.");
    } else {
      toast.error(message);
    }

    console.error("API Error:", error.message, error.response?.data);
    return Promise.reject(error);
  }
);

// Submit a new order
export const submitOrder = async (sessionId, userId, orderData) => {
  try {
    if (!sessionId) throw new Error("Session ID is missing.");
    if (!userId) throw new Error("User ID is missing.");

    console.log("Initiating checkout:", { sessionId, userId, orderData });

    const response = await api.post(
      `/order_checkout/${sessionId}/${userId}`,
      orderData
    );

    return response.data.data || response.data;
  } catch (error) {
    console.error("Order Submission Error:", error.message, error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to place order");
  }
};

// Get payment status
export const getPaymentStatus = async (reference) => {
  try {
    const response = await api.get(`/payment_callback`, {
      params: { reference },
    });

    return response.data.data || response.data;
  } catch (error) {
    console.error("Payment Status Error:", error.message, error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to verify payment");
  }
};

// Confirm order was received
export const confirmOrderReceived = async (orderId) => {
  try {
    const response = await api.patch(`/confirmOrderReceived/${orderId}`);

    if (response.status === 200) return;

    throw new Error(response.data.message || "Failed to confirm payment");
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to confirm payment"
    );
  }
};

// src/utils/getOrderApi.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://mbayy-be.onrender.com/api/v1/user",
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

export const fetchOrders = async (token, role) => {
  try {
    if (!token) {
      throw new Error("Authentication token is missing. Please log in again.");
    }

    console.log("Fetching orders with token:", { token, role });

    const response = await api.get("/get_orders_user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.data.success || !Array.isArray(response.data.orders)) {
      throw new Error(response.data.message || "Failed to fetch orders");
    }

    const validStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
      "Completed",
    ];

    return response.data.orders.map((order) => ({
      id: order._id,
      orderId: order._id,
      buyer: {
        fullName: `${order.buyerInfo.first_name || ""} ${order.buyerInfo.last_name || ""}`.trim(),
        email: order.buyerInfo.email || "",
        phone: order.buyerInfo.phone || "",
      },
      shippingAddress: {
        street: order.buyerInfo.address || "",
        city: order.buyerInfo.city || "",
        region: order.buyerInfo.region || "",
        country: order.buyerInfo.country || "",
        postalCode: order.buyerInfo.postalCode || "",
      },
      product: {
        name: order.product?.name || "Unknown Product",
        category: order.product?.category || "Unknown",
        subCategory: order.product?.sub_category || "Unknown",
        image: order.product?.images?.[0] || "https://via.placeholder.com/80",
        price: Number(order.product?.price) || 0,
      },
      quantity: Number(order.quantity) || 1,
      totalPrice: Number(order.totalPrice) || 0,
      paymentStatus:
        order.payStatus === "Successful"
          ? "Paid"
          : order.payStatus === "Failed"
          ? "Failed"
          : "Pending",
      orderStatus: validStatuses.includes(order.status) ? order.status : "Pending",
      paymentOption: order.paymentOption || "Unknown",
      createdAt: order.createdAt || new Date().toISOString(),
    }));
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || "Failed to fetch orders");
  }
};

export const getOrdersWithSession = async (token, role) => {
  return fetchOrders(token, role);
};

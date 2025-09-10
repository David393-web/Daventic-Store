import axios from "axios";

const API_BASE_URL = "https://mbayy-be.onrender.com/api/v1/user";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllUsers = async () => {
  try {
    const response = await api.get("/alll_users");
    return response.data.data;
  } catch (error) {
    console.error("Get All Users Error:", error.response?.data || error);
    throw error.response?.data?.message || "Failed to fetch users";
  }
};

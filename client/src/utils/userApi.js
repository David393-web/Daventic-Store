// src/utils/userApi.js
import axios from "axios";

const API_BASE_URL = "localhost:5000/api/v1/users"; // Adjust the base URL as needed

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllUsers = async () => {
  try {
    const response = await api.get("/all_users");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return null;
  }
};

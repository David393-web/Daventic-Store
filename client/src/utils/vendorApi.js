import axios from "axios";

const API_BASE_URL = "https://mbayy-be.onrender.com/api/v1/vendor";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Create vendor
export const createVendor = async (userData) => {
  try {
    const response = await api.post("/create_vendor", userData);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error);
    throw error.response?.data?.message || "Failed to create account";
  }
};

// Login vendor
export const LoginVendorAPI = async (userData) => {
  try {
    const response = await api.post("/login_vendor", userData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error);
    throw error.response?.data?.message || "Check your network connection";
  }
};

// Get single vendor
export const get_single_vendor = async (token) => {
  try {
    const response = await api.get("/find_one_vendor", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// Upload return policy
export const upload_return_policy = async (token, data) => {
  try {
    const response = await api.post("/upload_return_policy", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

// Get all vendors (response with full data)
export const getAllVendor = async () => {
  try {
    const response = await api.get("/get_all_vendors");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Get all vendors (returning just the vendors array)
export const getAlllVendor = async () => {
  try {
    const response = await api.get("/get_all_vendors");
    return response.data.vendors;
  } catch (error) {
    console.log(error);
  }
};

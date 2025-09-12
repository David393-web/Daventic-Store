import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/slices/authSlice";

const UserDashboardProfile = ({ isDarkMode }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateUserProfile({ username: formData.username, email: formData.email }));
    alert("✅ Profile updated!");
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Profile</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="New Password"
        />
        <button
          onClick={handleSave}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UserDashboardProfile;

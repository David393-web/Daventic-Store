// src/pages/UserDashboards/UserDashboardSettings.jsx
import React, { useState } from "react";

const UserDashboardSettings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    newsletter: false,
    darkMode: false,
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Settings</h2>
      <div className="space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={() => toggleSetting("notifications")}
          />
          <span>Enable Notifications</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.newsletter}
            onChange={() => toggleSetting("newsletter")}
          />
          <span>Subscribe to Newsletter</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={() => toggleSetting("darkMode")}
          />
          <span>Dark Mode</span>
        </label>
      </div>
    </div>
  );
};

export default UserDashboardSettings;

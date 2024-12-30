import React from "react";

const Settings = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="mb-4">
          <h2 className="text-lg font-medium">Notifications</h2>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" />
            Email notifications
          </label>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" />
            Push notifications
          </label>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-medium">Account</h2>
          <button className="bg-teal-500 text-white px-4 py-2 rounded-lg mt-2">
            Change Password
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

import React from "react";

const Notifications = () => {
  const notifications = [
    "Your meeting with Jane Doe is scheduled for tomorrow at 3 PM.",
    "John Doe has sent you a review.",
    "Your profile was updated successfully.",
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
        {notifications.length > 0 ? (
          <ul className="list-disc list-inside space-y-4">
            {notifications.map((note, idx) => (
              <li key={idx} className="text-gray-700">
                {note}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You have no notifications.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;

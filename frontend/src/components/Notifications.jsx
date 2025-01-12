import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const { isLoggedin, user, login, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotifications = async () => {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
      try {
        const { data } = await axios.get("http://localhost:4000/api/notifications", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setNotifications(data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      setLoading(true);
      const {data} = await axios.patch(
        `http://localhost:4000/api/notifications/${notificationId}/read`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setLoading(false);
      if (data.success) {
      markAsReadInFronted(notificationId);
      toast.success(data.message)
    }
    } catch (error) {
      setLoading(false);
      console.error("Error marking notification as read:", error);
    }
  };

  const markAsReadInFronted = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification._id === notificationId ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMeetingResponse = async (notificationId, meetingId, action) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `http://localhost:4000/api/meetings/${meetingId}/${action}`,
        {notificationId},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setLoading(false);
      if (data.success) {
        markAsReadInFronted(notificationId);
        toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(`Error ${action}ing meeting:`, error);
      toast.error(error.response?.data?.message || "Failed to respond to meeting");
    }
  };

  const unreadNotifications = notifications.filter((notif) => !notif.read);
  const readNotifications = notifications.filter((notif) => notif.read);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      {isLoggedin ?
      <div className="w-full max-w-2xl m-6 mt-24 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Notifications</h1>

        {loading ? (
          <p className="text-gray-500">Loading notifications...</p>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Unread</h2>
            {unreadNotifications.length > 0 ? (
              <ul className="space-y-4">
                {unreadNotifications.map((notification) => (
                  <li
                    key={notification._id}
                    className={`bg-gray-100 p-4 rounded-md shadow-sm text-gray-700 hover:bg-gray-200`}>
                    <p className="font-bold text-gray-800">
                      From: {notification.sender || "Unknown Sender"}
                    </p>
                    <p className={`${notification.meeting.status == 'accepted' ? 
                      'text-green-700'
                      : 
                      notification.meeting.status == 'rejected' ?
                      'text-red-700'
                      :
                      'text-gray-100'
                    } mt-1 font-semibold`}>{notification.message}</p>

                    {notification.meeting && (
                      <div className="mt-2">
                        <p className="text-gray-700">
                          <span className="font-medium">Meeting Topic:</span>{" "}
                          {notification.meeting.topic}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(notification.meeting.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Time Slot:</span> {notification.meeting.timeSlot}
                        </p>
                      </div>
                    )}

                    {notification.meeting && notification.meeting.mentee !== currentUser.id &&
                     (<div className="flex space-x-4 mt-4">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={() =>
                          handleMeetingResponse(notification._id, notification.meeting._id, "accept")
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={() =>
                          handleMeetingResponse(notification._id, notification.meeting._id, "reject")
                        }
                      >
                        Reject
                      </button>
                    </div>
                    )}

                    <button
                      className="mt-2 text-blue-500 hover:underline"
                      onClick={() => markAsRead(notification._id)}
                    >
                      Mark as Read
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No unread notifications.</p>
            )}

            <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Read</h2>
            {readNotifications.length > 0 ? (
              <ul className="space-y-4">
                {readNotifications.map((notification) => (
                  <li
                    key={notification._id}
                    className="bg-gray-100 p-4 rounded-md shadow-sm text-gray-500"
                  >
                    <p>{notification.message}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No read notifications.</p>
            )}
          </>
        )}
      </div>
      :
      <div className="w-full max-w-2xl m-6 mt-24 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Notifications</h1>
        <p className="text-gray-500 text-center">Please login to view notifications.</p>
      </div>
      }
    </div>
  );
};

export default Notifications;

import React, { useState } from "react";

const BookMeetingPage = () => {
  const [useProfile, setUseProfile] = useState(true);
  const [message, setMessage] = useState("");
  const [meetingDetails, setMeetingDetails] = useState({
    date: "",
    time: "",
    duration: "",
    timeZone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Meeting details submitted:", meetingDetails, message);
    // Proceed to payment or API call
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-teal-600 mb-8">
            Book a Meeting
          </h1>
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Section 1: Mentor Information */}
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
              <div>
                <h2 className="text-xl font-semibold">Mentors Name</h2>
                <p className="text-sm text-gray-600">UX/UI Designer</p>
                <p className="text-sm text-gray-600">4.9 ⭐ (25 reviews)</p>
                <p className="text-teal-600 font-bold">65€/hour</p>
              </div>
            </div>

            {/* Section 2: User Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Your Information</h2>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="useProfile"
                  checked={useProfile}
                  onChange={() => setUseProfile(true)}
                  className="mr-2"
                />
                <label htmlFor="useProfile" className="text-sm text-gray-600">
                  Use information from your profile
                </label>
              </div>
              {useProfile ? (
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm font-semibold">Name Surname</p>
                  <p className="text-sm">email.address@gmail.com</p>
                  <p className="text-sm">Phone number: 111-222-333-45</p>
                </div>
              ) : (
                <textarea
                  placeholder="Enter your details"
                  className="w-full p-4 border border-gray-300 rounded-lg"
                  rows="3"
                ></textarea>
              )}
            </div>

            {/* Section 3: Write a Message */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Write a Message</h2>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message to the mentor"
                className="w-full p-4 border border-gray-300 rounded-lg"
                rows="4"
              ></textarea>
            </div>

            {/* Section 4: Choose Meeting Time */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Choose Meeting Time
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={meetingDetails.date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={meetingDetails.time}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Duration
                  </label>
                  <select
                    name="duration"
                    value={meetingDetails.duration}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select</option>
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">60 min</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Time Zone
                  </label>
                  <select
                    name="timeZone"
                    value={meetingDetails.timeZone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select</option>
                    <option value="GMT+1">GMT+1</option>
                    <option value="GMT+2">GMT+2</option>
                    <option value="GMT+3">GMT+3</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded-lg"
              >
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BookMeetingPage;

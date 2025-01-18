import React from "react";

const MeetingLinkModal = ({ isOpen, onClose, onSubmit }) => {
  const [meetingLink, setMeetingLink] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!meetingLink.trim()) return;

    setIsSubmitting(true);
    await onSubmit(meetingLink);
    setIsSubmitting(false);
    setMeetingLink("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Enter Meeting Link
          </h2>

          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter meeting link (e.g., Zoom, Google Meet)"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!meetingLink.trim() || isSubmitting}
              className={`px-4 py-2 text-white rounded-md ${
                !meetingLink.trim() || isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isSubmitting ? "Accepting..." : "Accept Meeting"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingLinkModal;

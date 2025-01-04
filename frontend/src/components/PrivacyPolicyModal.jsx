import React from "react";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#root");

const PrivacyPolicyModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Privacy Policy"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header flex justify-between items-center py-4 px-6 border-b">
        <h2 className="text-2xl font-bold">Privacy Policy</h2>
        <button
          onClick={onRequestClose}
          className="text-teal-600 hover:text-teal-800 font-semibold"
        >
          Close
        </button>
      </div>

      <div className="modal-body px-6 py-4 overflow-y-auto max-h-96">
        <h3 className="text-xl font-semibold">1. Introduction</h3>
        <p className="text-sm mt-2">
          At MentorConnect, we value your privacy. This privacy policy explains
          how we collect, use, and protect your personal information when you
          use our services.
        </p>

        <h3 className="text-xl font-semibold mt-4">
          2. Information Collection
        </h3>
        <p className="text-sm mt-2">
          We collect personal information when you register on our platform,
          interact with mentors, or engage in other activities. This information
          may include your name, email address, payment information, and
          preferences.
        </p>

        <h3 className="text-xl font-semibold mt-4">
          3. How We Use Your Information
        </h3>
        <p className="text-sm mt-2">
          We use your personal information to provide you with mentorship
          services, improve our platform, and communicate with you about your
          account, services, and offers.
        </p>

        <h3 className="text-xl font-semibold mt-4">4. Data Protection</h3>
        <p className="text-sm mt-2">
          We take data security seriously. We implement appropriate security
          measures to protect your personal information from unauthorized
          access, alteration, or destruction.
        </p>

        <h3 className="text-xl font-semibold mt-4">
          5. Sharing of Information
        </h3>
        <p className="text-sm mt-2">
          We do not share your personal information with third parties except as
          necessary to provide our services or as required by law.
        </p>

        <h3 className="text-xl font-semibold mt-4">6. Cookies</h3>
        <p className="text-sm mt-2">
          We use cookies to enhance your experience on our platform. Cookies are
          small data files stored on your device that help us track and analyze
          usage patterns.
        </p>

        <h3 className="text-xl font-semibold mt-4">7. Your Rights</h3>
        <p className="text-sm mt-2">
          You have the right to access, update, or delete your personal
          information. If you wish to exercise these rights, please contact us
          directly.
        </p>

        <h3 className="text-xl font-semibold mt-4">
          8. Changes to This Policy
        </h3>
        <p className="text-sm mt-2">
          We may update this privacy policy from time to time. Any changes will
          be posted on this page, and we encourage you to review it
          periodically.
        </p>

        <h3 className="text-xl font-semibold mt-4">9. Contact Us</h3>
        <p className="text-sm mt-2">
          If you have any questions or concerns regarding our privacy policy,
          please contact us at support@mentorconnect.com.
        </p>
      </div>

      {/* <div className="modal-footer py-4 px-6 border-t">
        <button
          onClick={onRequestClose}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition"
        >
          I Agree
        </button>
      </div> */}
    </Modal>
  );
};

export default PrivacyPolicyModal;

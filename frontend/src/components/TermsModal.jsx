import React from "react";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#root");

const TermsModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Terms & Conditions"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header flex justify-between items-center py-4 px-6 border-b">
        <h2 className="text-2xl font-bold">Terms and Conditions</h2>
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
          Welcome to MentorConnect. These terms and conditions govern your
          access to and use of our services. By using our platform, you agree to
          comply with these terms.
        </p>

        <h3 className="text-xl font-semibold mt-4">2. Use of Services</h3>
        <p className="text-sm mt-2">
          You must be at least 18 years old to use MentorConnect. By using our
          platform, you agree to provide accurate and truthful information. You
          are responsible for maintaining the confidentiality of your account.
        </p>

        <h3 className="text-xl font-semibold mt-4">
          3. Mentor Responsibilities
        </h3>
        <p className="text-sm mt-2">
          Mentors are expected to provide guidance, advice, and support to
          mentees in a professional manner. Mentors must ensure that their
          content and communication adhere to our platform's policies.
        </p>

        <h3 className="text-xl font-semibold mt-4">
          4. Mentee Responsibilities
        </h3>
        <p className="text-sm mt-2">
          Mentees are expected to engage respectfully with mentors and be open
          to feedback. Mentees must also respect the privacy of mentors and
          comply with any guidelines set by the mentor.
        </p>

        <h3 className="text-xl font-semibold mt-4">
          5. Privacy and Data Protection
        </h3>
        <p className="text-sm mt-2">
          We value your privacy. Your personal information is protected in
          accordance with our Privacy Policy. By using MentorConnect, you
          consent to the collection and use of your data as described in our
          Privacy Policy.
        </p>

        <h3 className="text-xl font-semibold mt-4">6. Payments</h3>
        <p className="text-sm mt-2">
          Any fees or payments related to our platform will be clearly outlined
          at the time of transaction. By using our services, you agree to our
          payment terms and any applicable charges.
        </p>

        <h3 className="text-xl font-semibold mt-4">7. Termination</h3>
        <p className="text-sm mt-2">
          We reserve the right to suspend or terminate accounts that violate our
          terms and conditions. Users may also terminate their accounts at any
          time.
        </p>

        <h3 className="text-xl font-semibold mt-4">
          8. Limitation of Liability
        </h3>
        <p className="text-sm mt-2">
          MentorConnect is not liable for any direct, indirect, incidental, or
          consequential damages that may arise from using our platform.
        </p>

        <h3 className="text-xl font-semibold mt-4">9. Changes to the Terms</h3>
        <p className="text-sm mt-2">
          We may update or modify these terms and conditions from time to time.
          All updates will be posted on this page, and we recommend checking for
          changes periodically.
        </p>

        <h3 className="text-xl font-semibold mt-4">10. Governing Law</h3>
        <p className="text-sm mt-2">
          These terms and conditions are governed by the laws of the
          jurisdiction in which MentorConnect operates.
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

export default TermsModal;

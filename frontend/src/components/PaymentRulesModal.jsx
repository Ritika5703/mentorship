import React from "react";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#root");

const PaymentRulesModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Payment Rules"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header flex justify-between items-center py-4 px-6 border-b">
        <h2 className="text-2xl font-bold">Payment Rules</h2>
        <button
          onClick={onRequestClose}
          className="text-teal-600 hover:text-teal-800 font-semibold"
        >
          Close
        </button>
      </div>

      <div className="modal-body px-6 py-4 overflow-y-auto max-h-96">
        <h3 className="text-xl font-semibold">1. Payment Terms</h3>
        <p className="text-sm mt-2">
          All payments for services on MentorConnect must be made through the
          platform. We accept various payment methods including credit cards and
          online payment systems.
        </p>

        <h3 className="text-xl font-semibold mt-4">2. Payment Processing</h3>
        <p className="text-sm mt-2">
          Payment transactions are securely processed by third-party payment
          providers. MentorConnect does not store sensitive payment information.
        </p>

        <h3 className="text-xl font-semibold mt-4">3. Refunds</h3>
        <p className="text-sm mt-2">
          We offer refunds for certain services if they do not meet the
          specified criteria. Refund requests must be submitted within 30 days
          of the payment date.
        </p>

        <h3 className="text-xl font-semibold mt-4">4. Payment Disputes</h3>
        <p className="text-sm mt-2">
          In case of any payment disputes, please contact our support team at
          support@mentorconnect.com. We will investigate and resolve the issue
          as soon as possible.
        </p>

        <h3 className="text-xl font-semibold mt-4">5. Payment Security</h3>
        <p className="text-sm mt-2">
          We take security seriously. Our payment systems are secured with
          encryption technology to protect your financial information.
        </p>

        <h3 className="text-xl font-semibold mt-4">
          6. Changes to Payment Terms
        </h3>
        <p className="text-sm mt-2">
          MentorConnect reserves the right to modify payment rules at any time.
          Any changes will be communicated to users through our platform.
        </p>

        <h3 className="text-xl font-semibold mt-4">7. Contact Us</h3>
        <p className="text-sm mt-2">
          If you have any questions or concerns regarding our payment rules,
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

export default PaymentRulesModal;

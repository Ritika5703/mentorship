import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import TermsModal from "./TermsModal";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import PaymentRulesModal from "./PaymentRulesModal";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const openPrivacyModal = (e) => {
    e.preventDefault();
    setIsPrivacyModalOpen(true);
  };

  const closePrivacyModal = () => setIsPrivacyModalOpen(false);

  const openPaymentModal = (e) => {
    e.preventDefault();
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => setIsPaymentModalOpen(false);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <footer className="bg-teal-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-bold text-center md:text-left">
            Mentor Connect
          </h2>
          <p className="mt-2 text-sm text-center md:text-left">
            &copy; 2024 MentorConnect
          </p>
        </div>

        {/* Center Section: Links */}
        <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col space-y-2 text-sm items-center md:items-start">
            <Link to="/all-mentors" className="hover:underline">
              All mentors
            </Link>
            {/* <Link to="/become-a-mentor" className="hover:underline">
      Become a mentor
    </Link> */}
            <Link to="/contact-us" className="hover:underline">
              Contact us
            </Link>
            <Link to="/login" className="hover:underline">
              Sign in
            </Link>
          </div>
          <div className="flex flex-col space-y-2 text-sm items-center md:items-start">
            <Link to="#" onClick={openPrivacyModal} className="hover:underline">
              Privacy policy
            </Link>
            <Link to="#" onClick={openModal} className="hover:underline">
              Terms & Conditions
            </Link>
            <Link to="#" onClick={openPaymentModal} className="hover:underline">
              Payment rules
            </Link>
          </div>
        </div>

        {/* Right Section: Social Media Icons */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faFacebookF} size="lg" />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          </div>
        </div>
      </div>

      {/* Modal for Terms and Conditions */}
      <TermsModal isOpen={isModalOpen} onRequestClose={closeModal} />
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onRequestClose={closePrivacyModal}
      />
      <PaymentRulesModal
        isOpen={isPaymentModalOpen}
        onRequestClose={closePaymentModal}
      />
    </footer>
  );
};

export default Footer;

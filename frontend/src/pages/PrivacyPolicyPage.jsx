// src/pages/PrivacyPolicyPage.js
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicyPage = () => {
  return (
    <div>
      <div className="bg-gradient-to-b from-teal-50 to-white min-h-screen">
        <div className="container mx-auto py-12 px-6 pt-24">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
            Privacy Policy
          </h1>

          <section className="bg-white shadow-lg rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-semibold text-teal-600 mb-4">
              Introduction
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to our website! We value your privacy and are committed to
              protecting your personal information. This Privacy Policy explains
              the types of data we collect, how we use it, and your rights
              regarding your data when you use our services.
            </p>
          </section>

          <section className="bg-white shadow-lg rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-semibold text-teal-600 mb-4">
              Information We Collect
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We collect various types of information to provide better
              services. The following types of data may be collected:
            </p>
            <ul className="list-disc pl-8 text-lg text-gray-700">
              <li>Personal identification details (name, email, etc.)</li>
              <li>Non-personal data (browser type, IP address, etc.)</li>
              <li>
                Usage data (time spent, pages visited, interactions, etc.)
              </li>
            </ul>
          </section>

          <section className="bg-white shadow-lg rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-semibold text-teal-600 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The information we collect is used in various ways to enhance your
              experience on our platform:
            </p>
            <ul className="list-disc pl-8 text-lg text-gray-700">
              <li>
                To improve our website and services based on user feedback
              </li>
              <li>To personalize content and communications</li>
              <li>To ensure the security of our services and prevent fraud</li>
            </ul>
          </section>

          <section className="bg-white shadow-lg rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-semibold text-teal-600 mb-4">
              How We Protect Your Information
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We take data security seriously. Your personal information is
              protected through encryption and regular security audits. We
              follow industry standards to ensure your data remains secure.
            </p>
          </section>

          <section className="bg-white shadow-lg rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-semibold text-teal-600 mb-4">
              Your Rights
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              You have the right to access, update, or delete your personal
              information at any time. You may also choose to opt-out of
              receiving marketing communications.
            </p>
          </section>

          <section className="bg-white shadow-lg rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-semibold text-teal-600 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date. Please
              review this page periodically to stay informed.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;

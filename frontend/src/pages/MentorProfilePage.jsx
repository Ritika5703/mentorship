import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Clock,
  Star,
  Mail,
  Video,
  Briefcase,
  GraduationCap,
  Calendar as CalendarIcon,
  Globe,
  Twitter,
  Linkedin,
  Notebook
} from "lucide-react";
import Loader from "../components/Loader";
import axios from "axios";
import { toast } from "react-hot-toast";

const AvailabilityCard = ({ slot, isSelected, onClick }) => (
  <div
    onClick={onClick}
    className={`p-3 border rounded-lg cursor-pointer transition-all ${
      isSelected
        ? "border-teal-600 bg-teal-50"
        : "border-gray-200 hover:border-teal-600"
    }`}
  >
    <div className="text-sm font-medium">{slot}</div>
  </div>
);

const MentorProfilePage = () => {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [topic, setTopic] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/mentor/${id}`);
        const data = await response.json();
        setMentor(data.mentor);
        setLoading(false);
      } catch (err) {
        setError("Failed to load mentor data");
        setLoading(false);
      }
    };

    fetchMentorData();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!mentor) return <div>Mentor not found</div>;
  

  const bookMeeting = async () => { 
    // Implement the booking functionality
    setLoading(true);
    if (!localStorage.getItem('token')) {
      return navigate("/login");
    }
    if (!selectedDate || !selectedTimeSlot) {
      toast.error("Please select a date and time slot");
      return;
    }
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    }
    try {
      const { data } = await axios.post("http://localhost:4000/api/mentor/book-meeting",
        { mentorId: mentor._id, date: selectedDate, timeSlot: selectedTimeSlot, topic: topic },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setLoading(false);

      if (data.success) {
        toast.success(data.message);
        setShowBookingModal(false);
      } else {
        console.error(data);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error booking meeting:", error);
      toast.error(error.response.data.message);
    }
   }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-white border-b pt-5">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left Column - Profile Info */}
            <div className="w-full md:w-2/3">
              <div className="flex gap-6 items-start">
                <img
                  src={mentor.profilePicture}
                  alt={mentor.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {mentor.name}
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">
                    {mentor.mentorDetails.currentCompany}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="ml-1 text-gray-900">
                        {mentor.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="text-gray-500">•</div>
                    <div className="flex items-center text-gray-600">
                      <Video className="w-5 h-5" />
                      <span className="ml-1">
                        {mentor.meetingsAttended} sessions
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    {mentor.social?.twitter && (
                      <a
                        href={mentor.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-teal-600"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {mentor.social?.linkedin && (
                      <a
                        href={mentor.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-teal-600"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {mentor.website && (
                      <a
                        href={mentor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-teal-600"
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {mentor.about}
                </p>
              </div>

              {/* Experience & Education */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-teal-600" />
                    <h3 className="text-lg font-semibold">Experience</h3>
                  </div>
                  <p className="text-gray-600">
                    {mentor.mentorDetails.yearsOfExperience} years of experience
                    in {mentor.mentorDetails.fields.join(", ")}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg border">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="w-5 h-5 text-teal-600" />
                    <h3 className="text-lg font-semibold">Education</h3>
                  </div>
                  <p className="text-gray-600">{mentor.education}</p>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  Skills & Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {mentor.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {skill.name} ({skill.level}/5)
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <div className="space-y-6">
                  {mentor.reviews.map((review, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg border">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={review.reviewer.profilePicture}
                            alt={review.reviewer.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <h4 className="font-medium">
                              {review.reviewer.name}
                            </h4>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-3 text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="w-full md:w-1/3 sticky top-24">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Book a Session</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded-lg"
                      onChange={(e) => setSelectedDate(e.target.value)}
                      value={selectedDate}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Topic
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Enter a topic"
                      value={topic}
                    />
                  </div>

                  {selectedDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Time Slots
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "09:00 AM - 10:00 AM",
                          "10:00 AM - 11:00 AM",
                          "11:00 AM - 12:00 PM",
                          "02:00 PM - 03:00 PM",
                          "03:00 PM - 04:00 PM",
                        ].map((slot) => (
                          <AvailabilityCard
                            key={slot}
                            slot={slot}
                            isSelected={selectedTimeSlot === slot}
                            onClick={() => setSelectedTimeSlot(slot)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setShowBookingModal(true)}
                    disabled={!selectedDate || !selectedTimeSlot || !topic}
                    className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 
                      ${
                        selectedDate && selectedTimeSlot
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    <Video className="w-5 h-5" />
                    Book Session
                  </button>

                  {/* Contact Mentor Button */}
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="w-full py-3 border border-teal-600 text-teal-600 rounded-lg mt-3 flex items-center justify-center gap-2 hover:bg-teal-50"
                  >
                    <Mail className="w-5 h-5" />
                    Contact Mentor
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Session Duration</span>
                    <span>30 minutes</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Response Time</span>
                    <span>Usually within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              Contact {mentor.name}
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                You can reach out to {mentor.name} via the following channels:
              </p>

              <div className="flex items-center gap-3 mb-3">
                <Linkedin className="w-5 h-5 text-teal-600" />
                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600"
                >
                  {mentor.linkedin}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-600" />
                <span className="text-teal-600">{mentor.email}</span>
              </div>

              <button
                className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 mt-6"
                onClick={() => setShowContactModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Confirm Booking</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <CalendarIcon className="w-5 h-5 text-teal-600" />
                  <span className="font-medium">{selectedDate}</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-teal-600" />
                  <span className="font-medium">{selectedTimeSlot}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Notebook className="w-5 h-5 text-teal-600" />
                  <span className="font-medium">{topic}</span>
                </div>
              </div>

              <button
                className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                onClick={() => {
                  bookMeeting();
                  setShowBookingModal(false);
                }}
              >
                Confirm Booking
              </button>

              <button
                className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => setShowBookingModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorProfilePage;

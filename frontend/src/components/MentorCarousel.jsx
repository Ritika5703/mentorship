import React, { useState } from "react";

const testimonials = [
  {
    name: "Mentor Name 1",
    title: "UX/UI Designer",
    review:
      "Becoming a mentor has been one of the most rewarding experiences of my career. Guiding others and watching them succeed is incredibly fulfilling. Highly recommend becoming a mentor!",
    rating: 4.9,
    image:
      "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
    reviewsCount: 475,
  },
  {
    name: "Mentor Name 2",
    title: "Software Engineer",
    review:
      "Mentoring has allowed me to contribute to the growth of others while growing myself. It's a fantastic journey of personal and professional growth.",
    rating: 4.8,
    image:
      "https://t3.ftcdn.net/jpg/06/41/26/64/360_F_641266494_Qy6PJV3b9ZvuFPg7f5vGEFMMsynp4NWZ.jpg",
    reviewsCount: 325,
  },
  {
    name: "Mentor Name 3",
    title: "Product Manager",
    review:
      "Helping others achieve their goals as a mentor has brought me immense satisfaction. The impact on my mentees' careers has been incredibly fulfilling.",
    rating: 5.0,
    image:
      "https://s3.envato.com/files/463943169/64d4e38f200cd41cae535246_withmeta.jpg",
    reviewsCount: 612,
  },
  // Add more testimonials as needed
];

const MentorCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-white text-center">
      <div className="relative flex justify-center items-center gap-8">
        {/* Left Arrow */}
        <div className="absolute left-0 z-10 flex items-center">
          <button
            onClick={prevTestimonial}
            className="bg-teal-600 text-white p-3 rounded-full shadow-lg hover:bg-teal-700 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* Testimonial Card */}
        <div className="w-full max-w-4xl bg-teal-50 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-row items-center gap-6">
          {/* Mentor Image */}
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 overflow-hidden border-4 border-teal-600 shadow-lg transition-transform duration-500 hover:scale-105">
            <img
              src={currentTestimonial.image}
              alt="Mentor"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Testimonial Text */}
          <div className="flex flex-col justify-center text-left max-w-xl">
            <p className="text-lg text-gray-700 mb-6 font-medium italic">
              "{currentTestimonial.review}"
            </p>

            {/* Mentor Info */}
            <div className="flex items-center gap-4 mb-4">
              <p className="font-semibold text-teal-600">
                {currentTestimonial.name}
              </p>
              <p className="text-sm text-gray-600">{`(${currentTestimonial.reviewsCount}+ reviews)`}</p>
            </div>

            {/* Rating Stars */}
            <div className="flex justify-start gap-1 mt-4 text-teal-600">
              {[...Array(5)].map((_, idx) => (
                <svg
                  key={idx}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  className="text-yellow-500"
                >
                  <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <div className="absolute right-0 z-10 flex items-center">
          <button
            onClick={nextTestimonial}
            className="bg-teal-600 text-white p-3 rounded-full shadow-lg hover:bg-teal-700 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MentorCarousel;

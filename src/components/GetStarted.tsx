import React from "react";
import { Link } from "react-router-dom";

const GetStarted: React.FC = () => (
  <div className="text-gray-800 flex flex-col min-h-screen bg-gradient-to-b from-primary/10 via-white to-gray-50">
    <main className="relative flex flex-col items-center justify-between flex-1 px-6 py-16 overflow-hidden">
      <div className="absolute top-10 left-10 text-6xl opacity-10">🧠</div>
      <div className="absolute bottom-20 right-16 text-7xl opacity-10">❤️</div>
      <div className="absolute top-40 right-1/3 text-5xl opacity-10">💬</div>
      <div className="absolute bottom-10 left-1/4 text-6xl opacity-10">🤝</div>

      <div className="text-center mb-10 relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-teal-500 to-primary bg-clip-text text-transparent animate-gradient">
          Welcome to Ashvaan
        </h1>
        <p className="text-lg text-gray-700 mt-3 animate-slide-up">
          A safe space for students to prioritize mental health and well-being
          💬
        </p>
      </div>

      {/* Tagline Section with Typing Effect */}
      <div className="max-w-xl text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start mt-6">
          <h2
            className="text-2xl md:text-3xl font-bold text-primary"
            id="typing-text"
          >
            Helping You Thrive, Not Just Survive
          </h2>
        </div>
        <p className="text-lg text-gray-600 mb-6 mt-4">
          College life can be exciting, but also overwhelming. Whether it’s
          exams, homesickness, or stress, you don’t have to face it alone.
        </p>
        {/* Use React Router Link for navigation */}
        <Link to="/signup">
          <button className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 shadow-md">
            Get Started
          </button>
        </Link>
      </div>

      {/* Illustration/Image */}
      <div className="mt-10 md:mt-0 flex justify-center md:justify-end">
        <img
          src="https://i.pinimg.com/1200x/3b/06/c2/3b06c29e50f5369f87c4c958ee71c3ff.jpg"
          alt="Student Mental Health"
          className="w-80 h-80 object-cover rounded-full shadow-xl hover:scale-105 transition-transform duration-300 border-4 border-primary"
        />
      </div>
    </main>

    {/* Quotes Section */}
    {/* ...Copy and paste your quote sections, feature sections, and bottom illustration here (convert class and img tags to JSX as needed)... */}
  </div>
);

export default GetStarted;

// src/pages/AiAssitant.tsx
import React from "react";
import { Bot } from "lucide-react";
import ChatbotEmbed from "./index/ChatbotEmbed";
import { useNavigate } from "react-router-dom";

const AiAssitant: React.FC = () => {
  const navigate = useNavigate();

  const handleBookCounseling = () => {
    navigate("/appointments");
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header - Increased size */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          {/* Left Side: Title and Tags */}
          <div>
            <div className="flex items-center">
              <div className="bg-white/20 rounded-full p-3 mr-4">
                <Bot className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI Chatbot Assistant</h1>
                <p className="text-base text-teal-100 mt-1">
                  Get instant, confidential support for your mental health
                  journey
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center space-x-3">
              <div className="bg-white/20 rounded-lg px-4 py-2 text-sm font-semibold">
                Available 24/7
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-sm font-semibold">
                Response Time: Instant
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-sm font-semibold">
                Privacy: Secure
              </div>
            </div>
          </div>

          {/* Right Side: Need More Help? Card */}
          <div className="bg-blue-50 text-gray-900 rounded-lg p-4 shadow-lg w-72 flex-shrink-0 border border-blue-200">
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-2">
                Need More Help?
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                If you're experiencing a mental health crisis or need immediate
                support, please reach out to our human counselors.
              </p>
              <div className="space-y-2">
                <button
                  onClick={handleBookCounseling}
                  className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors text-xs font-bold"
                >
                  Book Counseling Session
                </button>
                <button className="w-full bg-white text-teal-600 border border-teal-300 px-4 py-2 rounded-md hover:bg-teal-50 transition-colors text-xs font-bold">
                  Crisis Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chatbot Interface */}
      <div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Chatbot Header */}
          <div className="bg-teal-50 border-b border-teal-200 px-6 py-4">
            <div className="flex items-center">
              <div className="bg-teal-100 rounded-full p-2 mr-3">
                <Bot className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Ashvaan AI Assistant
                </h3>
                <p className="text-sm text-gray-600">
                  Powered by advanced mental health AI
                </p>
              </div>
              <div className="ml-auto">
                <div className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Online
                </div>
              </div>
            </div>
          </div>

          {/* Chatbot iframe */}
          <div className="h-[600px]">
            <ChatbotEmbed width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssitant;

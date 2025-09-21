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
    <div>
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          {/* Left Side: Title and Tags */}
          <div>
            <div className="flex items-center">
              <div className="bg-white/20 rounded-full p-2 mr-3">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Chatbot Assistant</h1>
                <p className="text-sm text-teal-100">
                  Get instant, confidential support for your mental health
                  journey
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center space-x-2">
              <div className="bg-white/20 rounded-md px-3 py-1 text-xs font-medium">
                Available 24/7
              </div>
              <div className="bg-white/20 rounded-md px-3 py-1 text-xs font-medium">
                Response Time: Instant
              </div>
              <div className="bg-white/20 rounded-md px-3 py-1 text-xs font-medium">
                Privacy: Secure
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chatbot Interface */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* vvv Small Chatbot Header Added Back In vvv */}
          <div className="bg-teal-50 border-b border-gray-200 px-4 py-2">
            <div className="flex items-center">
              <div className="bg-teal-100 rounded-full p-1.5 mr-3">
                <Bot className="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-800">
                  Ashvaan AI Assistant
                </h3>
                <p className="text-xs text-gray-500">
                  Powered by advanced mental health AI
                </p>
              </div>
              <div className="ml-auto">
                <div className="flex items-center text-xs text-green-600">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                  Online
                </div>
              </div>
            </div>
          </div>
          {/* ^^^ Small Chatbot Header Added Back In ^^^ */}

          {/* Chatbot iframe */}
          <div className="h-[calc(100vh-250px)]">
            <ChatbotEmbed width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssitant;

// src/pages/AiAssitant.tsx
import React from "react";
import { Bot } from "lucide-react";
import ChatbotEmbed from "./index/ChatbotEmbed"; // This loads your functional chat engine
import { useNavigate } from "react-router-dom";

const AiAssitant: React.FC = () => {
  const navigate = useNavigate();

  const handleBookCounseling = () => {
    navigate("/appointments");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner - Retains fixed gradient for brand punch */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          {/* Left Side: Title and Tags */}
          <div>
            <div className="flex items-center">
              {/* Uses theme-aware text and background within the gradient block */}
              <div className="bg-white/20 rounded-full p-2 mr-3 text-header-primary">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-header-primary">
                  AI Chatbot Assistant
                </h1>
                <p className="text-sm text-header-secondary">
                  Get instant, confidential support for your mental health
                  journey
                </p>
              </div>
            </div>
            {/* Badges use theme-aware background/text within the gradient block */}
            <div className="mt-3 flex items-center space-x-2">
              <div className="bg-white/20 rounded-md px-3 py-1 text-xs font-medium text-header-primary">
                Available 24/7
              </div>
              <div className="bg-white/20 rounded-md px-3 py-1 text-xs font-medium text-header-primary">
                Response Time: Instant
              </div>
              <div className="bg-white/20 rounded-md px-3 py-1 text-xs font-medium text-header-primary">
                Privacy: Secure
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chatbot Interface */}
      <div className="mt-8">
        {/* KEY CHANGE: Uses feature-card for the outer panel background */}
        <div className="feature-card rounded-lg shadow-lg overflow-hidden">
          {/* vvv Small Chatbot Header vvv */}
          {/* THEME APPLIED: Background and border use custom theme classes */}
          <div className="p-4 border-b-theme-divider bg-secondary">
            <div className="flex items-center">
              {/* Avatar uses custom theme background and accent color */}
              <div className="sidebar-avatar-bg rounded-full p-1.5 mr-3">
                <Bot className="h-4 w-4 text-accent" />
              </div>
              <div>
                {/* Text uses theme primary/secondary colors */}
                <h3 className="font-semibold text-sm text-primary">
                  Ashvaan AI Assistant
                </h3>
                <p className="text-xs text-secondary">
                  Powered by advanced mental health AI
                </p>
              </div>
              <div className="ml-auto">
                {/* Status indicator remains green */}
                <div className="flex items-center text-xs text-green-600">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                  Online
                </div>
              </div>
            </div>
          </div>
          {/* ^^^ Small Chatbot Header ^^^ */}

          {/* Chatbot iframe */}
          {/* RESTORED: This loads the external functional chat engine */}
          <div className="h-[calc(100vh-250px)]">
            <ChatbotEmbed width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssitant;

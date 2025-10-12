import React, { useState } from "react";
import ChatbotEmbed from "./ChatbotEmbed";

const ChatbotPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button - Uses accent color */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-accent hover:opacity-90 text-white px-4 py-2 rounded-lg shadow-md"
      >
        {isOpen ? "Close Chatbot" : "Open Chatbot"}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        // KEY CHANGE: Uses feature-card and custom border
        <div className="fixed bottom-0 right-0 w-full md:w-1/4 h-1/2 md:h-full feature-card border-l border-theme-divider shadow-lg z-50">
          {/* Header - Fixed teal background for strong contrast */}
          <div className="bg-teal-500 text-white p-3 flex justify-between items-center">
            <span className="text-header-primary">AI Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              // KEY CHANGE: Closes button uses theme primary text color
              className="text-lg font-bold text-primary"
            >
              ×
            </button>
          </div>

          {/* Chatbot iframe */}
          <div className="h-[calc(100%-3rem)]">
            <ChatbotEmbed width="100%" height="100%" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPanel;

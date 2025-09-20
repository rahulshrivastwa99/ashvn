import React, { useState } from "react";
import ChatbotEmbed from "./ChatbotEmbed";

const ChatbotPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md"
      >
        {isOpen ? "Close Chatbot" : "Open Chatbot"}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 w-full md:w-1/4 h-1/2 md:h-full bg-white border-l border-gray-300 shadow-lg z-50">
          {/* Header */}
          <div className="bg-teal-500 text-white p-3 flex justify-between items-center">
            <span>AI Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold"
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

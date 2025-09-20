import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatbotEmbed from "./ChatbotEmbed";

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-teal-500 text-white p-3 flex justify-between items-center">
            <span>Ashvaan Chatbot</span>
            <button onClick={toggleChat} className="font-bold text-lg">
              ×
            </button>
          </div>

          {/* Chat iframe */}
          <div className="flex-1">
            <ChatbotEmbed width="100%" height="100%" />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;

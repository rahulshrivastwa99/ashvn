import React, { useState } from "react";
import { Bot, X, ExternalLink, MessageCircle, Mic, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ChatbotEmbed from "./ChatbotEmbed";

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-6 z-[60]">
      {" "}
      {/* Changed bottom-6 to bottom-20 and z-50 to z-[60] */}
      {/* The main chat panel that opens */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-96 h-[600px] flex flex-col transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-teal-50 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center">
              <div className="bg-teal-100 rounded-full p-2 mr-3">
                <Bot className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Ashvaan Chatbot</h3>
                <p className="text-xs text-gray-500">How can I help?</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Expand to Full Screen Button */}
              <Link
                to="/aiassitant"
                className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Expand to full screen"
                onClick={() => setIsOpen(false)}
              >
                <ExternalLink size={16} />
              </Link>
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chatbot Iframe/Content */}
          <div className="flex-1">
            <ChatbotEmbed width="100%" height="100%" />
          </div>

          {/* Optional: Add a placeholder input area *outside* the iframe if you want */}
          {/* This is useful if the iframe doesn't contain the input itself */}
          <div className="flex items-center p-3 border-t border-gray-200 bg-white flex-shrink-0">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Plus size={20} />
            </button>
            <input
              type="text"
              placeholder="Send a message..."
              className="flex-1 border-none outline-none px-3 py-2 rounded-lg bg-gray-100 mx-2 text-sm"
            />
            <button className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700">
              <Mic size={20} />
            </button>
          </div>
        </div>
      )}
      {/* The floating action button to open the chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-teal-600 text-white rounded-full p-4 shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-transform duration-200 ${
          isOpen ? "transform scale-0" : "transform scale-100"
        }`}
        aria-label="Open chat widget"
      >
        <Bot size={28} />
      </button>
    </div>
  );
};

export default ChatbotWidget;

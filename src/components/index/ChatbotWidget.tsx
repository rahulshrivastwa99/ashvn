import React, { useState } from "react";
import { Bot, X, ExternalLink, MessageCircle, Mic, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ChatbotEmbed from "./ChatbotEmbed";

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-6 z-[60]">
      {/* The main chat panel that opens */}
      {isOpen && (
        // KEY CHANGE: Uses feature-card for the main widget panel background
        <div className="feature-card rounded-xl shadow-2xl border border-theme-divider w-96 h-[600px] flex flex-col transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-theme-divider flex-shrink-0 bg-secondary">
            <div className="flex items-center">
              {/* Avatar uses custom theme background and accent color */}
              <div className="sidebar-avatar-bg rounded-full p-2 mr-3">
                <Bot className="h-5 w-5 text-accent" />
              </div>
              <div>
                {/* Text uses theme primary/secondary colors */}
                <h3 className="font-semibold text-primary">Ashvaan Chatbot</h3>
                <p className="text-xs text-secondary">How can I help?</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Expand to Full Screen Button */}
              <Link
                to="/aiassitant"
                // KEY CHANGE: Uses theme text and hover color
                className="p-2 text-secondary hover-bg-secondary rounded-full transition-colors"
                aria-label="Expand to full screen"
                onClick={() => setIsOpen(false)}
              >
                <ExternalLink size={16} />
              </Link>
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                // KEY CHANGE: Uses theme text and hover color
                className="p-2 text-secondary hover-bg-secondary rounded-full transition-colors"
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

          {/* Input area outside the iframe */}
          <div className="flex items-center p-3 border-t border-theme-divider feature-card flex-shrink-0">
            <button className="p-2 text-secondary hover-bg-secondary rounded-full">
              <Plus size={20} />
            </button>
            <input
              type="text"
              placeholder="Send a message..."
              // KEY CHANGE: Uses bg-secondary for input background
              className="flex-1 border-none outline-none px-3 py-2 rounded-lg bg-secondary mx-2 text-sm text-primary"
            />
            <button className="bg-accent text-white p-2 rounded-full hover:opacity-90">
              <Mic size={20} />
            </button>
          </div>
        </div>
      )}

      {/* The floating action button to open the chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-accent text-white rounded-full p-4 shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-transform duration-200 ${
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

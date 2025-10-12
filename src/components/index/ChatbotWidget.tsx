import React, { useState, useEffect, useRef } from "react";
import { Bot, X, ExternalLink, MessageCircle, Mic, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ChatbotEmbed from "./ChatbotEmbed";

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // --- DRAGGABLE STATE MANAGEMENT ---
  // Initial position: bottom-20 (80px), right-6 (24px)
  const [position, setPosition] = useState({ bottom: 80, right: 24 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, bottom: 0, right: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);

  // Note: The z-index is set to [60] on the parent div

  // --- DRAGGABLE HANDLERS ---
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging by clicking on the fixed button OR the widget header/title area
    if (
      e.target instanceof HTMLButtonElement ||
      e.target instanceof HTMLInputElement
    ) {
      return;
    }

    e.preventDefault();
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      bottom: position.bottom,
      right: position.right,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      // Calculate new position based on drag movement
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;

      // Update position (dragging right decreases 'right' offset, dragging up decreases 'bottom' offset)
      setPosition((prev) => ({
        right: dragStart.current.right - dx,
        bottom: dragStart.current.bottom - dy,
      }));
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  // --- END DRAGGABLE HANDLERS ---

  return (
    // KEY CHANGE 1: Use dynamic position style for drag, and include drag handler for the entire widget area
    <div
      ref={widgetRef}
      onMouseDown={handleMouseDown}
      className="fixed z-[60] transition-transform duration-200"
      style={{ bottom: position.bottom, right: position.right }}
    >
      {/* The main chat panel that opens */}
      {isOpen && (
        <div className="feature-card rounded-xl shadow-2xl border border-theme-divider w-96 h-[600px] flex flex-col transition-all duration-300 ease-in-out cursor-grab">
          {/* Header (Allows drag if not clicking buttons) */}
          <div className="flex items-center justify-between p-3 border-b border-theme-divider flex-shrink-0 bg-secondary">
            <div className="flex items-center">
              <div className="sidebar-avatar-bg rounded-full p-2 mr-3">
                <Bot className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-primary">
                  Ashvaan Chatbot
                </h3>
                <p className="text-xs text-secondary">How can I help?</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Expand to Full Screen Button */}
              <Link
                to="/aiassitant"
                className="p-2 text-secondary hover-bg-secondary rounded-full transition-colors"
                aria-label="Expand to full screen"
                onClick={() => setIsOpen(false)}
              >
                <ExternalLink size={16} />
              </Link>
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
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
        // KEY CHANGE 2: Button is positioned relative to the draggable container
        className={`absolute bottom-0 right-0 bg-accent text-white rounded-full p-4 shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-transform duration-200 
          ${isOpen ? "transform scale-0" : "transform scale-100"}
        `}
        aria-label="Open chat widget"
      >
        <Bot size={28} />
      </button>
    </div>
  );
};

export default ChatbotWidget;

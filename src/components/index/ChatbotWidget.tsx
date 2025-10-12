import React, { useState, useEffect, useRef } from "react";
import { Bot, X, ExternalLink, MessageCircle, Mic, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ChatbotEmbed from "./ChatbotEmbed";

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // --- DRAGGABLE STATE MANAGEMENT ---
  const [position, setPosition] = useState({ bottom: 80, right: 24 }); 
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, bottom: 0, right: 0 });
  const widgetRef = useRef<HTMLDivElement>(null); 
  
  // --- DRAGGABLE HANDLERS (Unchanged) ---
  const handleMouseDown = (e: React.MouseEvent) => {
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
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
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
    <div 
        ref={widgetRef}
        onMouseDown={handleMouseDown}
        className="fixed z-[60] transition-transform duration-200"
        style={{ bottom: position.bottom, right: position.right }}
    >
      {/* The main chat panel that opens (Themed) */}
      {isOpen && (
        <div className="feature-card rounded-xl shadow-2xl border border-theme-divider w-96 h-[600px] flex flex-col transition-all duration-300 ease-in-out cursor-grab">
          
          {/* Header (Themed) */}
          <div className="flex items-center justify-between p-3 border-b border-theme-divider flex-shrink-0 bg-secondary">
            <div className="flex items-center">
              <div className="sidebar-avatar-bg rounded-full p-2 mr-3">
                <Bot className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-primary">Ashvaan Chatbot</h3>
                <p className="text-xs text-secondary">How can I help?</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                to="/aiassitant"
                className="p-2 text-secondary hover-bg-secondary rounded-full transition-colors"
                aria-label="Expand to full screen"
                onClick={() => setIsOpen(false)}
              >
                <ExternalLink size={16} />
              </Link>
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

          {/* Input area outside the iframe (Themed) */}
          <div className="flex items-center p-3 border-t border-theme-divider feature-card flex-shrink-0">
            <button className="p-2 text-secondary hover-bg-secondary rounded-full">
              <Plus size={20} />
            </button>
            <input
              type="text"
              placeholder="Send a message..."
              className="flex-1 border-none outline-none px-3 py-2 rounded-lg bg-secondary mx-2 text-sm text-primary placeholder-themed"
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
        // ⚡ FINAL FIX: Added border-2 border-accent for circular boundary visibility ⚡
        className={`absolute bottom-0 right-0 bg-accent text-white rounded-full p-4 shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent transition-transform duration-200 border-2 border-accent
            ${!isOpen && 'ring-offset-white shadow-xl dark:ring-offset-2 dark:shadow-lg'}
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
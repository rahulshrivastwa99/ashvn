import React from "react";

interface ChatbotEmbedProps {
  width?: string;
  height?: string;
}

const ChatbotEmbed: React.FC<ChatbotEmbedProps> = ({
  width = "100%",
  height = "100%",
}) => {
  return (
    <iframe
      src="https://chatting-npmx.vercel.app"
      width={width}
      height={height}
      style={{
        border: "none",
        borderRadius: "8px",
      }}
      title="Ashvan Chatbot"
      allow="microphone; clipboard-write"
    />
  );
};

export default ChatbotEmbed;

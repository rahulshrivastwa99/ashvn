import React from "react";

const ChatBot: React.FC = () => {
  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Chat with Ashvan Bot</h2>
      <iframe
        src="https://chatting-npmx.vercel.app"
        width="100%"
        height="600px"
        style={{
          border: "none",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        title="Ashvan Chatbot"
        allow="microphone; clipboard-write"
      />
    </div>
  );
};

export default ChatBot;

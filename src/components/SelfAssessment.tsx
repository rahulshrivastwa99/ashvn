import React, { useState, useEffect, useRef } from "react";
import { Send, Shield, Brain } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  assessment?: {
    type: "PHQ-9" | "GAD-7";
    score?: number;
    risk?: "low" | "medium" | "high" | "critical";
  };
}

const assessmentQuestions = {
  "PHQ-9": [
    "Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?",
    "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
    "Over the last 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
    "Over the last 2 weeks, how often have you felt tired or had little energy?",
    "Over the last 2 weeks, how often have you had poor appetite or been overeating?",
    "Over the last 2 weeks, how often have you felt bad about yourself — or that you are a failure or have let yourself or your family down?",
    "Over the last 2 weeks, how often have you had trouble concentrating on things, such as reading the newspaper or watching television?",
    "Over the last 2 weeks, how often have you been moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual?",
    "Over the last 2 weeks, how often have you been bothered by thoughts that you would be better off dead, or of hurting yourself in some way?",
  ],
  "GAD-7": [
    "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
    "Over the last 2 weeks, how often have you not been able to stop or control worrying?",
    "Over the last 2 weeks, how often have you been worrying too much about different things?",
    "Over the last 2 weeks, how often have you had trouble relaxing?",
    "Over the last 2 weeks, how often have you been so restless that it's hard to sit still?",
    "Over the last 2 weeks, how often have you become easily annoyed or irritable?",
    "Over the last 2 weeks, how often have you felt afraid, as if something awful might happen?",
  ],
};

const offTopicReplies = [
  "I appreciate you sharing, but my main role right now is to help with the PHQ-9 and GAD-7 assessments. Would you like to start one of them?",
  "Thank you for reaching out. At the moment, I can only guide you through the official assessments. Please feel free to choose one of the options below.",
  "I'm here to support you with a self-assessment. To get started, please select either the PHQ-9 or GAD-7 tool.",
];

export default function SelfAssessment() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! This is the self-assessment center. Please select an assessment to begin.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState<{
    type: "PHQ-9" | "GAD-7" | null;
    questionIndex: number;
    scores: number[];
  }>({ type: null, questionIndex: 0, scores: [] });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startAssessment = (type: "PHQ-9" | "GAD-7") => {
    setCurrentAssessment({ type, questionIndex: 0, scores: [] });
    const botMessage: Message = {
      id: Date.now().toString(),
      text: `Let's start the ${type} assessment. I'll ask you a few questions. Please rate each on a scale of 0-3:\n\n0 = Not at all\n1 = Several days\n2 = More than half the days\n3 = Nearly every day\n\nQuestion 1: ${assessmentQuestions[type][0]}`,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleAssessmentResponse = (score: number) => {
    const { type, questionIndex, scores } = currentAssessment;
    if (!type) return;

    const newScores = [...scores, score];
    const nextQuestionIndex = questionIndex + 1;

    if (nextQuestionIndex < assessmentQuestions[type].length) {
      setCurrentAssessment({
        type,
        questionIndex: nextQuestionIndex,
        scores: newScores,
      });
      const botMessage: Message = {
        id: Date.now().toString(),
        text: `Question ${nextQuestionIndex + 1}: ${
          assessmentQuestions[type][nextQuestionIndex]
        }`,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } else {
      const totalScore = newScores.reduce((sum, s) => sum + s, 0);
      let risk: "low" | "medium" | "high" | "critical";
      let message: string;

      if (type === "PHQ-9") {
        if (totalScore <= 4) {
          risk = "low";
          message = "Your PHQ-9 score indicates minimal depression symptoms.";
        } else if (totalScore <= 9) {
          risk = "medium";
          message =
            "Your PHQ-9 score indicates mild depression symptoms. Consider speaking with a counselor.";
        } else if (totalScore <= 14) {
          risk = "high";
          message =
            "Your PHQ-9 score indicates moderate depression symptoms. I strongly recommend scheduling an appointment with a professional.";
        } else {
          risk = "critical";
          message =
            "Your PHQ-9 score indicates severe depression symptoms. Please seek immediate professional help.";
        }
      } else {
        // GAD-7
        if (totalScore <= 4) {
          risk = "low";
          message = "Your GAD-7 score indicates minimal anxiety symptoms.";
        } else if (totalScore <= 9) {
          risk = "medium";
          message =
            "Your GAD-7 score indicates mild anxiety symptoms. Let's work on some anxiety management techniques.";
        } else if (totalScore <= 14) {
          risk = "high";
          message =
            "Your GAD-7 score indicates moderate anxiety symptoms. I recommend speaking with a counselor.";
        } else {
          risk = "critical";
          message =
            "Your GAD-7 score indicates severe anxiety symptoms. Please consider seeking immediate professional support.";
        }
      }

      const resultMessage: Message = {
        id: Date.now().toString(),
        text: `Assessment complete. Your total score is ${totalScore}.\n\n${message}`,
        sender: "bot",
        timestamp: new Date(),
        assessment: { type, score: totalScore, risk },
      };

      setMessages((prev) => [...prev, resultMessage]);
      setCurrentAssessment({ type: null, questionIndex: 0, scores: [] });
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const textToProcess = inputText;
    setInputText("");
    setIsTyping(true);

    if (currentAssessment.type) {
      const score = parseInt(textToProcess);
      if (!isNaN(score) && score >= 0 && score <= 3) {
        handleAssessmentResponse(score);
      } else {
        const clarificationMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Please respond with a single number from 0 to 3.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, clarificationMessage]);
      }
      setIsTyping(false);
      return;
    }

    setTimeout(() => {
      if (textToProcess.toLowerCase().includes("phq-9")) {
        startAssessment("PHQ-9");
      } else if (textToProcess.toLowerCase().includes("gad-7")) {
        startAssessment("GAD-7");
      } else {
        const randomReply =
          offTopicReplies[Math.floor(Math.random() * offTopicReplies.length)];
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomReply,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleQuickReplyClick = (reply: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: reply,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      if (reply.includes("PHQ-9")) {
        startAssessment("PHQ-9");
      } else if (reply.includes("GAD-7")) {
        startAssessment("GAD-7");
      }
      setIsTyping(false);
    }, 1000);
  };

  const quickReplies = ["Start PHQ-9 assessment", "Start GAD-7 assessment"];

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="feature-card shadow-sm border-b border-theme-divider px-6 py-4 flex-shrink-0">
        <div className="flex items-center">
          <div className="sidebar-avatar-bg rounded-full p-3 mr-4">
            <Brain className="h-8 w-8 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Mental Health Self-Assessment
            </h1>
            <p className="text-base text-secondary">
              Confidential screening tools (PHQ-9 & GAD-7)
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-secondary">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-md lg:max-w-lg xl:max-w-2xl px-5 py-3 rounded-2xl ${
                message.sender === "user"
                  ? "bg-accent text-white rounded-br-none" // User messages keep teal background
                  : "bg-secondary text-primary shadow-sm border border-theme-divider rounded-bl-none"
              }`}
            >
              <p className="text-base whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-secondary text-primary shadow-sm border border-theme-divider px-4 py-3 rounded-2xl rounded-bl-none">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {!currentAssessment.type && (
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-3">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleQuickReplyClick(reply)}
                className="px-4 py-2 text-base bg-secondary text-primary border border-theme-divider rounded-full hover-bg-secondary transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="feature-card border-t border-theme-divider px-6 py-4 flex-shrink-0">
        <div className="flex space-x-4">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              currentAssessment.type
                ? "Enter a number from 0-3..."
                : "Click an assessment above or type its name..."
            }
            // FIX: Added placeholder-themed class to fix placeholder visibility
            // and maintained text-primary for typed text visibility.
            className="flex-1 border border-theme-divider rounded-lg px-4 py-3 text-base text-primary bg-secondary focus:ring-2 focus:ring-accent focus:border-accent placeholder-themed"
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className="bg-accent text-white rounded-lg px-5 py-3 hover:opacity-90 focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-2 flex items-center text-sm text-secondary">
          <Shield className="h-4 w-4 mr-1.5" />
          Your assessment results are confidential and secure.
        </div>
      </div>
    </div>
  );
}

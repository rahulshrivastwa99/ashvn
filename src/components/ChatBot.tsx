import React from "react";
import { Bot, MessageCircle, Shield, Clock, Zap, Heart, Brain } from "lucide-react";
import ChatbotEmbed from "./index/ChatbotEmbed";

const ChatBot: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Header - Matching Dashboard Style */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center">
          <div className="bg-white/20 rounded-full p-3 mr-4">
            <Bot className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">AI Chatbot Assistant</h1>
            <p className="text-teal-100">
              Get instant, confidential support for your mental health journey
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-4">
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="text-sm text-teal-100">Available</div>
            <div className="text-lg font-bold">24/7</div>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="text-sm text-teal-100">Response Time</div>
            <div className="text-lg font-bold">Instant</div>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="text-sm text-teal-100">Privacy</div>
            <div className="text-lg font-bold">Secure</div>
          </div>
        </div>
      </div>

      {/* Main Chatbot Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chatbot Container */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Chatbot Header */}
            <div className="bg-teal-50 border-b border-teal-200 px-6 py-4">
              <div className="flex items-center">
                <div className="bg-teal-100 rounded-full p-2 mr-3">
                  <Bot className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Ashvaan AI Assistant</h3>
                  <p className="text-sm text-gray-600">Powered by advanced mental health AI</p>
                </div>
                <div className="ml-auto">
                  <div className="flex items-center text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chatbot iframe */}
            <div className="h-[600px]">
              <ChatbotEmbed width="100%" height="100%" />
            </div>
          </div>
        </div>

        {/* Sidebar with Features */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MessageCircle className="h-5 w-5 text-teal-600 mr-2" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-teal-50 hover:border-teal-300 transition-colors">
                <div className="font-medium text-gray-900">Start New Conversation</div>
                <div className="text-sm text-gray-600">Begin a fresh chat session</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-teal-50 hover:border-teal-300 transition-colors">
                <div className="font-medium text-gray-900">Mental Health Assessment</div>
                <div className="text-sm text-gray-600">Take PHQ-9 or GAD-7 screening</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-teal-50 hover:border-teal-300 transition-colors">
                <div className="font-medium text-gray-900">Crisis Support</div>
                <div className="text-sm text-gray-600">Get immediate help if needed</div>
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Heart className="h-5 w-5 text-teal-600 mr-2" />
              Features
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">24/7 Availability</div>
                  <div className="text-sm text-gray-600">Always here when you need support</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <Shield className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Confidential</div>
                  <div className="text-sm text-gray-600">Your conversations are private and secure</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 rounded-full p-2 mr-3">
                  <Zap className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Instant Response</div>
                  <div className="text-sm text-gray-600">Get immediate answers and guidance</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-100 rounded-full p-2 mr-3">
                  <Brain className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">AI-Powered</div>
                  <div className="text-sm text-gray-600">Advanced mental health AI technology</div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Resources */}
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg p-6 border border-teal-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Need More Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              If you're experiencing a mental health crisis or need immediate support, please reach out to our human counselors.
            </p>
            <div className="space-y-2">
              <button className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
                Book Counseling Session
              </button>
              <button className="w-full bg-white text-teal-600 border border-teal-300 px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium">
                Crisis Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

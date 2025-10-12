// src/pages/StudentDashboard.tsx

import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  MessageCircle,
  Calendar,
  BookOpen,
  Heart,
  AlertTriangle,
  TrendingUp,
  Activity,
  Brain,
  Notebook,
  Music,
  Bot, // Ensure Bot icon is imported if used for AI Assistant
} from "lucide-react";
import ChatbotWidget from "../index/ChatbotWidget";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const { profile } = useAuth();
  const [moodScore, setMoodScore] = useState(7);
  const [upcomingAppointments, setUpcomingAppointments] = useState(2);

  const quickActions = [
    {
      name: "AI Assistant",
      description: "Get instant support and guidance",
      icon: Bot, // Using Bot icon as it's typically used for AI
      href: "/aiassitant",
      // KEY FIX: This color now directly applies to the background of the icon's box
      color: "bg-cyan-500",
    },
    {
      name: "Self-Assessment",
      description: "Assess your mental well-being",
      icon: MessageCircle,
      href: "/selfassessment",
      color: "bg-teal-500",
    },
    {
      name: "Book Counselling Session",
      description: "Schedule a confidential session with a counsellor",
      icon: Calendar,
      href: "/appointments",
      color: "bg-blue-500",
    },
    {
      name: "Mental Health Resources",
      description: "Explore wellness guides and educational content",
      icon: BookOpen,
      href: "/resources",
      color: "bg-purple-500",
    },
    {
      name: "Peer Support Forum",
      description: "Connect anonymously with other students",
      icon: Heart,
      href: "/forum",
      color: "bg-pink-500",
    },
    {
      name: "Mood Tracker",
      description: "Track your daily mood and activities",
      icon: Activity,
      href: "/mood",
      color: "bg-green-500",
    },
    {
      name: "Daily Journal",
      description: "Write down your thoughts and feelings",
      icon: Notebook,
      href: "/daily-journal",
      color: "bg-yellow-500",
    },
    {
      name: "Sound Scapes",
      description: "Listen to calming music and sounds",
      icon: Music,
      href: "/sound-scapes",
      color: "bg-indigo-500",
    },
  ];

  const wellnessTools = [
    {
      name: "PHQ-9 Assessment",
      description: "Depression screening questionnaire",
      status: "Due",
      href: "/selfassessment",
    },
    {
      name: "GAD-7 Assessment",
      description: "Anxiety screening questionnaire",
      status: "Completed",
      href: "/selfassessment",
    },
    {
      name: "Breathing Exercise",
      description: "5-minute guided breathing",
      status: "Available",
      href: "/resources",
    },
    {
      name: "Mindfulness Session",
      description: "10-minute meditation",
      status: "Available",
      href: "/resources",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="dashboard-header-bg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2 text-header-primary">
          Welcome back, {profile?.full_name?.split(" ")[0]}!
        </h1>
        <p className="text-header-secondary">
          Your mental wellness journey continues today.
        </p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="mood-tracker-box rounded-lg px-4 py-2">
            <div className="text-sm text-header-secondary">Current Mood</div>
            <div className="text-xl font-bold text-header-primary">
              {moodScore}/10
            </div>
          </div>
          <div className="mood-tracker-box rounded-lg px-4 py-2">
            <div className="text-sm text-header-secondary">Streak</div>
            <div className="text-xl font-bold text-header-primary">7 days</div>
          </div>
        </div>
      </div>

      {/* Main Grid for Quick Actions and Crisis Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Quick Actions (All cards use the feature-card class for theme background/border/shadow) */}
        {quickActions.map((action) => (
          <Link
            key={action.name}
            to={action.href}
            className="feature-card rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow group"
          >
            {/* KEY FIX: Use action.color directly for the background of the icon's box */}
            <div
              className={`${action.color} rounded-lg p-3 w-fit mb-4 group-hover:scale-110 transition-transform`}
            >
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-primary mb-2">{action.name}</h3>
            <p className="text-sm text-secondary">{action.description}</p>
          </Link>
        ))}

        {/* vvv CRISIS SUPPORT CARD WITH RED BORDER vvv */}
        <Link
          to="/crisis"
          className="feature-card border-2 border-red-500 md:col-span-2 lg:col-span-2 lg:col-start-2 shadow-sm p-6 hover:shadow-md transition-shadow group flex flex-col justify-center items-center text-center h-full"
        >
          <div className="bg-red-500 rounded-lg p-3 w-fit mb-4 group-hover:scale-110 transition-transform">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold text-primary mb-2">Crisis Support</h3>
          <p className="text-sm text-secondary">
            Get immediate help if needed. 24x7 Support.
          </p>
          <button className="mt-4 bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors">
            Get Help Now
          </button>
        </Link>
        {/* ^^^ CRISIS SUPPORT CARD WITH RED BORDER ^^^ */}
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="feature-card p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-secondary">
                Upcoming Appointments
              </p>
              <p className="text-2xl font-bold text-primary">
                {upcomingAppointments}
              </p>
            </div>
          </div>
        </div>
        <div className="feature-card p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-secondary">
                Wellness Score
              </p>
              <p className="text-2xl font-bold text-primary">Good</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wellness Tools */}
      <div className="feature-card p-0">
        <div className="p-6 border-b-theme-divider">
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-purple-500 mr-3" />
            <h2 className="text-lg font-semibold text-primary">
              Wellness Tools
            </h2>
          </div>
        </div>
        <div className="divide-y divide-theme-divider">
          {wellnessTools.map((tool, index) => (
            <Link
              to={tool.href}
              key={index}
              className="block hover-bg-secondary"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-primary">{tool.name}</h3>
                    <p className="text-sm text-secondary mt-1">
                      {tool.description}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tool.status === "Due"
                        ? "badge-danger"
                        : tool.status === "Completed"
                        ? "badge-success"
                        : "badge-info"
                    }`}
                  >
                    {tool.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Embedded Chatbot */}
      <ChatbotWidget />
    </div>
  );
}

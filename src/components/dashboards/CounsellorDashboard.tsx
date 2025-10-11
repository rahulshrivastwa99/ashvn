import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Calendar,
  Users,
  MessageCircle,
  AlertTriangle,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import ChatbotEmbed from "../index/ChatbotEmbed"; // Added import
import ChatbotWidget from "../index/ChatbotWidget";
// Assuming useTheme is available if needed, but not strictly required here

export default function CounsellorDashboard() {
  const { profile } = useAuth();

  const todaysAppointments = [
    {
      id: 1,
      time: "10:00 AM",
      student: "Anonymous Student #1234",
      type: "Initial Consultation",
      priority: "Medium",
    },
    {
      id: 2,
      time: "11:30 AM",
      student: "Anonymous Student #5678",
      type: "Follow-up Session",
      priority: "High",
    },
    {
      id: 3,
      time: "2:00 PM",
      student: "Anonymous Student #9012",
      type: "Crisis Support",
      priority: "Critical",
    },
    {
      id: 4,
      time: "3:30 PM",
      student: "Anonymous Student #3456",
      type: "Group Therapy",
      priority: "Low",
    },
  ];

  const stats = [
    {
      name: "Today's Appointments",
      value: "4",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      name: "Active Students",
      value: "23",
      icon: Users,
      color: "text-green-600",
    },
    {
      name: "Pending Messages",
      value: "7",
      icon: MessageCircle,
      color: "text-purple-600",
    },
    {
      name: "High Priority Cases",
      value: "2",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ];

  const recentAlerts = [
    {
      student: "Student #1234",
      risk: "High",
      assessment: "PHQ-9 Score: 18",
      time: "2 hours ago",
    },
    {
      student: "Student #5678",
      risk: "Medium",
      assessment: "GAD-7 Score: 12",
      time: "4 hours ago",
    },
    {
      student: "Student #9012",
      risk: "Critical",
      assessment: "Crisis Intervention Needed",
      time: "1 day ago",
    },
  ];

  const getPriorityColor = (priority: string) => {
    // Using theme badge classes for the schedule priority
    switch (priority.toLowerCase()) {
      case "critical":
        return "badge-danger";
      case "high":
        return "badge-danger";
      case "medium":
        return "badge-info";
      case "low":
        return "badge-success";
      default:
        return "badge-secondary";
    }
  };

  const getRiskColor = (risk: string) => {
    // Using theme badge classes for risk alerts
    switch (risk.toLowerCase()) {
      case "critical":
      case "high":
        return "badge-danger";
      case "medium":
        return "badge-info";
      default:
        return "badge-success";
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2 text-header-primary">
          Good morning, Dr. {profile?.full_name?.split(" ")[0]}!
        </h1>
        <p className="text-header-secondary">
          You have 4 appointments scheduled today.
        </p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="text-sm text-header-secondary">This Week</div>
            <div className="text-xl font-bold text-header-primary">
              18 Sessions
            </div>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="text-sm text-header-secondary">
              Satisfaction Rate
            </div>
            <div className="text-xl font-bold text-header-primary">94%</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="feature-card p-6">
            <div className="flex items-center">
              <stat.icon className={`h-8 w-8 ${stat.color} mr-3`} />
              <div>
                <p className="text-sm font-medium text-secondary">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <div className="feature-card">
          <div className="p-6 border-b border-theme-divider">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-blue-500 mr-3" />
                <h2 className="text-lg font-semibold text-primary">
                  Today's Schedule
                </h2>
              </div>
              <button className="text-accent hover:opacity-80 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-theme-divider">
            {todaysAppointments.map((appointment) => (
              <div key={appointment.id} className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-secondary mr-2" />
                    <span className="font-medium text-primary">
                      {appointment.time}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                      appointment.priority
                    )}`}
                  >
                    {appointment.priority}
                  </span>
                </div>
                <p className="text-sm text-secondary mb-1">
                  {appointment.student}
                </p>
                <p className="text-sm font-medium text-primary">
                  {appointment.type}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Alerts */}
        <div className="feature-card">
          <div className="p-6 border-b border-theme-divider">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                <h2 className="text-lg font-semibold text-primary">
                  Risk Alerts
                </h2>
              </div>
              <button className="text-red-600 hover:opacity-80 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-theme-divider">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-primary">
                    {alert.student}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(
                      alert.risk
                    )}`}
                  >
                    {alert.risk} Risk
                  </span>
                </div>
                <p className="text-sm text-secondary mb-1">
                  {alert.assessment}
                </p>
                <p className="text-xs text-secondary">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="w-full feature-card p-6 text-left hover:shadow-md transition-shadow">
          <MessageCircle className="h-8 w-8 text-accent mb-4" />
          <h3 className="font-semibold text-primary mb-2">Message Students</h3>
          <p className="text-sm text-secondary">
            Send secure messages to your students
          </p>
        </button>

        <button className="w-full feature-card p-6 text-left hover:shadow-md transition-shadow">
          <TrendingUp className="h-8 w-8 text-green-500 mb-4" />
          <h3 className="font-semibold text-primary mb-2">Progress Reports</h3>
          <p className="text-sm text-secondary">
            View student progress and assessments
          </p>
        </button>

        <button className="w-full feature-card p-6 text-left hover:shadow-md transition-shadow">
          <CheckCircle className="h-8 w-8 text-blue-500 mb-4" />
          <h3 className="font-semibold text-primary mb-2">Session Notes</h3>
          <p className="text-sm text-secondary">
            Add and review session documentation
          </p>
        </button>
      </div>
      {/* Chatbot Integrate */}
      <ChatbotWidget />
    </div>
  );
}

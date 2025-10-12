import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Calendar,
  BarChart3,
  Shield,
  Settings,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import ChatbotEmbed from "../index/ChatbotEmbed"; // Added import
import ChatbotWidget from "../index/ChatbotWidget";
// Assuming useTheme is available for dynamic chart colors
import { useTheme } from "../../contexts/ThemeContext";

export default function AdminDashboard() {
  const { profile } = useAuth();
  // Assuming useTheme is implemented to dynamically set chart colors
  const { theme } = useTheme();

  // Define chart styling based on theme
  const chartAxisColor = theme === "dark" ? "#9CA3AF" : "#6B7280";
  const chartGridColor = theme === "dark" ? "#374151" : "#E5E7EB";
  const tooltipBackground = theme === "dark" ? "#1F2937" : "#FFFFFF";
  const tooltipTextColor = theme === "dark" ? "#F9FAFB" : "#111827";

  const monthlyData = [
    { month: "Jan", students: 120, sessions: 240, assessments: 180 },
    { month: "Feb", students: 135, sessions: 280, assessments: 210 },
    { month: "Mar", students: 150, sessions: 320, assessments: 245 },
    { month: "Apr", students: 165, sessions: 350, assessments: 280 },
    { month: "May", students: 180, sessions: 380, assessments: 310 },
    { month: "Jun", students: 195, sessions: 420, assessments: 340 },
  ];

  const riskDistribution = [
    { name: "Low Risk", value: 65, color: "#10B981" },
    { name: "Medium Risk", value: 25, color: "#F59E0B" },
    { name: "High Risk", value: 8, color: "#EF4444" },
    { name: "Critical", value: 2, color: "#DC2626" },
  ];

  const weeklyUsage = [
    { day: "Mon", usage: 85 },
    { day: "Tue", usage: 92 },
    { day: "Wed", usage: 88 },
    { day: "Thu", usage: 95 },
    { day: "Fri", usage: 78 },
    { day: "Sat", usage: 45 },
    { day: "Sun", usage: 52 },
  ];

  const stats = [
    {
      name: "Total Students",
      value: "1,847",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      name: "Active Counsellors",
      value: "23",
      change: "+2",
      icon: Shield,
      color: "text-green-600",
    },
    {
      name: "Sessions This Month",
      value: "420",
      change: "+18%",
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      name: "Platform Usage",
      value: "89%",
      change: "+5%",
      icon: Activity,
      color: "text-teal-600",
    },
  ];

  const recentAlerts = [
    {
      type: "High Risk Student",
      message: "Student #1234 scored 18 on PHQ-9",
      time: "2 hours ago",
      severity: "high",
    },
    {
      type: "System Alert",
      message: "Peak usage detected on counselling booking system",
      time: "4 hours ago",
      severity: "medium",
    },
    {
      type: "Critical Case",
      message: "Emergency intervention required for Student #5678",
      time: "6 hours ago",
      severity: "critical",
    },
    {
      type: "Resource Update",
      message: "New mental health resources added to library",
      time: "1 day ago",
      severity: "low",
    },
  ];

  const getSeverityColor = (severity: string) => {
    // Using themed badge classes for text and background
    switch (severity) {
      case "critical":
        return "badge-danger border-l-4 border-red-500";
      case "high":
        return "badge-danger border-l-4 border-orange-500";
      case "medium":
        return "badge-info border-l-4 border-yellow-500";
      default:
        return "badge-success border-l-4 border-green-500";
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2 text-header-primary">
          Admin Dashboard
        </h1>
        <p className="text-header-secondary">
          Monitor platform health and student wellbeing trends
        </p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="text-sm text-header-secondary">This Month</div>
            <div className="text-xl font-bold text-header-primary">
              420 Sessions
            </div>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="text-sm text-header-secondary">Platform Health</div>
            <div className="text-xl font-bold text-header-primary">
              Excellent
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            // KEY FIX 1: Use feature-card for dashboard stats
            className="feature-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary">
                  {stat.name}
                </p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p
                    className={`ml-2 text-sm font-medium ${
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : stat.change.startsWith("-")
                        ? "text-red-600"
                        : "text-secondary"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trends Chart */}
        <div className="feature-card p-6">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-6 w-6 text-blue-500 mr-3" />
            <h2 className="text-lg font-semibold text-primary">
              Monthly Trends
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              {/* KEY FIX 2: Theme Chart Grid and Axis text color */}
              <CartesianGrid stroke={chartGridColor} strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke={chartAxisColor} />
              <YAxis stroke={chartAxisColor} />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBackground,
                  borderColor: chartGridColor,
                  color: tooltipTextColor,
                }}
                itemStyle={{ color: tooltipTextColor }}
              />
              <Bar dataKey="students" fill="#3B82F6" name="Active Students" />
              <Bar dataKey="sessions" fill="#14B8A6" name="Sessions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution Chart */}
        <div className="feature-card p-6">
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
            <h2 className="text-lg font-semibold text-primary">
              Risk Distribution
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBackground,
                  borderColor: chartGridColor,
                  color: tooltipTextColor,
                }}
                itemStyle={{ color: tooltipTextColor }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {riskDistribution.map((item) => (
              <div key={item.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-secondary">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Usage Pattern Chart */}
      <div className="feature-card p-6">
        <div className="flex items-center mb-6">
          <BarChart3 className="h-6 w-6 text-purple-500 mr-3" />
          <h2 className="text-lg font-semibold text-primary">
            Weekly Usage Pattern
          </h2>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weeklyUsage}>
            {/* KEY FIX 3: Theme Chart Grid and Axis text color */}
            <CartesianGrid stroke={chartGridColor} strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke={chartAxisColor} />
            <YAxis stroke={chartAxisColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBackground,
                borderColor: chartGridColor,
                color: tooltipTextColor,
              }}
              itemStyle={{ color: tooltipTextColor }}
            />
            <Line
              type="monotone"
              dataKey="usage"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Alerts List */}
        <div className="feature-card">
          <div className="p-6 border-b border-theme-divider">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                <h2 className="text-lg font-semibold text-primary">
                  Recent Alerts
                </h2>
              </div>
              <button className="text-red-600 hover:opacity-80 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-theme-divider max-h-80 overflow-y-auto">
            {recentAlerts.map((alert, index) => (
              <div
                key={index}
                // KEY FIX 4: Themed Alert background, border, and text
                className={`p-4 border-l-4 ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-primary">{alert.type}</h4>
                    <p className="text-sm text-secondary mt-1">
                      {alert.message}
                    </p>
                    <p className="text-xs text-secondary mt-2">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">Quick Actions</h2>

          {/* Individual Quick Action Buttons */}
          <button className="w-full feature-card p-4 text-left hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <h3 className="font-semibold text-primary">User Management</h3>
                <p className="text-sm text-secondary">
                  Manage students, counsellors, and permissions
                </p>
              </div>
            </div>
          </button>

          <button className="w-full feature-card p-4 text-left hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-secondary mr-4" />
              <div>
                <h3 className="font-semibold text-primary">System Settings</h3>
                <p className="text-sm text-secondary">
                  Configure platform settings and preferences
                </p>
              </div>
            </div>
          </button>

          <button className="w-full feature-card p-4 text-left hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <h3 className="font-semibold text-primary">Generate Reports</h3>
                <p className="text-sm text-secondary">
                  Create detailed analytics and usage reports
                </p>
              </div>
            </div>
          </button>

          <button className="w-full feature-card p-4 text-left hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-purple-500 mr-4" />
              <div>
                <h3 className="font-semibold text-primary">Security Audit</h3>
                <p className="text-sm text-secondary">
                  Review security logs and user activity
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
      {/* Chatbot Integrate */}
      <ChatbotWidget />
    </div>
  );
}

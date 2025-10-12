import React from "react";
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
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  Users,
  AlertTriangle,
  Calendar,
  Brain,
  Heart,
  Activity,
  Download,
} from "lucide-react";
// Assuming you have access to the useTheme hook from your ThemeContext
import { useTheme } from "../contexts/ThemeContext";

export default function Analytics() {
  const { theme } = useTheme(); // Get theme state

  // Define chart styling based on theme
  const chartAxisColor = theme === "dark" ? "#9CA3AF" : "#6B7280";
  const chartGridColor = theme === "dark" ? "#374151" : "#E5E7EB";
  const tooltipBackground = theme === "dark" ? "#1F2937" : "#FFFFFF";
  const tooltipTextColor = theme === "dark" ? "#F9FAFB" : "#111827";

  // --- Data Definitions (Unchanged) ---
  const monthlyTrends = [
    {
      month: "Aug 2024",
      sessions: 180,
      students: 120,
      phq9: 8.2,
      gad7: 7.5,
      riskLevel: 2.3,
    },
    {
      month: "Sep 2024",
      sessions: 220,
      students: 145,
      phq9: 8.8,
      gad7: 8.1,
      riskLevel: 2.6,
    },
    {
      month: "Oct 2024",
      sessions: 260,
      students: 165,
      phq9: 9.5,
      gad7: 8.7,
      riskLevel: 3.1,
    },
    {
      month: "Nov 2024",
      sessions: 340,
      students: 190,
      phq9: 10.2,
      gad7: 9.2,
      riskLevel: 3.4,
    },
    {
      month: "Dec 2024",
      sessions: 280,
      students: 175,
      phq9: 9.1,
      gad7: 8.4,
      riskLevel: 2.8,
    },
    {
      month: "Jan 2025",
      sessions: 380,
      students: 210,
      phq9: 8.7,
      gad7: 8.0,
      riskLevel: 2.5,
    },
  ];

  const riskDistribution = [
    { name: "Low Risk", value: 68, count: 143, color: "#10B981" },
    { name: "Medium Risk", value: 22, count: 46, color: "#F59E0B" },
    { name: "High Risk", value: 8, count: 17, color: "#EF4444" },
    { name: "Critical", value: 2, count: 4, color: "#DC2626" },
  ];

  const dailyUsage = [
    { day: "Monday", ai_chat: 45, appointments: 12, resources: 28, forum: 15 },
    { day: "Tuesday", ai_chat: 52, appointments: 15, resources: 31, forum: 18 },
    {
      day: "Wednesday",
      ai_chat: 48,
      appointments: 14,
      resources: 35,
      forum: 22,
    },
    {
      day: "Thursday",
      ai_chat: 58,
      appointments: 18,
      resources: 42,
      forum: 25,
    },
    { day: "Friday", ai_chat: 41, appointments: 10, resources: 29, forum: 12 },
    { day: "Saturday", ai_chat: 25, appointments: 3, resources: 15, forum: 8 },
    { day: "Sunday", ai_chat: 28, appointments: 2, resources: 18, forum: 10 },
  ];

  const assessmentTrends = [
    { month: "Aug", avgPhq9: 8.2, avgGad7: 7.5, completions: 89 },
    { month: "Sep", avgPhq9: 8.8, avgGad7: 8.1, completions: 105 },
    { month: "Oct", avgPhq9: 9.5, avgGad7: 8.7, completions: 127 },
    { month: "Nov", avgPhq9: 10.2, avgGad7: 9.2, completions: 156 },
    { month: "Dec", avgPhq9: 9.1, avgGad7: 8.4, completions: 134 },
    { month: "Jan", avgPhq9: 8.7, avgGad7: 8.0, completions: 178 },
  ];

  const topConcerns = [
    { concern: "Academic Stress", count: 156, percentage: 35 },
    { concern: "Anxiety", count: 124, percentage: 28 },
    { concern: "Sleep Issues", count: 89, percentage: 20 },
    { concern: "Depression", count: 67, percentage: 15 },
    { concern: "Social Isolation", count: 45, percentage: 10 },
  ];

  const interventionEffectiveness = [
    { intervention: "AI Chat Support", effectiveness: 87, usage: 92 },
    { intervention: "Counselor Sessions", effectiveness: 94, usage: 45 },
    { intervention: "Peer Support Forum", effectiveness: 76, usage: 38 },
    { intervention: "Self-Help Resources", effectiveness: 71, usage: 68 },
    { intervention: "Mindfulness Tools", effectiveness: 82, usage: 55 },
  ];

  const stats = [
    {
      name: "Total Active Students",
      value: "210",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      name: "Monthly Sessions",
      value: "380",
      change: "+18%",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      name: "High Risk Students",
      value: "21",
      change: "-8%",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      name: "Platform Engagement",
      value: "89%",
      change: "+5%",
      icon: Activity,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Analytics Dashboard
          </h1>
          <p className="text-secondary">
            Monitor mental health trends and platform effectiveness
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            // Themed button
            className="flex items-center px-4 py-2 border border-theme-divider rounded-md text-primary hover-bg-secondary"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          {/* Themed Select Input */}
          <select className="border border-theme-divider rounded-md px-3 py-2 text-primary bg-secondary focus:ring-accent focus:border-accent">
            <option>Last 6 Months</option>
            <option>Last 3 Months</option>
            <option>Last Month</option>
            <option>This Semester</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            // KEY FIX 1: Use feature-card for dashboard stats
            className="feature-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                {/* Themed text */}
                <p className="text-sm font-medium text-secondary">
                  {stat.name}
                </p>
                <div className="flex items-baseline">
                  {/* Themed text */}
                  <p className="text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p
                    className={`ml-2 text-sm font-medium ${
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : stat.change.startsWith("-")
                        ? "text-red-600"
                        : "text-secondary" // Default change color
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

      {/* Mental Health Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Engagement Trends Chart */}
        <div className="feature-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-blue-500 mr-3" />
              <h2 className="text-lg font-semibold text-primary">
                Monthly Engagement Trends
              </h2>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyTrends}>
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
              <Area
                type="monotone"
                dataKey="sessions"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="students"
                stackId="2"
                stroke="#14B8A6"
                fill="#14B8A6"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Level Distribution Chart */}
        <div className="feature-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-lg font-semibold text-primary">
                Risk Level Distribution
              </h2>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{
                  backgroundColor: tooltipBackground,
                  borderColor: chartGridColor,
                  color: tooltipTextColor,
                }}
                itemStyle={{ color: tooltipTextColor }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Risk Legend */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {riskDistribution.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-secondary">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-primary">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assessment Trends Chart */}
      <div className="feature-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-purple-500 mr-3" />
            <h2 className="text-lg font-semibold text-primary">
              Assessment Score Trends (PHQ-9 & GAD-7)
            </h2>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={assessmentTrends}>
            {/* KEY FIX 3: Theme Chart Grid and Axis text color */}
            <CartesianGrid stroke={chartGridColor} strokeDashArray="3 3" />
            <XAxis dataKey="month" stroke={chartAxisColor} />
            <YAxis domain={[0, 15]} stroke={chartAxisColor} />
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
              dataKey="avgPhq9"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
              name="PHQ-9 Average"
            />
            <Line
              type="monotone"
              dataKey="avgGad7"
              stroke="#F59E0B"
              strokeWidth={3}
              dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
              name="GAD-7 Average"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Usage Pattern Chart */}
      <div className="feature-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Activity className="h-6 w-6 text-teal-500 mr-3" />
            <h2 className="text-lg font-semibold text-primary">
              Feature Usage by Day
            </h2>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={dailyUsage}>
            {/* KEY FIX 4: Theme Chart Grid and Axis text color */}
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
            <Bar dataKey="ai_chat" stackId="a" fill="#14B8A6" name="AI Chat" />
            <Bar
              dataKey="appointments"
              stackId="a"
              fill="#3B82F6"
              name="Appointments"
            />
            <Bar
              dataKey="resources"
              stackId="a"
              fill="#8B5CF6"
              name="Resources"
            />
            <Bar dataKey="forum" stackId="a" fill="#F59E0B" name="Forum" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Concerns List */}
        <div className="feature-card p-6">
          <div className="flex items-center mb-6">
            <Heart className="h-6 w-6 text-pink-500 mr-3" />
            <h2 className="text-lg font-semibold text-primary">
              Top Student Concerns
            </h2>
          </div>
          <div className="space-y-4">
            {topConcerns.map((concern) => (
              <div
                key={concern.concern}
                className="flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-primary">
                      {concern.concern}
                    </span>
                    <span className="text-sm text-secondary">
                      {concern.count}
                    </span>
                  </div>
                  {/* Progress Bar (Themed) */}
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-pink-500 h-2 rounded-full"
                      style={{ width: `${concern.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intervention Effectiveness List */}
        <div className="feature-card p-6">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-6 w-6 text-green-500 mr-3" />
            <h2 className="text-lg font-semibold text-primary">
              Intervention Effectiveness
            </h2>
          </div>
          <div className="space-y-6">
            {interventionEffectiveness.map((item) => (
              <div key={item.intervention}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary">
                    {item.intervention}
                  </span>
                  <span className="text-sm text-secondary">
                    {item.effectiveness}% effective
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-secondary mb-1">
                      Effectiveness
                    </div>
                    {/* Progress Bar (Themed) */}
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${item.effectiveness}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-secondary mb-1">
                      Usage Rate
                    </div>
                    {/* Progress Bar (Themed) */}
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${item.usage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Insights (Themed) */}
      <div className="feature-card border border-theme-divider p-6">
        <div className="flex items-start">
          <Brain className="h-6 w-6 text-accent mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-primary mb-3">
              Key Insights & Recommendations
            </h3>
            {/* The background inside the insight boxes needs to be subtly themed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Insight Cards */}
              <div className="space-y-3">
                <div className="bg-secondary rounded p-3">
                  <h4 className="font-medium text-primary mb-1">
                    Increased Stress Levels
                  </h4>
                  <p className="text-sm text-secondary">
                    Average PHQ-9 scores peaked at 10.2 in November. Consider
                    implementing stress management workshops during exam
                    periods.
                  </p>
                </div>
                <div className="bg-secondary rounded p-3">
                  <h4 className="font-medium text-primary mb-1">
                    High AI Chat Engagement
                  </h4>
                  <p className="text-sm text-secondary">
                    Students heavily utilize AI support (92% usage rate). Expand
                    chatbot capabilities with more specialized interventions.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-secondary rounded p-3">
                  <h4 className="font-medium text-primary mb-1">
                    Weekend Usage Drop
                  </h4>
                  <p className="text-sm text-secondary">
                    Significant decrease in weekend engagement. Consider
                    targeted outreach and weekend support programs.
                  </p>
                </div>
                <div className="bg-secondary rounded p-3">
                  <h4 className="font-medium text-primary mb-1">
                    Counselor Session Effectiveness
                  </h4>
                  <p className="text-sm text-secondary">
                    94% effectiveness rate for counselor sessions. Increase
                    counselor availability to meet growing demand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

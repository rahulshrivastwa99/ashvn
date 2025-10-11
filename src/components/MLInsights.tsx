import React, { useState, useEffect } from "react";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Target,
  BarChart3,
  Users,
  Heart,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
// Assuming you have access to the useTheme hook from your ThemeContext
import { useTheme } from "../contexts/ThemeContext";

interface MLPrediction {
  studentId: string;
  riskScore: number;
  predictedOutcome: "low" | "medium" | "high" | "critical";
  confidence: number;
  factors: string[];
  recommendations: string[];
}

interface StressPattern {
  timeOfDay: string;
  stressLevel: number;
  commonTriggers: string[];
  effectiveInterventions: string[];
}

export default function MLInsights() {
  const { theme } = useTheme(); // Get theme state for chart styling
  const [predictions, setPredictions] = useState<MLPrediction[]>([]);
  const [stressPatterns, setStressPatterns] = useState<StressPattern[]>([]);
  const [selectedModel, setSelectedModel] = useState<"knn" | "logistic">("knn");
  const [loading, setLoading] = useState(false);

  // Define chart styling based on theme
  const chartAxisColor = theme === "dark" ? "#9CA3AF" : "#6B7280";
  const chartGridColor = theme === "dark" ? "#374151" : "#E5E7EB";
  const tooltipBackground = theme === "dark" ? "#1F2937" : "#FFFFFF";
  const tooltipTextColor = theme === "dark" ? "#F9FAFB" : "#111827";

  // --- Data Definitions (Unchanged) ---
  const generateKNNPredictions = () => {
    const mockPredictions: MLPrediction[] = [
      {
        studentId: "student_001",
        riskScore: 0.85,
        predictedOutcome: "high",
        confidence: 0.92,
        factors: [
          "High PHQ-9 scores",
          "Irregular sleep patterns",
          "Academic stress",
        ],
        recommendations: [
          "Schedule counseling session",
          "Sleep hygiene education",
          "Stress management workshop",
        ],
      },
      {
        studentId: "student_002",
        riskScore: 0.34,
        predictedOutcome: "low",
        confidence: 0.78,
        factors: [
          "Regular exercise",
          "Good social support",
          "Stable mood patterns",
        ],
        recommendations: [
          "Continue current wellness practices",
          "Peer mentoring opportunity",
        ],
      },
      {
        studentId: "student_003",
        riskScore: 0.67,
        predictedOutcome: "medium",
        confidence: 0.84,
        factors: [
          "Moderate anxiety levels",
          "Exam period stress",
          "Social isolation",
        ],
        recommendations: [
          "Group therapy sessions",
          "Study skills workshop",
          "Social activities",
        ],
      },
      {
        studentId: "student_004",
        riskScore: 0.91,
        predictedOutcome: "critical",
        confidence: 0.96,
        factors: [
          "Severe depression indicators",
          "Suicidal ideation",
          "Substance use",
        ],
        recommendations: [
          "Immediate intervention required",
          "Crisis counseling",
          "Medical evaluation",
        ],
      },
    ];
    return mockPredictions;
  };

  const generateStressPatterns = () => {
    const patterns: StressPattern[] = [
      {
        timeOfDay: "Morning (6-10 AM)",
        stressLevel: 3.2,
        commonTriggers: ["Academic deadlines", "Sleep deprivation"],
        effectiveInterventions: ["Morning meditation", "Exercise routine"],
      },
      {
        timeOfDay: "Afternoon (12-4 PM)",
        stressLevel: 5.8,
        commonTriggers: ["Class presentations", "Social interactions"],
        effectiveInterventions: ["Breathing exercises", "Peer support"],
      },
      {
        timeOfDay: "Evening (6-10 PM)",
        stressLevel: 7.1,
        commonTriggers: ["Assignment pressure", "Financial concerns"],
        effectiveInterventions: ["Time management", "Counseling sessions"],
      },
      {
        timeOfDay: "Night (10 PM-2 AM)",
        stressLevel: 8.4,
        commonTriggers: ["Overthinking", "Loneliness", "Future anxiety"],
        effectiveInterventions: [
          "Sleep hygiene",
          "Crisis hotline",
          "Mindfulness apps",
        ],
      },
    ];
    return patterns;
  };

  const runMLAnalysis = async () => {
    setLoading(true);
    // Simulate ML processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setPredictions(generateKNNPredictions());
    setStressPatterns(generateStressPatterns());
    setLoading(false);
  };

  useEffect(() => {
    runMLAnalysis();
  }, [selectedModel]);

  const riskDistribution = [
    { name: "Low Risk", value: 45, color: "#10B981" },
    { name: "Medium Risk", value: 30, color: "#F59E0B" },
    { name: "High Risk", value: 20, color: "#EF4444" },
    { name: "Critical", value: 5, color: "#DC2626" },
  ];

  const modelAccuracy = selectedModel === "knn" ? 0.87 : 0.82;
  const modelPrecision = selectedModel === "knn" ? 0.84 : 0.79;

  const stressTimeData = stressPatterns.map((pattern) => ({
    time: pattern.timeOfDay,
    stress: pattern.stressLevel,
  }));

  const getRiskColor = (risk: string) => {
    // This function returns themed utility classes based on the risk level
    switch (risk) {
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
  const getRiskProgressBarColor = (riskScore: number) => {
    if (riskScore >= 0.8) return "bg-red-500";
    if (riskScore >= 0.6) return "bg-orange-500";
    if (riskScore >= 0.4) return "bg-yellow-500";
    return "bg-green-500";
  };

  // --- Main Render ---
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Brain className="h-8 w-8 text-accent mr-4" />
          <div>
            <h1 className="text-2xl font-bold text-primary">
              ML-Powered Mental Health Insights
            </h1>
            <p className="text-secondary">
              Advanced analytics for early intervention and personalized support
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Themed Select Input */}
          <select
            value={selectedModel}
            onChange={(e) =>
              setSelectedModel(e.target.value as "knn" | "logistic")
            }
            className="border border-theme-divider rounded-md px-3 py-2 text-primary bg-secondary focus:ring-accent focus:border-accent"
          >
            <option value="knn">K-Nearest Neighbors</option>
            <option value="logistic">Logistic Regression</option>
          </select>
          <button
            onClick={runMLAnalysis}
            disabled={loading}
            // Themed Accent Button
            className="bg-accent text-white px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Run Analysis
              </>
            )}
          </button>
        </div>
      </div>

      {/* Model Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* All stats cards use feature-card */}
        <div className="feature-card p-6">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-secondary">
                Model Accuracy
              </p>
              <p className="text-2xl font-bold text-primary">
                {(modelAccuracy * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="feature-card p-6">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-secondary">Precision</p>
              <p className="text-2xl font-bold text-primary">
                {(modelPrecision * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="feature-card p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-secondary">
                Students Analyzed
              </p>
              <p className="text-2xl font-bold text-primary">1,247</p>
            </div>
          </div>
        </div>

        <div className="feature-card p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-secondary">
                High Risk Detected
              </p>
              <p className="text-2xl font-bold text-primary">31</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Predictions List */}
        <div className="feature-card">
          <div className="p-6 border-b border-theme-divider">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-lg font-semibold text-primary">
                Risk Predictions
              </h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div
                  key={index}
                  className="border border-theme-divider rounded-lg p-4 bg-secondary"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-primary">
                      {prediction.studentId}
                    </span>
                    <div className="flex items-center space-x-2">
                      {/* Themed Risk Badge */}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(
                          prediction.predictedOutcome
                        )}`}
                      >
                        {prediction.predictedOutcome.toUpperCase()}
                      </span>
                      <span className="text-sm text-secondary">
                        {(prediction.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm font-medium text-secondary mb-1">
                      Risk Score
                    </div>
                    {/* Themed Progress Bar Container */}
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getRiskProgressBarColor(
                          prediction.riskScore
                        )}`}
                        style={{ width: `${prediction.riskScore * 100}%` }}
                      />
                      {/* Note: The outer progress bar container is bg-secondary (dark/light themed) */}
                    </div>
                    <div className="text-xs text-secondary mt-1">
                      {(prediction.riskScore * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-secondary mb-1">
                        Key Factors:
                      </div>
                      <ul className="text-secondary space-y-1">
                        {prediction.factors.map((factor, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1 h-1 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium text-secondary mb-1">
                        Recommendations:
                      </div>
                      <ul className="text-secondary space-y-1">
                        {prediction.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1 h-1 bg-accent rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Distribution Chart */}
        <div className="feature-card">
          <div className="p-6 border-b border-theme-divider">
            <div className="flex items-center">
              <BarChart3 className="h-6 w-6 text-blue-500 mr-3" />
              <h2 className="text-lg font-semibold text-primary">
                Risk Distribution
              </h2>
            </div>
          </div>
          <div className="p-6">
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
                  formatter={(value) => [`${value}%`, "Percentage"]}
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
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stress Patterns Analysis */}
      <div className="feature-card">
        <div className="p-6 border-b border-theme-divider">
          <div className="flex items-center">
            <TrendingUp className="h-6 w-6 text-green-500 mr-3" />
            <h2 className="text-lg font-semibold text-primary">
              Daily Stress Patterns
            </h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stressTimeData}>
                  {/* Themed Chart */}
                  <CartesianGrid
                    stroke={chartGridColor}
                    strokeDasharray="3 3"
                  />
                  <XAxis dataKey="time" stroke={chartAxisColor} />
                  <YAxis domain={[0, 10]} stroke={chartAxisColor} />
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
                    dataKey="stress"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {stressPatterns.map((pattern, index) => (
                <div
                  key={index}
                  className="border border-theme-divider rounded-lg p-4 bg-secondary"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-primary">
                      {pattern.timeOfDay}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        pattern.stressLevel >= 7
                          ? "badge-danger"
                          : pattern.stressLevel >= 5
                          ? "badge-info"
                          : pattern.stressLevel >= 3
                          ? "badge-success"
                          : "badge-success"
                      }`}
                    >
                      {pattern.stressLevel}/10
                    </span>
                  </div>
                  <div className="text-sm text-secondary mb-2">
                    <strong className="text-primary">Common Triggers:</strong>{" "}
                    {pattern.commonTriggers.join(", ")}
                  </div>
                  <div className="text-sm text-secondary">
                    <strong className="text-primary">
                      Effective Interventions:
                    </strong>{" "}
                    {pattern.effectiveInterventions.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

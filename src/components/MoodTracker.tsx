import React, { useState } from "react";
import { Heart, TrendingUp, Calendar, Smile, Frown, Meh } from "lucide-react";

interface MoodEntry {
  date: string;
  mood: number;
  notes?: string;
  activities: string[];
}

export default function MoodTracker() {
  const [currentMood, setCurrentMood] = useState(5);
  const [notes, setNotes] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const moodHistory: MoodEntry[] = [
    {
      date: "2025-01-15",
      mood: 7,
      notes: "Good day, felt productive",
      activities: ["exercise", "study"],
    },
    {
      date: "2025-01-14",
      mood: 5,
      notes: "Average day",
      activities: ["study"],
    },
    {
      date: "2025-01-13",
      mood: 3,
      notes: "Felt anxious about exams",
      activities: ["meditation"],
    },
    {
      date: "2025-01-12",
      mood: 8,
      notes: "Great day with friends",
      activities: ["social", "exercise"],
    },
    {
      date: "2025-01-11",
      mood: 6,
      notes: "Productive study session",
      activities: ["study", "meditation"],
    },
  ];

  const activities = [
    "exercise",
    "meditation",
    "study",
    "social",
    "sleep",
    "work",
    "hobbies",
    "therapy",
  ];

  const getMoodIcon = (mood: number) => {
    if (mood >= 7) return <Smile className="h-5 w-5 text-green-500" />;
    if (mood >= 4) return <Meh className="h-5 w-5 text-yellow-500" />;
    return <Frown className="h-5 w-5 text-red-500" />;
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 7) return "text-green-600";
    if (mood >= 4) return "text-yellow-600";
    return "text-red-600";
  };

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = () => {
    // Here you would typically save to database
    alert("Mood entry saved!");
    setNotes("");
    setSelectedActivities([]);
  };

  const averageMood =
    moodHistory.reduce((sum, entry) => sum + entry.mood, 0) /
    moodHistory.length;

  if (showHistory) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Themed Icon */}
            <TrendingUp className="h-6 w-6 text-accent mr-3" />
            <h2 className="text-xl font-semibold text-primary">Mood History</h2>
          </div>
          <button
            onClick={() => setShowHistory(false)}
            // Themed Link Button
            className="text-accent hover:opacity-80 font-medium"
          >
            Back to Tracker
          </button>
        </div>

        {/* History Panel */}
        <div className="feature-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {averageMood.toFixed(1)}
              </div>
              <div className="text-sm text-secondary">Average Mood</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {moodHistory.length}
              </div>
              <div className="text-sm text-secondary">Entries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">7</div>
              <div className="text-sm text-secondary">Day Streak</div>
            </div>
          </div>

          <div className="space-y-4">
            {moodHistory.map((entry, index) => (
              <div
                key={index}
                className="border border-theme-divider rounded-lg p-4 bg-secondary"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {/* Themed Icon */}
                    <Calendar className="h-4 w-4 text-secondary mr-2" />
                    <span className="font-medium text-primary">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {getMoodIcon(entry.mood)}
                    <span
                      className={`ml-2 font-bold ${getMoodColor(entry.mood)}`}
                    >
                      {entry.mood}/10
                    </span>
                  </div>
                </div>
                {entry.notes && (
                  <p className="text-sm text-secondary mb-2">{entry.notes}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {entry.activities.map((activity) => (
                    // Themed Activity Tag
                    <span
                      key={activity}
                      className="badge-info px-2 py-1 rounded-full text-xs"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Themed Icon */}
          <Heart className="h-6 w-6 text-accent mr-3" />
          <h2 className="text-xl font-semibold text-primary">
            Daily Mood Tracker
          </h2>
        </div>
        <button
          onClick={() => setShowHistory(true)}
          // Themed Link Button
          className="text-accent hover:opacity-80 font-medium"
        >
          View History
        </button>
      </div>

      {/* Main Tracker Form */}
      <div className="feature-card p-6">
        <div className="space-y-6">
          {/* Mood Scale */}
          <div>
            <label className="block text-sm font-medium text-primary mb-4">
              How are you feeling today? (1 = Very Bad, 10 = Excellent)
            </label>
            <div className="space-y-4">
              <input
                type="range"
                min="1"
                max="10"
                value={currentMood}
                onChange={(e) => setCurrentMood(parseInt(e.target.value))}
                // Note: Styling the range slider track/thumb is done via custom CSS
                // in index.css (or a specific component CSS file) to be fully theme-aware.
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-secondary">
                <span>Very Bad</span>
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {getMoodIcon(currentMood)}
                  <span
                    className={`ml-2 text-2xl font-bold ${getMoodColor(
                      currentMood
                    )}`}
                  >
                    {currentMood}/10
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div>
            <label className="block text-sm font-medium text-primary mb-3">
              What activities did you do today?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {activities.map((activity) => (
                <button
                  key={activity}
                  onClick={() => handleActivityToggle(activity)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedActivities.includes(activity)
                      ? "bg-accent text-white" // Selected: Use accent color
                      : // Default: Use themed secondary background and primary text
                        "bg-secondary text-primary hover-bg-secondary"
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Additional notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="How was your day? Any thoughts or feelings you'd like to record?"
              // Themed Input Box: Secondary background, primary text, themed border/placeholder
              className="w-full border border-theme-divider rounded-md px-3 py-2 focus:ring-accent focus:border-accent bg-secondary text-primary placeholder-themed"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            // Themed Accent Button
            className="w-full bg-accent text-white py-3 px-4 rounded-md hover:opacity-90 focus:ring-2 focus:ring-accent focus:ring-offset-2 font-medium"
          >
            Save Today's Mood
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* All Stat cards use feature-card for consistent look */}
        <div className="feature-card p-4">
          <div className="text-center">
            <div className="text-xl font-bold text-primary">
              {averageMood.toFixed(1)}
            </div>
            <div className="text-sm text-secondary">7-Day Average</div>
          </div>
        </div>
        <div className="feature-card p-4">
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">7</div>
            <div className="text-sm text-secondary">Day Streak</div>
          </div>
        </div>
        <div className="feature-card p-4">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">
              {Math.max(...moodHistory.map((e) => e.mood))}
            </div>
            <div className="text-sm text-secondary">Best This Week</div>
          </div>
        </div>
      </div>
    </div>
  );
}

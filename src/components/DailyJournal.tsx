// src/components/DailyJournal.tsx

import React from "react";
import { FaHeart } from "react-icons/fa"; // Using react-icons for the heart icon

// Helper function to check if a date is yesterday
const isYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()
  );
};

// Helper function to check if a date is today
const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

const DailyJournal: React.FC = () => {
  // --- STATE MANAGEMENT ---
  // In a real app, you would fetch 'streak' and 'lastEntryDate' from your database for the logged-in user.
  const [streak, setStreak] = React.useState<number>(7); // Example streak
  const [lastEntryDate, setLastEntryDate] = React.useState<Date | null>(
    new Date("2025-09-20")
  ); // NOTE: This is yesterday's date based on current time
  const [entry, setEntry] = React.useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = React.useState<string>("");

  const handleSaveEntry = () => {
    if (entry.trim() === "") {
      setFeedbackMessage("Please write something before saving.");
      return;
    }

    // --- STREAK LOGIC ---
    const today = new Date();
    let newStreak = streak;

    if (lastEntryDate) {
      if (isYesterday(lastEntryDate)) {
        // Continued the streak
        newStreak++;
      } else if (!isToday(lastEntryDate)) {
        // Broke the streak, reset to 1
        newStreak = 1;
      }
      // If it's the same day, streak remains unchanged.
    } else {
      // First entry ever
      newStreak = 1;
    }

    setStreak(newStreak);
    setLastEntryDate(today);

    // In a real application, you would make an API call here to save the entry and update the user's streak.
    console.log("Saving Entry:", {
      userId: "current-user-id", // Replace with actual user ID
      entryText: entry,
      newStreak: newStreak,
      entryDate: today.toISOString(),
    });

    // Reset the text area and show a success message
    setEntry("");
    setFeedbackMessage(`Entry saved! Your new streak is ${newStreak} days.`);
    setTimeout(() => setFeedbackMessage(""), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-200 w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Daily Journal</h2>
          <p className="text-gray-500">How are you feeling today?</p>
        </div>
        {/* Streak Counter */}
        <div className="flex items-center space-x-3 bg-red-50 p-3 rounded-full border border-red-200">
          <FaHeart className="text-red-500 text-2xl" />
          <div className="text-center">
            <span className="font-bold text-xl text-red-600">{streak}</span>
            <p className="text-xs text-red-500 -mt-1">day streak</p>
          </div>
        </div>
      </div>

      {/* Text Area for Entry */}
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write about your thoughts, feelings, or anything on your mind..."
        className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-shadow duration-200 resize-none"
      />

      {/* Action Button */}
      <button
        onClick={handleSaveEntry}
        className="w-full mt-4 py-3 px-6 text-white font-bold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
      >
        Save Today's Entry
      </button>

      {/* Feedback Message */}
      {feedbackMessage && (
        <p className="text-center mt-4 text-sm text-gray-600">
          {feedbackMessage}
        </p>
      )}
    </div>
  );
};

export default DailyJournal;

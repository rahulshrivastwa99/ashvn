import React, { useState, useEffect } from "react";
import { Trash2, Edit, Flame } from "lucide-react";

// --- TypeScript type for a single journal entry ---
type JournalEntry = {
  id: number;
  text: string;
  date: string;
};

// Helper functions
const isYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()
  );
};

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
  const [journalTitle, setJournalTitle] = useState<string>(
    "My Wellness Journal"
  );
  const [streak, setStreak] = useState<number>(6);
  const [lastEntryDate, setLastEntryDate] = useState<Date | null>(
    new Date("2025-09-22") // Yesterday's date
  );
  const [entry, setEntry] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  // vvv POPULATED with 6 previous streak posts vvv
  const [pastEntries, setPastEntries] = useState<JournalEntry[]>([
    {
      id: 6,
      text: "Feeling positive about hitting my 7-day goal tomorrow.",
      date: "9/22/2025",
    },
    {
      id: 5,
      text: "A bit stressed, but writing it down helped clear my head.",
      date: "9/21/2025",
    },
    {
      id: 4,
      text: "Went for a long walk today. The fresh air was wonderful.",
      date: "9/20/2025",
    },
    {
      id: 3,
      text: "Felt a bit anxious about the upcoming week, but also hopeful.",
      date: "9/19/2025",
    },
    {
      id: 2,
      text: "Had a really productive day. It felt great to check things off my list.",
      date: "9/18/2025",
    },
    {
      id: 1,
      text: "A quiet day. Spent some time reading which was relaxing.",
      date: "9/17/2025",
    },
  ]);
  // ^^^ POPULATED with 6 previous streak posts ^^^

  const handleSaveEntry = () => {
    if (entry.trim() === "") {
      setFeedbackMessage("Please write something before saving.");
      return;
    }
    const today = new Date();
    let newStreak = streak;

    if (lastEntryDate) {
      if (isYesterday(lastEntryDate)) {
        newStreak = streak + 1;
      } else if (!isToday(lastEntryDate)) {
        newStreak = 0;
      }
    } else {
      newStreak = 1;
    }

    if (streak === 0 && newStreak === 0) {
      newStreak = 1;
    }

    const newEntry: JournalEntry = {
      id: Date.now(),
      text: entry,
      date: today.toLocaleDateString(),
    };
    setPastEntries([newEntry, ...pastEntries]);
    setStreak(newStreak);
    setLastEntryDate(today);
    setEntry("");
    setFeedbackMessage(`Entry saved! Your streak is now ${newStreak} days.`);
    setTimeout(() => setFeedbackMessage(""), 3000);
  };

  const handleDeleteEntry = (idToDelete: number) => {
    const updatedEntries = pastEntries.filter(
      (entry) => entry.id !== idToDelete
    );
    setPastEntries(updatedEntries);
  };

  const handleTitleChange = () => {
    const newTitle = prompt("Enter a new name for your journal:", journalTitle);
    if (newTitle) {
      setJournalTitle(newTitle);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-200 w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center group">
            <h2 className="text-2xl font-bold text-gray-800">{journalTitle}</h2>
            <button
              onClick={handleTitleChange}
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Edit journal title"
            >
              <Edit className="h-4 w-4 text-gray-500 hover:text-teal-600" />
            </button>
          </div>
          <p className="text-gray-500">How are you feeling today?</p>
        </div>

        {/* Yearly Streak Counter with Fire Icon */}
        <div className="text-right border border-gray-200 bg-gray-50 rounded-lg px-4 py-2 flex items-center space-x-3">
          <Flame
            className={`
            h-8 w-8 transition-colors duration-500 
            ${streak >= 3 ? "text-orange-500 animate-pulse" : "text-gray-300"}
          `}
          />
          <div>
            <p className="text-lg font-medium text-gray-500">Streak</p>
            <p className="text-2xl font-bold text-teal-600">
              {streak}{" "}
              <span className="text-base font-medium text-gray-600">days</span>
            </p>
          </div>
        </div>
      </div>

      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write about your thoughts, feelings, or anything on your mind..."
        className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
      />
      <button
        onClick={handleSaveEntry}
        className="w-full mt-4 py-3 px-6 text-white font-bold rounded-lg bg-teal-600 hover:bg-teal-700 transition-colors"
      >
        Save Today's Entry
      </button>
      {feedbackMessage && (
        <p className="text-center mt-4 text-sm text-gray-600">
          {feedbackMessage}
        </p>
      )}

      {/* Diary-style Past Entries */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">
          Past Entries
        </h3>
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {pastEntries.length > 0 ? (
            pastEntries.map((pastEntry) => (
              <div
                key={pastEntry.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-start group"
              >
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    {pastEntry.date}
                  </p>
                  <p className="text-sm text-gray-800 break-words pr-4 whitespace-pre-wrap">
                    {pastEntry.text}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteEntry(pastEntry.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-red-100"
                  aria-label="Delete entry"
                >
                  <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-600" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              Your previous journal entries will appear here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyJournal;

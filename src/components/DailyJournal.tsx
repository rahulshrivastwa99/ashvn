import React, { useState, useEffect } from "react";
import { Trash2, Edit, Flame } from "lucide-react";

// --- TypeScript type for a single journal entry ---
type JournalEntry = {
  id: number;
  text: string;
  date: string;
};

// Helper functions (remain unchanged)
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
  // --- STATE MANAGEMENT (Unchanged) ---
  const [journalTitle, setJournalTitle] = useState<string>(
    "My Wellness Journal"
  );
  const [streak, setStreak] = useState<number>(6);
  const [lastEntryDate, setLastEntryDate] = useState<Date | null>(
    new Date("2025-09-22") // Yesterday's date
  );
  const [entry, setEntry] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

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

  // --- HANDLERS (Unchanged) ---
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
    // KEY FIX 1: Use feature-card for the main journal container
    <div className="feature-card p-6 md:p-8 rounded-xl shadow-md w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center group">
            {/* KEY FIX 2: Text uses theme primary color */}
            <h2 className="text-2xl font-bold text-primary">{journalTitle}</h2>
            <button
              onClick={handleTitleChange}
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Edit journal title"
            >
              {/* KEY FIX 3: Icons use theme secondary/accent colors */}
              <Edit className="h-4 w-4 text-secondary hover:text-accent" />
            </button>
          </div>
          {/* KEY FIX 4: Text uses theme secondary color */}
          <p className="text-secondary">How are you feeling today?</p>
        </div>

        {/* Yearly Streak Counter with Fire Icon */}
        {/* KEY FIX 5: Streak box uses secondary background and theme borders/text */}
        <div className="border border-theme-divider bg-secondary rounded-lg px-4 py-2 flex items-center space-x-3">
          <Flame
            className={`
            h-8 w-8 transition-colors duration-500 
            ${streak >= 3 ? "text-orange-500 animate-pulse" : "text-secondary"}
          `}
          />
          <div>
            {/* KEY FIX 6: Text uses theme secondary/primary colors */}
            <p className="text-lg font-medium text-secondary">Streak</p>
            <p className="text-2xl font-bold text-accent">
              {streak}{" "}
              <span className="text-base font-medium text-secondary">days</span>
            </p>
          </div>
        </div>
      </div>

      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write about your thoughts, feelings, or anything on your mind..."
        // KEY FIX 7: Textarea uses theme background/border/text/placeholder
        className="w-full h-40 p-4 border border-theme-divider rounded-lg focus:ring-2 focus:ring-accent bg-secondary text-primary placeholder-themed"
      />
      <button
        onClick={handleSaveEntry}
        // KEY FIX 8: Button uses accent color
        className="w-full mt-4 py-3 px-6 text-white font-bold rounded-lg bg-accent hover:opacity-90 transition-colors"
      >
        Save Today's Entry
      </button>
      {feedbackMessage && (
        // KEY FIX 9: Text uses theme secondary color
        <p className="text-center mt-4 text-sm text-secondary">
          {feedbackMessage}
        </p>
      )}

      {/* Diary-style Past Entries */}
      <div className="mt-8">
        {/* KEY FIX 10: Header text and border use theme primary/divider */}
        <h3 className="text-lg font-bold text-primary mb-4 border-b border-theme-divider pb-2">
          Past Entries
        </h3>
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {pastEntries.length > 0 ? (
            pastEntries.map((pastEntry) => (
              <div
                key={pastEntry.id}
                // KEY FIX 11: Past entry cards use secondary background and theme border/text
                className="bg-secondary p-4 rounded-lg border border-theme-divider flex justify-between items-start group"
              >
                <div>
                  <p className="text-xs font-semibold text-secondary mb-1">
                    {pastEntry.date}
                  </p>
                  <p className="text-sm text-primary break-words pr-4 whitespace-pre-wrap">
                    {pastEntry.text}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteEntry(pastEntry.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover-bg-secondary"
                  aria-label="Delete entry"
                >
                  {/* KEY FIX 12: Delete icon uses theme secondary/danger colors */}
                  <Trash2 className="h-4 w-4 text-secondary hover:text-red-600" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-secondary text-center py-4">
              Your previous journal entries will appear here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyJournal;

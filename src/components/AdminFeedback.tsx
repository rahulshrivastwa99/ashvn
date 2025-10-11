import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface FeedbackItem {
  id: number;
  message: string;
  created_at: string;
  is_read: boolean;
  user_id: string;
}

// Dummy data to show on the dashboard
const DUMMY_FEEDBACK: FeedbackItem[] = [
  {
    id: 1,
    message:
      "The AI assistant is very helpful, but the interface could be more intuitive. Also, the app is great!",
    created_at: "2025-09-24T10:00Z",
    is_read: false,
    user_id: "a038f21c-7696-4429-a40b-67469b0057da",
  },
  {
    id: 2,
    message:
      "I love the soundscapes feature! It's very calming and helps me focus during my study sessions.",
    created_at: "2025-09-23T15:30Z",
    is_read: true,
    user_id: "c57c341b-cb02-4d0a-ac4e-e59dff115e37",
  },
  {
    id: 3,
    message:
      "The appointments feature is easy to use. Thanks for all your support.",
    created_at: "2025-09-22T08:15Z",
    is_read: true,
    user_id: "9e96f6dc-6a6c-4cfc-8209-0736a4d8c6b3",
  },
];

export default function AdminFeedback() {
  const [feedbackList, setFeedbackList] =
    useState<FeedbackItem[]>(DUMMY_FEEDBACK);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // The useEffect hook for fetching data from Supabase is now commented out
  // You can uncomment this to switch back to live data.
  /*
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const { data, error } = await supabase
          .from("feedback")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setFeedbackList(data as FeedbackItem[]);
        }
      } catch (err) {
        console.error("Failed to load feedback:", err);
        setError("Failed to load feedback. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedback();
  }, []);
  */

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    // Corrected to show year, month, day, hour, and minute
    return date.toLocaleString([], {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center text-secondary">
        <p>Loading feedback...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* KEY FIX 1: Headers use theme primary/secondary text color */}
      <h1 className="text-2xl font-bold text-primary mb-6">
        Feedback Dashboard
      </h1>
      <p className="text-secondary mb-6">
        Review feedback submitted by students.
      </p>

      {feedbackList.length === 0 ? (
        // KEY FIX 2: Empty state uses feature-card background and theme text
        <div className="feature-card p-6 rounded-lg text-center text-secondary border border-theme-divider">
          No feedback has been received yet.
        </div>
      ) : (
        <div className="space-y-4">
          {feedbackList.map((item) => (
            <div
              key={item.id}
              // KEY FIX 3: Individual feedback items use feature-card background and border
              className="feature-card p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center text-sm text-secondary mb-2">
                <Clock size={16} className="mr-2" />
                <span>{formatTimestamp(item.created_at)}</span>
              </div>
              {/* KEY FIX 4: Message text uses theme primary color */}
              <p className="text-primary break-words whitespace-pre-wrap">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

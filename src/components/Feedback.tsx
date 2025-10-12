import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export default function Feedback() {
  const { profile } = useAuth();
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast.error("Feedback cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (!profile?.id) {
        toast.error("You must be logged in to submit feedback.");
        return;
      }

      // NOTE: Assuming your 'feedback' table schema and supabase setup are correct
      const { error } = await supabase.from("feedback").insert({
        message: feedback,
        user_id: profile.id,
      });

      if (error) {
        throw error;
      }

      toast.success("Thank you for your feedback!");
      setFeedback("");
    } catch (error) {
      console.error("Feedback submission error:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* KEY FIX 1: Headers use theme primary/secondary text color */}
      <h1 className="text-2xl font-bold mb-4 text-primary">Provide Feedback</h1>
      <p className="text-secondary mb-6">
        We would love to hear your thoughts, suggestions, or any issues you've
        encountered. Your feedback helps us improve!
      </p>

      {/* KEY FIX 2: Form container uses feature-card for dark background */}
      <form
        onSubmit={handleSubmit}
        className="feature-card p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-primary mb-2"
          >
            Your Feedback
          </label>
          <textarea
            id="feedback"
            rows={6}
            // KEY FIX 3: Textarea uses theme background, border, text, and placeholder classes
            className="w-full px-3 py-2 border border-theme-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-secondary text-primary placeholder-themed"
            placeholder="Type your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            // KEY FIX 4: Button uses accent color
            className="bg-accent text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {/* Note: ToastContainer needs no theming as it renders outside the main DOM structure */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

import React, { useState } from "react";
import { Heart, Shield, Lock, Globe } from "lucide-react";
import { Link } from "react-router-dom";
// NOTE: Assuming useAuth is imported correctly based on previous context.

const Auth = () => {
  // Mock States for the Form
  const [isSigningUp, setIsSigningUp] = useState(true);
  const [role, setRole] = useState("Student");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle Sign In or Sign Up logic here
    console.log("Submitted:", formData, "Role:", role);
  };

  // Theme classes defined in index.css:
  const inputClass =
    "w-full px-3 py-3 rounded-lg border border-theme-divider bg-secondary text-primary placeholder-themed focus:ring-accent focus:border-accent";
  const labelClass = "block text-sm font-medium text-primary mb-2";

  return (
    // The outer container for the Auth page is handled by the app-container class
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-6">
        <Heart className="h-10 w-10 text-accent mx-auto" />
        <h1 className="text-xl font-bold text-primary mt-2">Ashvaan</h1>
        <p className="text-sm text-secondary">
          Stigma-free mental health support for students
        </p>
      </div>

      {/* Main Form Container */}
      {/* KEY FIX: Uses feature-card for the background of the form panel */}
      <div className="feature-card p-8 rounded-xl shadow-2xl w-full max-w-md">
        {/* Tabs */}
        <div className="flex justify-center border-b border-theme-divider mb-6">
          <button
            onClick={() => setIsSigningUp(false)}
            className={`py-2 px-6 text-lg font-medium transition-colors ${
              !isSigningUp
                ? "text-accent border-b-2 border-accent"
                : "text-secondary hover:text-primary"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSigningUp(true)}
            className={`py-2 px-6 text-lg font-medium transition-colors ${
              isSigningUp
                ? "text-accent border-b-2 border-accent"
                : "text-secondary hover:text-primary"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name (Sign Up Only) */}
          {isSigningUp && (
            <div>
              <label htmlFor="fullName" className={labelClass}>
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={inputClass}
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={inputClass}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={inputClass}
              required
            />
          </div>

          {/* Role (Sign Up Only) */}
          {isSigningUp && (
            <div>
              <label htmlFor="role" className={labelClass}>
                Role
              </label>
              {/* Theme classes applied to select */}
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={inputClass}
              >
                <option value="Student">Student</option>
                <option value="Counsellor">Counsellor</option>
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            // Theme button
            className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-colors mt-6"
          >
            {isSigningUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Footer Links/Icons */}
        <div className="mt-6 text-center">
          <Link
            to="/get-started"
            className="text-sm text-accent hover:underline"
          >
            — Back to Welcome Page
          </Link>
          <div className="flex justify-center space-x-6 text-xs text-secondary mt-4">
            <span className="flex items-center">
              <Shield className="h-3 w-3 mr-1" /> Secure
            </span>
            <span className="flex items-center">
              <Lock className="h-3 w-3 mr-1" /> Anonymous
            </span>
            <span className="flex items-center">
              <Heart className="h-3 w-3 mr-1" /> Confidential
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

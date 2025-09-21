import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import studentMentalHealth from "../assets/Homepage.jpg";
import {
  Heart,
  Shield,
  Users,
  Brain,
  MessageCircle,
  Calendar,
  BookOpen,
  AlertTriangle,
} from "lucide-react";

export default function GetStarted() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, fullName, role);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-teal-600 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-gray-900">Ashvaan</h1>
            <p className="mt-2 text-sm text-gray-600">
              Stigma-free mental health support for students
            </p>
          </div>

          <div className="bg-white py-8 px-6 shadow-xl rounded-lg border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 text-sm font-medium border-b-2 ${
                    isLogin
                      ? "border-teal-600 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 text-sm font-medium border-b-2 ${
                    !isLogin
                      ? "border-teal-600 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {!isLogin && (
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required={!isLogin}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {!isLogin && (
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="counsellor">Counsellor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
              >
                {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
              </button>
            </form>

            <div className="mt-6">
              <button
                onClick={() => setShowAuth(false)}
                className="w-full text-center text-sm text-teal-600 hover:text-teal-700"
              >
                ← Back to Welcome Page
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-gray-500">
              <div className="flex items-center justify-center">
                <Shield className="h-4 w-4 mr-1 text-teal-500" />
                Secure
              </div>
              <div className="flex items-center justify-center">
                <Users className="h-4 w-4 mr-1 text-teal-500" />
                Anonymous
              </div>
              <div className="flex items-center justify-center">
                <Heart className="h-4 w-4 mr-1 text-teal-500" />
                Confidential
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-gray-800 flex flex-col min-h-screen bg-gradient-to-b from-teal-50 via-white to-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-teal-600 mr-3" />
              <h1 className="text-2xl font-bold text-teal-600">Ashvaan</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowAuth(true);
                  setIsLogin(true);
                }}
                className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setShowAuth(true);
                  setIsLogin(false);
                }}
                className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative flex flex-col items-center justify-between flex-1 px-6 py-16 overflow-hidden">
        {/* Decorative emojis */}
        <div className="absolute top-10 left-10 text-6xl opacity-10">🧠</div>
        <div className="absolute bottom-20 right-16 text-7xl opacity-10">
          ❤️
        </div>
        <div className="absolute top-40 right-1/3 text-5xl opacity-10">💬</div>
        <div className="absolute bottom-10 left-1/4 text-6xl opacity-10">
          🤝
        </div>

        {/* Hero Section */}
        <div className="text-center mb-10 relative z-10">
          <h1
            className="text-5xl md:text-6xl font-extrabold 
            bg-gradient-to-r from-emerald-400  via-teal-500 to-emerald-400 
            bg-clip-text text-transparent animate-gradient 
            drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
          >
            Welcome to Ashvaan
          </h1>
          <p className="text-lg text-gray-700 mt-3 animate-slide-up">
            A safe space for students to prioritize mental health and well-being
            💬
          </p>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl text-center mb-16">
          <div className="flex items-center justify-center mt-6">
            <h2 className="text-2xl md:text-3xl font-bold text-teal-600">
              Helping You Thrive, Not Just Survive
            </h2>
          </div>
          <p className="text-lg text-gray-600 mb-8 mt-4 max-w-2xl mx-auto">
            College life can be exciting, but also overwhelming. Whether it’s
            exams, homesickness, or stress, you don’t have to face it alone.
          </p>
          <button
            onClick={() => {
              setShowAuth(true);
              setIsLogin(false);
            }}
            className="px-8 py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-lg text-lg font-medium transition-colors"
          >
            Start Your Journey
          </button>
        </div>

        {/* Features Section */}
        {/* Features Section */}
        <div className="w-full max-w-6xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How Ashvaan Supports Your Mental Health
          </h3>
          {/* Dashboard Important Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Self-Assessment */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl hover:scale-[1.05] transition-shadow transition-transform duration-300">
              <div className="bg-teal-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-md">
                <MessageCircle className="h-8 w-8 text-teal-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-900">
                Self-Assessment
              </h4>
              <p className="text-gray-600 text-sm">
                Take control by understanding your mental health better with
                guided self-assessments.
              </p>
            </div>

            {/* AI Assistant */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl hover:scale-[1.05] transition-shadow transition-transform duration-300">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-md">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-900">
                AI Assistant
              </h4>
              <p className="text-gray-600 text-sm">
                Receive personalized, compassionate AI support anytime to help
                you cope and thrive.
              </p>
            </div>

            {/* Appointments */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl hover:scale-[1.05] transition-shadow transition-transform duration-300">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-md">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-900">
                Appointments
              </h4>
              <p className="text-gray-600 text-sm">
                Easily book private sessions with trusted mental health
                professionals.
              </p>
            </div>

            {/* Mood Tracker */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl hover:scale-[1.05] transition-shadow transition-transform duration-300">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-md">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-900">
                Mood Tracker
              </h4>
              <p className="text-gray-600 text-sm">
                Gain insight into your emotions and build awareness with simple
                mood tracking.
              </p>
            </div>

            {/* Daily Journal */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl hover:scale-[1.05] transition-shadow transition-transform duration-300">
              <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-md">
                <BookOpen className="h-8 w-8 text-yellow-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-900">
                Daily Journal
              </h4>
              <p className="text-gray-600 text-sm">
                Reflect safely on your day and nurture your mental wellness
                through journaling.
              </p>
            </div>

            {/* Peer Support */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl hover:scale-[1.05] transition-shadow transition-transform duration-300">
              <div className="bg-cyan-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-md">
                <Users className="h-8 w-8 text-cyan-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-900">
                Peer Support
              </h4>
              <p className="text-gray-600 text-sm">
                Join a compassionate community that understands your journey and
                supports you anonymously.
              </p>
            </div>

            {/* Crisis Support */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl hover:scale-[1.05] transition-shadow transition-transform duration-300">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-md">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-900">
                Crisis Support
              </h4>
              <p className="text-gray-600 text-sm">
                Get immediate, reliable help in times of need from trusted
                crisis resources.
              </p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-16">
          <img
            src={studentMentalHealth}
            alt="Student Mental Health"
            className="w-96 h-96 object-cover rounded-full shadow-2xl hover:scale-105 transition-transform duration-500 border-4 border-teal-500 mx-auto"
          />
        </div>

        {/* Testimonials */}
        <div className="w-full max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            What Students Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-teal-50 to-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-300">
              <p className="text-gray-700 italic mb-4">
                "Ashvaan helped me through my toughest semester. The AI
                assistant was always there when I needed someone to talk to."
              </p>
              <div className="text-sm text-gray-500">- Anonymous Student</div>
            </div>
            <div className="bg-gradient-to-r from-teal-50 to-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-300">
              <p className="text-gray-700 italic mb-4">
                "The peer support forum made me realize I wasn't alone. It's
                comforting to know other students face similar challenges."
              </p>
              <div className="text-sm text-gray-500">- Anonymous Student</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-teal-600 rounded-lg p-8 text-white text-center max-w-2xl mx-auto shadow-xl">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Start Your Mental Health Journey?
          </h3>
          <p className="mb-6">
            Join thousands of students who have found support and healing
            through Ashvaan.
          </p>
          <button
            onClick={() => {
              setShowAuth(true);
              setIsLogin(false);
            }}
            className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Create Your Account
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-6 w-6 text-teal-400 mr-2" />
            <span className="text-xl font-bold">Ashvaan</span>
          </div>
          <p className="text-gray-400 mb-4">
            Stigma-free mental health support for students
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

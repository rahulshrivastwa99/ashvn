import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  X,
  Heart,
  MessageCircle,
  Calendar,
  BookOpen,
  BarChart3,
  Activity,
  AlertTriangle,
  Brain,
  Settings,
  LogOut,
  User,
  Bot,
  Music,
  Notebook,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// vvv REORDERED THIS ARRAY TO MATCH YOUR LIST vvv
const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: BarChart3,
    allowedRoles: ["admin", "student", "counsellor"],
  },
  {
    name: "AI Assistant",
    href: "/aiassitant",
    icon: Bot,
    allowedRoles: ["student", "counsellor"],
  },
  {
    name: "Self-Assessment",
    href: "/selfassessment",
    icon: MessageCircle,
    allowedRoles: ["student"],
  },
  {
    name: "Appointments",
    href: "/appointments",
    icon: Calendar,
    allowedRoles: ["student", "counsellor"],
  },
  {
    name: "Daily Journal",
    href: "/daily-journal",
    icon: Notebook,
    allowedRoles: ["student"],
  },
  {
    name: "Sound Scapes",
    href: "/sound-scapes",
    icon: Music,
    allowedRoles: ["student", "counsellor"],
  },
  {
    name: "Mood Tracker",
    href: "/mood",
    icon: Activity,
    allowedRoles: ["student"],
  },
  {
    name: "Resources",
    href: "/resources",
    icon: BookOpen,
    allowedRoles: ["student", "counsellor"],
  },
  {
    name: "Peer Support",
    href: "/forum",
    icon: Heart,
    allowedRoles: ["student", "counsellor"],
  },
  {
    name: "Crisis Support",
    href: "/crisis",
    icon: AlertTriangle,
    allowedRoles: ["student", "admin"],
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
    allowedRoles: ["admin", "student", "counsellor"],
  },
  { name: "Students", href: "/students", icon: User, allowedRoles: ["admin"] },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    allowedRoles: ["admin", "counsellor"],
  },
  {
    name: "ML Insights",
    href: "/ml-insights",
    icon: Brain,
    allowedRoles: ["admin", "counsellor"],
  },
  { name: "Users", href: "/users", icon: User, allowedRoles: ["admin"] },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    allowedRoles: ["admin", "student", "counsellor"],
  },
];
// ^^^ REORDERED THIS ARRAY TO MATCH YOUR LIST ^^^

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const role = profile?.role || "student";

  const filteredNavItems = navItems.filter((item) =>
    item.allowedRoles.includes(role)
  );

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            onClick={onClose}
          />
          <nav className="fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-xl">
            <div className="p-4 border-b dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-teal-600">Ashvaan</h1>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      location.pathname === item.href
                        ? "bg-teal-50 text-teal-600 font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-gray-700 hover:text-teal-600"
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Desktop sidebar */}
      <nav className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white dark:bg-gray-800 shadow-lg h-screen overflow-y-auto">
        <div className="p-6 border-b dark:border-gray-700">
          <h1 className="text-2xl font-bold text-teal-600">Ashvaan</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Mental Health Support</p>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {filteredNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
            <div className="mt-8 pt-8 border-t dark:border-gray-700">
                    ? "bg-teal-50 text-teal-600 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-gray-700 hover:text-teal-600"
                className="flex items-center w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-teal-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {profile?.full_name || "Guest User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {profile?.role || "No role"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </nav>
    </>
  );
}

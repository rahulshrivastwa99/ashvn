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
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: BarChart3,
    allowedRoles: ["admin", "student", "counsellor"],
  },
  {
    name: "AI Assistant",
    href: "/chat",
    icon: MessageCircle,
    allowedRoles: ["admin", "student", "counsellor"],
  },
  {
    name: "Chatbot",
    href: "/chatbot",
    icon: Bot,
    allowedRoles: ["admin", "student", "counsellor"],
  },
  {
    name: "Appointments",
    href: "/appointments",
    icon: Calendar,
    allowedRoles: ["student", "counsellor"],
  },
  {
    name: "Mood Tracker",
    href: "/mood",
    icon: Activity,
    allowedRoles: ["student"],
  },
  {
    name: "Daily Journal",
    href: "/daily-journal",
    icon: BookOpen,
    allowedRoles: ["student"],
  },
  {
    name: "Resources",
    href: "/resources",
    icon: Brain,
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
    allowedRoles: ["admin", "student"],
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

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const role = profile?.role || "student"; // default for safety

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
          <nav className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-xl">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-teal-600">Ashvaan</h1>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
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
                        : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
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
      <nav className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white shadow-lg h-screen overflow-y-auto">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-teal-600">Ashvaan</h1>
          <p className="text-sm text-gray-600 mt-1">Mental Health Support</p>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {filteredNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.href
                    ? "bg-teal-50 text-teal-600 font-medium"
                    : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-teal-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {profile?.full_name || "Guest User"}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {profile?.role || "No role"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </nav>
    </>
  );
}

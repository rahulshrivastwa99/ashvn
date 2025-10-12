import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
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
  MessageSquare,
  Moon,
  Sun,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  // ... (navItems array remains unchanged) ...
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

const studentNavItems = navItems.filter((item) =>
  item.allowedRoles.includes("student")
);
const adminNavItems = navItems.filter((item) =>
  item.allowedRoles.includes("admin")
);

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { profile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
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

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            onClick={onClose}
          />
          {/* THEME APPLIED: Using custom class for container */}
          <nav className="fixed top-0 left-0 bottom-0 w-64 shadow-xl sidebar-container">
            {/* THEME APPLIED: Header uses custom border/text classes */}
            <div className="p-4 sidebar-header-container">
              <div className="flex items-center justify-between">
                {/* Text accent for the logo */}
                <h1 className="text-xl font-bold text-accent">Ashvaan</h1>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md transition-colors sidebar-close-button"
                >
                  <X className="h-5 w-5 lucide-icon-primary" />
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
                    className={`flex items-center px-3 py-2 rounded-md transition-colors sidebar-nav-item ${
                      isActive(item.href)
                        ? "sidebar-active-link"
                        : "sidebar-default-link"
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                ))}
              </div>
              {/* THEME APPLIED: Separator uses custom class */}
              <div className="mt-8 pt-8 sidebar-separator">
                {profile?.role === "student" && (
                  <Link
                    to="/feedback"
                    onClick={onClose}
                    className="flex items-center w-full px-3 py-2 rounded-md transition-colors sidebar-default-link"
                  >
                    <MessageSquare className="h-5 w-5 mr-3" />
                    Feedback
                  </Link>
                )}
                {/* Logout uses hardcoded red for safety/visibility */}
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
      {/* THEME APPLIED: Using custom class for container, replaces bg-white and inline style */}
      <nav className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col shadow-lg h-screen overflow-y-auto sidebar-container">
        {/* THEME APPLIED: Header uses custom border class */}
        <div className="p-6 sidebar-header-container">
          <div className="flex items-center justify-between">
            <div>
              {/* Text accent for the logo */}
              <h1 className="text-2xl font-bold text-accent">Ashvaan</h1>
              {/* Text secondary for the description */}
              <p className="text-sm mt-1 text-secondary">
                Mental Health Support
              </p>
            </div>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md sidebar-toggle-button"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 lucide-icon-primary" />
              ) : (
                <Sun className="h-5 w-5 lucide-icon-primary" />
              )}
            </button>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {filteredNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-md transition-colors sidebar-nav-item ${
                  isActive(item.href)
                    ? "sidebar-active-link"
                    : "sidebar-default-link"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        {/* THEME APPLIED: Footer uses custom border class */}
        <div className="p-4 sidebar-footer-container">
          {/* Feedback link */}
          <Link
            to={role === "admin" ? "/admin-feedback" : "/feedback"}
            className={`flex items-center w-full px-3 py-2 rounded-md transition-colors mb-4 sidebar-nav-item ${
              isActive("/feedback") || isActive("/admin-feedback")
                ? "sidebar-active-link"
                : "sidebar-default-link"
            }`}
          >
            <MessageSquare className="h-5 w-5 mr-3" />
            {role === "admin" ? "Feedback Provided" : "Feedback"}
          </Link>

          {/* User Profile Info */}
          <div className="flex items-center my-4">
            {/* THEME APPLIED: Avatar background uses custom class */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center sidebar-avatar-bg">
              <User className="h-4 w-4 text-accent" />
            </div>
            <div className="ml-3">
              {/* THEME APPLIED: Text uses custom classes */}
              <p className="text-sm font-medium text-primary">
                {profile?.full_name || "Guest User"}
              </p>
              <p className="text-xs capitalize text-secondary">
                {profile?.role || "No role"}
              </p>
            </div>
          </div>
          {/* Logout uses hardcoded red for safety/visibility */}
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

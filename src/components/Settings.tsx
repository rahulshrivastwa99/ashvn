import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import {
  Bell,
  Palette,
  Save,
  Sun,
  Moon,
  Building2,
  Users,
  Globe,
  Shield,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

// --- Type Definitions for Clarity (Unchanged) ---
type NotificationSettingsType = {
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushNotifications: boolean;
  riskThreshold: "medium" | "high" | "critical";
};

type GlobalSettingsType = {
  institution: { name: string; contactEmail: string; emergencyNumber: string };
  system: { maintenanceMode: boolean; registrationOpen: boolean };
  localization: { defaultLanguage: string; timezone: string };
};

// --- Initial States (Unchanged) ---
const initialGlobalSettings: GlobalSettingsType = {
  institution: {
    name: "State University",
    contactEmail: "admin@university.edu",
    emergencyNumber: "1-800-273-8255",
  },
  system: { maintenanceMode: false, registrationOpen: true },
  localization: { defaultLanguage: "English", timezone: "Asia/Kolkata" },
};

const defaultUserSettings: { notifications: NotificationSettingsType } = {
  notifications: {
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    riskThreshold: "high",
  },
};

// =================================================================
// Sub-component for User's Notification Settings (Themed)
// =================================================================
const UserNotificationSettings = ({
  settings,
  onUpdate,
}: {
  settings: NotificationSettingsType;
  onUpdate: (
    key: keyof NotificationSettingsType,
    value: any,
    name: string
  ) => void;
}) => (
  <div className="p-6 md:p-8">
    <h2 className="text-xl font-semibold text-primary mb-6 flex items-center">
      <Bell className="h-5 w-5 mr-3 text-accent" />
      Notification Settings
    </h2>
    <div className="space-y-6">
      {/* Email Alerts */}
      <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
        <div>
          <h3 className="text-sm font-medium text-primary">Email Alerts</h3>
          <p className="text-sm text-secondary">
            Receive email notifications for important events.
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.emailAlerts}
          onChange={(e) =>
            onUpdate("emailAlerts", e.target.checked, "Email Alerts")
          }
          className="h-5 w-5 rounded border-theme-divider text-accent focus:ring-accent bg-secondary"
        />
      </div>
      {/* SMS Alerts */}
      <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
        <div>
          <h3 className="text-sm font-medium text-primary">SMS Alerts</h3>
          <p className="text-sm text-secondary">
            Receive SMS for critical alerts and emergencies.
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.smsAlerts}
          onChange={(e) =>
            onUpdate("smsAlerts", e.target.checked, "SMS Alerts")
          }
          className="h-5 w-5 rounded border-theme-divider text-accent focus:ring-accent bg-secondary"
        />
      </div>
      {/* Push Notifications */}
      <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
        <div>
          <h3 className="text-sm font-medium text-primary">
            Push Notifications
          </h3>
          <p className="text-sm text-secondary">
            Receive browser push notifications.
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.pushNotifications}
          onChange={(e) =>
            onUpdate(
              "pushNotifications",
              e.target.checked,
              "Push Notifications"
            )
          }
          className="h-5 w-5 rounded border-theme-divider text-accent focus:ring-accent bg-secondary"
        />
      </div>
    </div>
  </div>
);

// =================================================================
// Sub-component for User's Appearance Settings (Theme Buttons FIXED)
// =================================================================
const UserAppearanceSettings = () => {
  // Uses the global useTheme hook
  const { theme, toggleTheme } = useTheme();

  // Helper to change theme to a specific mode
  const setSpecificTheme = (newTheme: "light" | "dark") => {
    // Toggle if the current theme is NOT the desired theme
    if (theme !== newTheme) {
      toggleTheme();
    }
  };

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-xl font-semibold text-primary mb-6 flex items-center">
        <Palette className="h-5 w-5 mr-3 text-accent" />
        Appearance
      </h2>
      <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
        <span className="text-sm font-medium text-primary">Theme Mode</span>
        <div className="flex space-x-3">
          {/* LIGHT MODE BUTTON (FIXED VISIBILITY) */}
          <button
            onClick={() => setSpecificTheme("light")}
            className={`flex items-center px-4 py-2 rounded-md transition ${
              theme === "light"
                ? "bg-accent text-white shadow-md" // Active state (Accent)
                : "bg-secondary text-primary border border-theme-divider hover-bg-secondary" // Inactive state
            }`}
          >
            <Sun className="h-4 w-4 mr-2" /> Light
          </button>
          {/* DARK MODE BUTTON */}
          <button
            onClick={() => setSpecificTheme("dark")}
            className={`flex items-center px-4 py-2 rounded-md transition ${
              theme === "dark"
                ? "bg-accent text-white shadow-md" // Active state (Accent)
                : "bg-secondary text-primary border border-theme-divider hover-bg-secondary" // Inactive state
            }`}
          >
            <Moon className="h-4 w-4 mr-2" /> Dark
          </button>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// Main Settings Component
// =================================================================
export default function Settings() {
  const { profile, loading } = useAuth();
  useTheme();
  const [userSettings, setUserSettings] = useState(defaultUserSettings);

  const userRole = profile?.role || "student";

  const availableTabs = [
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "appearance", name: "Appearance", icon: Palette },
  ];

  const [activeTab, setActiveTab] = useState(availableTabs[0].id);

  useEffect(() => {
    setActiveTab(availableTabs[0].id);
  }, [userRole]);

  const updateUserSettings = (
    section: "notifications",
    key: string,
    value: any,
    settingName: string
  ) => {
    setUserSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
    toast.success(`${settingName} ${value ? "enabled" : "disabled"}.`);
  };

  const handleSave = () => {
    // ... API call logic
    alert("Settings saved successfully!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "notifications":
        return (
          <UserNotificationSettings
            settings={userSettings.notifications}
            onUpdate={(key, value, name) =>
              updateUserSettings("notifications", key, value, name)
            }
          />
        );
      case "appearance":
        return <UserAppearanceSettings />;
      default:
        return <div>Content not found.</div>;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Please log in to access settings.</div>;

  return (
    <div className="min-h-screen">
      <Toaster position="bottom-right" />

      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-6 text-white mb-8">
        <h1 className="text-2xl font-bold mb-2 text-header-primary">
          {userRole === "admin" ? "System Settings" : "My Settings"}
        </h1>
        <p className="text-header-secondary">
          Configure platform and personal preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 px-6">
        {/* Sidebar Navigation */}
        <nav className="w-full lg:w-64 flex-shrink-0">
          <div className="feature-card rounded-xl p-4">
            <div className="space-y-2">
              {availableTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "sidebar-active-link font-medium shadow-sm"
                      : "sidebar-default-link hover-bg-secondary"
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1">
          <div className="feature-card rounded-xl">{renderContent()}</div>
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleSave}
          className="bg-accent text-white px-6 py-3 rounded-lg hover:opacity-90 focus:ring-2 focus:ring-accent focus:ring-offset-2 flex items-center shadow-lg hover:shadow-xl transition-all"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast"; // Import toast
import {
  Settings as SettingsIcon,
  Building2,
  Users,
  Bell,
  Palette,
  Globe,
  Save,
  Sun,
  Shield,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

// --- Type Definitions for Clarity ---
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

// --- Initial States ---
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
// Sub-component for User's Notification Settings
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
    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
      <Bell className="h-5 w-5 mr-3 text-teal-600" />
      Notification Settings
    </h2>
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Email Alerts</h3>
          <p className="text-sm text-gray-600">
            Receive email notifications for important events.
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.emailAlerts}
          onChange={(e) =>
            onUpdate("emailAlerts", e.target.checked, "Email Alerts")
          }
          className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
        />
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h3 className="text-sm font-medium text-gray-900">SMS Alerts</h3>
          <p className="text-sm text-gray-600">
            Receive SMS for critical alerts and emergencies.
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.smsAlerts}
          onChange={(e) =>
            onUpdate("smsAlerts", e.target.checked, "SMS Alerts")
          }
          className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
        />
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            Push Notifications
          </h3>
          <p className="text-sm text-gray-600">
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
          className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
        />
      </div>
    </div>
  </div>
);

// =================================================================
// Sub-component for User's Appearance Settings
// =================================================================
const UserAppearanceSettings = ({
  theme,
  setTheme,
}: {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}) => (
  <div className="p-6 md:p-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
      <Palette className="h-5 w-5 mr-3 text-teal-600" />
      Appearance
    </h2>
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <span className="text-sm font-medium text-gray-900">Theme Mode</span>
      <div className="flex space-x-3">
        <button
          onClick={() => setTheme("light")}
          className={`flex items-center px-4 py-2 rounded-md transition ${
            theme === "light"
              ? "bg-teal-600 text-white shadow-md"
              : "bg-white border border-gray-300 hover:bg-gray-50"
          }`}
        >
          <Sun className="h-4 w-4 mr-2" /> Light
        </button>
      </div>
    </div>
  </div>
);

// =================================================================
// Main Settings Component
// =================================================================
export default function Settings() {
  const { profile, loading } = useAuth();
  const [userSettings, setUserSettings] = useState(defaultUserSettings);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [globalSettings, setGlobalSettings] = useState(initialGlobalSettings);
  const userRole = profile?.role || "student";

  const adminTabs = [
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "appearance", name: "Appearance", icon: Palette },
    // ... other admin tabs
  ];
  const studentTabs = [
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "appearance", name: "Appearance", icon: Palette },
  ];

  const availableTabs = userRole === "admin" ? adminTabs : studentTabs;
  const [activeTab, setActiveTab] = useState(availableTabs[0].id);

  useEffect(() => {
    setActiveTab(availableTabs[0].id);
  }, [userRole]);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }, [theme]);

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
        return <UserAppearanceSettings theme={theme} setTheme={setTheme} />;
      default:
        return <div>Content not found.</div>;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Please log in to access settings.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="bottom-right" />

      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-6 text-white mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {userRole === "admin" ? "System Settings" : "My Settings"}
        </h1>
        <p className="text-teal-100">
          Configure platform and personal preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 px-6">
        {/* Sidebar */}
        <nav className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="space-y-2">
              {availableTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-teal-50 text-teal-600 font-medium shadow-sm"
                      : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleSave}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center shadow-lg hover:shadow-xl transition-all"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

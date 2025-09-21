import React, { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Building2,
  Users,
  Bell,
  Palette,
  Globe,
  Save,
  Sun,
  Moon,
  Shield,
  UserSwitch,
} from "lucide-react";

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

// --- Initial States (Simulating a Database/API response) ---
const initialGlobalSettings: GlobalSettingsType = {
  institution: {
    name: "State University",
    contactEmail: "admin@university.edu",
    emergencyNumber: "1-800-273-8255",
  },
  system: {
    maintenanceMode: false,
    registrationOpen: true,
  },
  localization: {
    defaultLanguage: "English",
    timezone: "Asia/Kolkata",
  },
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
  onUpdate: (key: keyof NotificationSettingsType, value: any) => void;
}) => (
  <div className="p-6">
    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
      My Notification Settings
    </h2>
    <div className="space-y-6">
      {/* Email Alerts Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Email Alerts
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Receive email notifications for important events.
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.emailAlerts}
          onChange={(e) => onUpdate("emailAlerts", e.target.checked)}
          className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
        />
      </div>
      {/* SMS Alerts Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            SMS Alerts
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Receive SMS for critical alerts and emergencies.
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.smsAlerts}
          onChange={(e) => onUpdate("smsAlerts", e.target.checked)}
          className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
        />
      </div>
      {/* Push Notifications Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Push Notifications
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Receive browser push notifications.
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.pushNotifications}
          onChange={(e) => onUpdate("pushNotifications", e.target.checked)}
          className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
        />
      </div>
      {/* Risk Threshold Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Risk Alert Threshold
        </label>
        <select
          value={settings.riskThreshold}
          onChange={(e) => onUpdate("riskThreshold", e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 focus:ring-teal-500 focus:border-teal-500"
        >
          <option value="medium">Medium Risk and Above</option>
          <option value="high">High Risk and Above</option>
          <option value="critical">Critical Risk Only</option>
        </select>
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
  <div className="p-6">
    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
      Appearance
    </h2>
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700 dark:text-gray-300">
        Theme Mode
      </span>
      <div className="flex space-x-3">
        <button
          onClick={() => setTheme("light")}
          className={`flex items-center px-4 py-2 rounded-md transition ${
            theme === "light"
              ? "bg-teal-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          <Sun className="h-4 w-4 mr-2" /> Light
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`flex items-center px-4 py-2 rounded-md transition ${
            theme === "dark"
              ? "bg-teal-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          <Moon className="h-4 w-4 mr-2" /> Dark
        </button>
      </div>
    </div>
  </div>
);

// =================================================================
// Sub-component for Admin's System Settings
// =================================================================
const AdminSystemSettings = ({
  settings,
  onUpdate,
}: {
  settings: GlobalSettingsType["system"];
  onUpdate: (key: keyof GlobalSettingsType["system"], value: any) => void;
}) => (
  <div className="p-6">
    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
      System Configuration
    </h2>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Maintenance Mode
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Temporarily disable access for system updates.
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.maintenanceMode}
          onChange={(e) => onUpdate("maintenanceMode", e.target.checked)}
          className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Open Registration
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Allow new students to register on the platform.
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.registrationOpen}
          onChange={(e) => onUpdate("registrationOpen", e.target.checked)}
          className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
        />
      </div>
    </div>
  </div>
);

// =================================================================
// Main Settings Component
// =================================================================
export default function Settings() {
  const [currentUserRole, setCurrentUserRole] = useState<"student" | "admin">(
    "student"
  );

  // State for user-specific settings
  const [userSettings, setUserSettings] = useState(defaultUserSettings);
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "dark"
  );

  // State for global (admin-only) settings
  const [globalSettings, setGlobalSettings] = useState(initialGlobalSettings);

  // Determine the active tab, defaulting to the first available tab
  const adminTabs = [
    { id: "institution", name: "Institution", icon: Building2 },
    { id: "system", name: "System", icon: SettingsIcon },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "appearance", name: "Appearance", icon: Palette },
    { id: "localization", name: "Localization", icon: Globe },
  ];

  const studentTabs = [
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "appearance", name: "Appearance", icon: Palette },
  ];

  const availableTabs = currentUserRole === "admin" ? adminTabs : studentTabs;
  const [activeTab, setActiveTab] = useState(availableTabs[0].id);

  // This effect resets the active tab if the role changes to prevent errors
  useEffect(() => {
    setActiveTab(availableTabs[0].id);
  }, [currentUserRole]);

  // Apply theme to the document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // --- Update Handlers ---
  const updateUserSettings = (
    section: "notifications",
    key: string,
    value: any
  ) => {
    setUserSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const updateGlobalSettings = (
    section: keyof GlobalSettingsType,
    key: string,
    value: any
  ) => {
    setGlobalSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  // --- Save Handler ---
  const handleSave = () => {
    if (currentUserRole === "admin") {
      console.log("Saving Global Settings:", globalSettings);
      // API call to save global settings would go here
    }
    console.log("Saving User Settings:", userSettings);
    // API call to save user-specific settings would go here
    alert("Settings saved successfully!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "notifications":
        return (
          <UserNotificationSettings
            settings={userSettings.notifications}
            onUpdate={(key, value) =>
              updateUserSettings("notifications", key, value)
            }
          />
        );
      case "appearance":
        return <UserAppearanceSettings theme={theme} setTheme={setTheme} />;
      case "system":
        return currentUserRole === "admin" ? (
          <AdminSystemSettings
            settings={globalSettings.system}
            onUpdate={(key, value) =>
              updateGlobalSettings("system", key, value)
            }
          />
        ) : null;
      // Add cases for 'institution', 'localization' etc. for the admin view
      default:
        return (
          <div className="p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {availableTabs.find((t) => t.id === activeTab)?.name}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Content for this section is under construction.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {currentUserRole === "admin" ? "System Settings" : "My Settings"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure platform and personal preferences.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* --- DEMO ONLY: Role Switcher --- */}
          <div className="flex items-center rounded-lg bg-gray-200 dark:bg-gray-700 p-1">
            <button
              onClick={() => setCurrentUserRole("student")}
              className={`px-3 py-1 text-sm rounded-md transition ${
                currentUserRole === "student"
                  ? "bg-white dark:bg-gray-900 shadow"
                  : ""
              }`}
            >
              Student View
            </button>
            <button
              onClick={() => setCurrentUserRole("admin")}
              className={`px-3 py-1 text-sm rounded-md transition ${
                currentUserRole === "admin"
                  ? "bg-white dark:bg-gray-900 shadow"
                  : ""
              }`}
            >
              Admin View
            </button>
          </div>
          <button
            onClick={handleSave}
            className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <nav className="w-full lg:w-64 flex-shrink-0">
          <div className="space-y-2">
            {availableTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-200 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <tab.icon className="h-5 w-5 mr-3" />
                {tab.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

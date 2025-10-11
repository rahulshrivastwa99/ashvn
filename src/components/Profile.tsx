import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  User,
  Edit2,
  Save,
  X,
  Shield,
  Bell,
  Globe,
  Calendar,
} from "lucide-react";

export default function Profile() {
  const { profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || "",
    email: profile?.email || "",
    phone: "",
    dateOfBirth: "",
    year: "",
    major: "",
    emergencyContact: "",
    preferredLanguage: "English",
    notificationPreferences: {
      email: true,
      push: true,
      sms: false,
    },
    privacySettings: {
      profileVisible: false,
      shareWithCounsellors: true,
      anonymousPosting: true,
    },
  });

  const handleSave = () => {
    // Here you would typically make an API call to update the profile
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      fullName: profile?.full_name || "",
      email: profile?.email || "",
      phone: "",
      dateOfBirth: "",
      year: "",
      major: "",
      emergencyContact: "",
      preferredLanguage: "English",
      notificationPreferences: {
        email: true,
        push: true,
        sms: false,
      },
      privacySettings: {
        profileVisible: false,
        shareWithCounsellors: true,
        anonymousPosting: true,
      },
    });
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    section: "notificationPreferences" | "privacySettings",
    key: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: checked,
      },
    }));
  };

  const inputClass =
    "w-full border border-theme-divider rounded-md px-3 py-2 text-primary bg-secondary placeholder-themed focus:ring-accent focus:border-accent";
  const labelClass = "block text-sm font-medium text-secondary mb-2";

  const renderValue = (value: string | boolean | undefined) => {
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return value || "Not provided";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">My Profile</h1>
          <p className="text-secondary">
            Manage your account settings and preferences
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            // KEY FIX: Use accent color button
            className="bg-accent text-white px-4 py-2 rounded-md hover:opacity-90 focus:ring-2 focus:ring-accent focus:ring-offset-2 flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              // KEY FIX: Use accent color button
              className="bg-accent text-white px-4 py-2 rounded-md hover:opacity-90 focus:ring-2 focus:ring-accent focus:ring-offset-2 flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              // KEY FIX: Themed secondary cancel button
              className="bg-secondary text-primary border border-theme-divider px-4 py-2 rounded-md hover-bg-secondary focus:ring-2 focus:ring-theme-divider focus:ring-offset-2 flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Basic Information */}
      {/* KEY FIX: Use feature-card for panel background and border */}
      <div className="feature-card">
        <div className="p-6 border-b border-theme-divider">
          <div className="flex items-center">
            <User className="h-6 w-6 text-accent mr-3" />
            <h2 className="text-lg font-semibold text-primary">
              Basic Information
            </h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className={labelClass}>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              ) : (
                <p className="text-primary py-2">
                  {renderValue(formData.fullName)}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className={labelClass}>Email Address</label>
              <p className="text-primary py-2">{formData.email}</p>
              <p className="text-xs text-secondary">Email cannot be changed</p>
            </div>

            {/* Phone Number */}
            <div>
              <label className={labelClass}>Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="(555) 123-4567"
                />
              ) : (
                <p className="text-primary py-2">
                  {renderValue(formData.phone)}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className={labelClass}>Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              ) : (
                <p className="text-primary py-2">
                  {renderValue(formData.dateOfBirth)}
                </p>
              )}
            </div>

            {/* Year of Study */}
            <div>
              <label className={labelClass}>Year of Study</label>
              {isEditing ? (
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  <option
                    value=""
                    disabled
                    className="bg-secondary text-secondary"
                  >
                    Select year
                  </option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Graduate">Graduate</option>
                  <option value="PhD">PhD</option>
                </select>
              ) : (
                <p className="text-primary py-2">
                  {renderValue(formData.year)}
                </p>
              )}
            </div>

            {/* Major/Field of Study */}
            <div>
              <label className={labelClass}>Major/Field of Study</label>
              {isEditing ? (
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="e.g., Computer Science, Psychology"
                />
              ) : (
                <p className="text-primary py-2">
                  {renderValue(formData.major)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="feature-card">
        <div className="p-6 border-b border-theme-divider">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-red-600 mr-3" />
            <div>
              <h2 className="text-lg font-semibold text-primary">
                Emergency Contact
              </h2>
              <p className="text-sm text-secondary">
                This information is kept confidential and used only in
                emergencies
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div>
            <label className={labelClass}>
              Emergency Contact (Name & Phone)
            </label>
            {isEditing ? (
              <textarea
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className={inputClass}
                rows={2}
                placeholder="Parent/Guardian Name: John Doe&#10;Phone: (555) 123-4567"
              />
            ) : (
              <p className="text-primary py-2 whitespace-pre-line">
                {renderValue(formData.emergencyContact)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="feature-card">
        <div className="p-6 border-b border-theme-divider">
          <div className="flex items-center">
            <Globe className="h-6 w-6 text-purple-600 mr-3" />
            <h2 className="text-lg font-semibold text-primary">Preferences</h2>
          </div>
        </div>
        <div className="p-6">
          <div>
            <label className={labelClass}>Preferred Language</label>
            {isEditing ? (
              <select
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="English">English</option>
                <option value="हिंदी">हिंदी (Hindi)</option>
                <option value="ਪੰਜਾਬੀ">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="বাংলা">বাংলা (Bengali)</option>
                <option value="ગુજરાતી">ગુજરાતી (Gujarati)</option>
              </select>
            ) : (
              <p className="text-primary py-2">
                {renderValue(formData.preferredLanguage)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="feature-card">
        <div className="p-6 border-b border-theme-divider">
          <div className="flex items-center">
            <Bell className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-lg font-semibold text-primary">
              Notification Preferences
            </h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-primary">
                Email Notifications
              </h3>
              <p className="text-sm text-secondary">
                Receive appointment reminders and updates via email
              </p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notificationPreferences.email}
                onChange={(e) =>
                  handleCheckboxChange(
                    "notificationPreferences",
                    "email",
                    e.target.checked
                  )
                }
                disabled={!isEditing}
                // KEY FIX: Themed checkbox accent color
                className="rounded border-theme-divider text-accent focus:ring-accent bg-secondary"
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-primary">
                Push Notifications
              </h3>
              <p className="text-sm text-secondary">
                Receive notifications on your device
              </p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notificationPreferences.push}
                onChange={(e) =>
                  handleCheckboxChange(
                    "notificationPreferences",
                    "push",
                    e.target.checked
                  )
                }
                disabled={!isEditing}
                className="rounded border-theme-divider text-accent focus:ring-accent bg-secondary"
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-primary">
                SMS Notifications
              </h3>
              <p className="text-sm text-secondary">
                Receive critical alerts via text message
              </p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notificationPreferences.sms}
                onChange={(e) =>
                  handleCheckboxChange(
                    "notificationPreferences",
                    "sms",
                    e.target.checked
                  )
                }
                disabled={!isEditing}
                className="rounded border-theme-divider text-accent focus:ring-accent bg-secondary"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="feature-card">
        <div className="p-6 border-b border-theme-divider">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-lg font-semibold text-primary">
              Privacy Settings
            </h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-primary">
                Profile Visibility
              </h3>
              <p className="text-sm text-secondary">
                Allow other students to see your profile
              </p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.privacySettings.profileVisible}
                onChange={(e) =>
                  handleCheckboxChange(
                    "privacySettings",
                    "profileVisible",
                    e.target.checked
                  )
                }
                disabled={!isEditing}
                className="rounded border-theme-divider text-accent focus:ring-accent bg-secondary"
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-primary">
                Share with Counsellors
              </h3>
              <p className="text-sm text-secondary">
                Allow counsellors to access your profile information
              </p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.privacySettings.shareWithCounsellors}
                onChange={(e) =>
                  handleCheckboxChange(
                    "privacySettings",
                    "shareWithCounsellors",
                    e.target.checked
                  )
                }
                disabled={!isEditing}
                className="rounded border-theme-divider text-accent focus:ring-accent bg-secondary"
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-primary">
                Anonymous Forum Posting
              </h3>
              <p className="text-sm text-secondary">
                Post anonymously in the peer support forum by default
              </p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.privacySettings.anonymousPosting}
                onChange={(e) =>
                  handleCheckboxChange(
                    "privacySettings",
                    "anonymousPosting",
                    e.target.checked
                  )
                }
                disabled={!isEditing}
                className="rounded border-theme-divider text-accent focus:ring-accent bg-secondary"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="feature-card">
        <div className="p-6 border-b border-theme-divider">
          <h2 className="text-lg font-semibold text-primary">
            Account Actions
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-primary">
                Download Your Data
              </h3>
              <p className="text-sm text-secondary">
                Request a copy of all your data
              </p>
            </div>
            <button className="text-accent hover:opacity-80 text-sm font-medium">
              Request Data
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-primary">
                Deactivate Account
              </h3>
              <p className="text-sm text-secondary">
                Temporarily disable your account
              </p>
            </div>
            <button className="text-orange-600 hover:opacity-80 text-sm font-medium">
              Deactivate
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-primary">
                Delete Account
              </h3>
              <p className="text-sm text-secondary">
                Permanently delete your account and all data
              </p>
            </div>
            <button className="text-red-600 hover:opacity-80 text-sm font-medium">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

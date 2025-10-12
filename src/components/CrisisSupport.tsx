import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  AlertTriangle,
  Heart,
  Shield,
} from "lucide-react";

interface CrisisResource {
  name: string;
  type: "hotline" | "text" | "chat" | "local";
  contact: string;
  description: string;
  availability: string;
  language: string[];
}

export default function CrisisSupport() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const crisisResources: CrisisResource[] = [
    {
      name: "Vandrevala Foundation Helpline",
      type: "text",
      contact: "1860-266-2345",
      description:
        "24/7 mental health support and crisis intervention across India.",
      availability: "24/7",
      language: ["English", "Hindi", "Tamil", "Telugu"],
    },
    {
      name: "iCALL Psychosocial Helpline",
      type: "hotline",
      contact: "+91 9519470503",
      description:
        "Psychosocial support and professional counseling for individuals in distress.",
      availability: "Mon-Sat 8AM-10PM",
      language: ["English", "Hindi", "Marathi"],
    },
    {
      name: "AASRA Suicide Prevention Helpline",
      type: "hotline",
      contact: "+91 22 2754 6669",
      description:
        "24/7 confidential suicide prevention and emotional support helpline.",
      availability: "24/7",
      language: ["English", "Hindi"],
    },
    {
      name: "Snehi Emotional Support Helpline",
      type: "text",
      contact: "+91 22 2772 6771",
      description:
        "24/7 emotional support and counseling services based in Mumbai.",
      availability: "24/7",
      language: ["English", "Hindi", "Marathi"],
    },
    {
      name: "The Live Love Laugh Foundation",
      type: "chat",
      contact: "https://thelivelovelaughfoundation.org/chat",
      description:
        "Mental health awareness, support, and resources through chat services.",
      availability: "Mon-Fri 10AM-6PM",
      language: ["English"],
    },
    {
      name: "Snehalaya Shelter & Support",
      type: "local",
      contact: "+91 9318340791",
      description:
        "Shelter, rehabilitation, and crisis support services in Maharashtra.",
      availability: "Mon-Sat 9AM-6PM",
      language: ["English", "Marathi"],
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hotline":
        return <Phone className="h-5 w-5" />;
      case "text":
        return <MessageCircle className="h-5 w-5" />;
      case "chat":
        return <MessageCircle className="h-5 w-5" />;
      case "local":
        return <MapPin className="h-5 w-5" />;
      default:
        return <Phone className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    // We rely on the themed badge classes defined in index.css
    switch (type) {
      case "hotline":
        return "badge-danger";
      case "text":
        return "badge-info";
      case "chat":
        return "badge-success";
      case "local":
        return "badge-info";
      default:
        return "badge-secondary";
    }
  };

  const filteredResources = crisisResources.filter((resource) =>
    resource.language.includes(selectedLanguage)
  );

  return (
    <div className="space-y-8">
      {/* Emergency Banner */}
      {/* KEY FIX 1: Use feature-card for the main banner background and theme text colors */}
      <div className="feature-card border-l-4 border-red-400 p-6 rounded-r-lg">
        <div className="flex items-center">
          <AlertTriangle className="h-8 w-8 text-red-400 mr-4" />
          <div>
            <h1 className="text-2xl font-bold text-primary mb-2">
              Crisis Support Resources
            </h1>
            <p className="text-secondary mb-4">
              If you're having thoughts of self-harm or suicide, please reach
              out for help immediately. You are not alone, and support is
              available 24/7.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:112"
                className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors flex items-center font-medium"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call 112 Now
              </a>
              <a
                href="sms:741741&body=HOME"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center font-medium"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Text HOME to 7899999911
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Language Filter */}
      {/* KEY FIX 2: Use feature-card for background and theme text/input styles */}
      <div className="feature-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">
            Available Support Resources
          </h2>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            // Themed SELECT input
            className="border border-theme-divider rounded-md px-3 py-2 focus:ring-accent focus:border-accent bg-secondary text-primary"
          >
            <option value="English">English</option>
            <option value="Hindi">हिंदी (Hindi)</option>
            <option value="Spanish">Español</option>
            <option value="Tamil">தமிழ் (Tamil)</option>
            <option value="Telugu">తెలుగు (Telugu)</option>
            <option value="Marathi">मराठी (Marathi)</option>
          </select>
        </div>
      </div>

      {/* Crisis Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((resource, index) => (
          <div
            key={index}
            // KEY FIX 3: Resource Card uses feature-card
            className="feature-card p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                {/* Type Badge uses themed badge colors */}
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                    resource.type
                  )}`}
                >
                  {getTypeIcon(resource.type)}
                  <span className="ml-2 capitalize">{resource.type}</span>
                </span>
              </div>
              {/* Availability uses secondary text color */}
              <div className="flex items-center text-sm text-secondary">
                <Clock className="h-4 w-4 mr-1" />
                {resource.availability}
              </div>
            </div>

            {/* Resource details use primary/secondary text colors */}
            <h3 className="text-lg font-semibold text-primary mb-2">
              {resource.name}
            </h3>
            <p className="text-secondary mb-4">{resource.description}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-secondary">
                  Contact:
                </span>
                <span className="text-lg font-bold text-primary">
                  {resource.contact}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-secondary">
                  Languages:
                </span>
                <div className="flex flex-wrap gap-1">
                  {resource.language.map((lang) => (
                    // Language tags use themed secondary background/text
                    <span
                      key={lang}
                      className="bg-secondary text-secondary px-2 py-1 rounded text-xs"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-theme-divider">
                {/* Action Buttons: Remain brightly colored for urgency */}
                {resource.type === "hotline" && (
                  <a
                    href={`tel:${resource.contact.replace(/[^\d]/g, "")}`}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center font-medium"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </a>
                )}

                {resource.type === "text" && (
                  <div className="flex flex-col gap-3">
                    <a
                      href={`sms:${resource.contact.replace(
                        /[^\d]/g,
                        ""
                      )}&body=Hello I need support`}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send SMS
                    </a>
                    <a
                      href={`https://wa.me/${resource.contact.replace(
                        /[^\d]/g,
                        ""
                      )}?text=Hello%2C%20I%20need%20support`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center font-medium"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message on WhatsApp
                    </a>
                  </div>
                )}

                {resource.type === "chat" && (
                  <a
                    href={resource.contact}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center font-medium"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Open Chat
                  </a>
                )}

                {resource.type === "local" && (
                  <a
                    href={`tel:${resource.contact.replace(/[^\d]/g, "")}`}
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center font-medium"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Contact Local Center
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Planning */}
      <div className="feature-card p-6">
        <div className="flex items-center mb-6">
          <Shield className="h-6 w-6 text-accent mr-3" />
          <h2 className="text-lg font-semibold text-primary">
            Safety Planning
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-primary mb-3">
              Warning Signs to Watch For:
            </h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Thoughts of death or suicide
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Feeling hopeless or trapped
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Severe anxiety or panic attacks
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Withdrawal from friends and activities
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Dramatic mood changes
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-primary mb-3">
              Immediate Coping Strategies:
            </h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Call a crisis hotline or trusted person
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Remove access to harmful means
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Go to a safe, public place
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Use grounding techniques (5-4-3-2-1)
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Engage in physical activity
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Support Message */}
      <div className="feature-card border border-theme-divider p-6">
        <div className="flex items-start">
          <Heart className="h-6 w-6 text-accent mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-primary mb-2">
              You Are Not Alone
            </h3>
            <p className="text-secondary mb-4">
              Mental health struggles are real, but they are treatable. Reaching
              out for help is a sign of strength, not weakness. Every person
              deserves support, understanding, and hope for recovery.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-accent text-white px-4 py-2 rounded-md hover:opacity-90 transition-colors">
                Find Local Support
              </button>
              <button className="border border-accent text-accent px-4 py-2 rounded-md hover-bg-secondary transition-colors">
                Learn More About Mental Health
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

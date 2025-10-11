import React, { useState } from "react";
import {
  Play,
  Download,
  BookOpen,
  Headphones,
  Video,
  Globe,
  Search,
  X,
} from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "video" | "audio" | "article" | "guide";
  category: string;
  duration?: string;
  language: string;
  rating: number;
  thumbnail?: string;
  url?: string;
  downloadUrl?: string;
}

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Breathing Exercises for Anxiety",
    description:
      "Learn 4-7-8 breathing technique to manage anxiety and panic attacks",
    type: "video",
    category: "Anxiety Management",
    duration: "8 minutes",
    language: "English",
    rating: 4.8,
    thumbnail: "https://i.ytimg.com/vi/tEmt1Znux58/hqdefault.jpg",
    url: "https://www.youtube-nocookie.com/embed/tEmt1Znux58?rel=0",
  },
  {
    id: "2",
    title: "तनाव दूर करें और फोकस बढ़ाएं। 10 मिनट का निर्देशित ध्यान।",
    description:
      "यह 10 मिनट का निर्देशित ध्यान तनाव दूर करने और फोकस बढ़ाने में मदद करता है।",
    type: "video",
    category: "तनाव प्रबंधन",
    duration: "10 मिनट",
    language: "हिंदी",
    rating: 4.5,
    thumbnail: "https://i.ytimg.com/vi/Lv1jpqkN4ZY/hqdefault.jpg",
    url: "https://www.youtube-nocookie.com/embed/Lv1jpqkN4ZY?rel=0",
  },
  {
    id: "3",
    title: "Cognitive Behavioral Techniques",
    description: "Learn CBT strategies to challenge negative thought patterns",
    type: "video",
    category: "Therapy Techniques",
    duration: "15 minutes",
    language: "English",
    rating: 4.8,
    thumbnail: "https://i.ytimg.com/vi/9c_Bv_FBE-c/hqdefault.jpg",
    url: "https://www.youtube.com/embed/9c_Bv_FBE-c",
  },
  {
    id: "4",
    title: "Understanding Depression: A Student Guide",
    description:
      "This guide offers students effective strategies to cope with depression and improve their mental well-being.",
    type: "guide",
    category: "Mental Health Education",
    language: "English",
    rating: 4.9,
    thumbnail: "https://i.ytimg.com/vi/oS6KlpzDNS0/hqdefault.jpg",
    url: "https://therapygroupdc.com/therapist-dc-blog/effective-coping-strategies-for-student-depression-a-comprehensive-guide/#:~:text=Depression%20affects%20millions%20of%20students%2C%20impacting%20their%20academic,recognizing%20symptoms%2C%20understanding%20causes%2C%20and%20seeking%20professional%20help.",
  },
  {
    id: "5",
    title: "डिप्रेशन और एंग्जायटी से कैसे निपटें? संदीप माहेश्वरी द्वारा",
    description:
      "यह वीडियो संदीप माहेश्वरी द्वारा डिप्रेशन और एंग्जायटी से निपटने के तरीकों पर आधारित है।",
    type: "video",
    category: "तनाव प्रबंधन",
    duration: "19 मिनट",
    language: "हिंदी",
    rating: 4.8,
    thumbnail: "https://i.ytimg.com/vi/eAK14VoY7C0/hqdefault.jpg",
    url: "https://www.youtube-nocookie.com/embed/eAK14VoY7C0?rel=0",
  },
  {
    id: "6",
    title: "स्वस्थ नींद की आदतें (Healthy Sleep Habits)",
    description:
      "छात्रों के लिए बेहतर नींद और आराम की तकनीकें, तनाव कम करने और पढ़ाई में ध्यान लगाने के लिए सरल उपाय।",
    type: "article",
    category: "नींद स्वास्थ्य",
    language: "हिंदी",
    rating: 4.5,
    thumbnail: "https://i.ytimg.com/vi/OU6xN-LXeM0/hqdefault.jpg",
    url: "https://www.healthline.com/health/healthy-sleep",
  },
  {
    id: "7",
    title: "Understanding Depression: A Student Guide",
    description:
      "Comprehensive guide about recognizing and managing depression symptoms",
    type: "guide",
    category: "Mental Health Education",
    language: "English",
    rating: 4.9,
    thumbnail: "https://i.ytimg.com/vi/gIOdJ6ybYIM/hqdefault.jpg",
    url: "https://therapygroupdc.com/therapist-dc-blog/effective-coping-strategies-for-student-depression-a-comprehensive-guide/#:~:text=Depression%20affects%20millions%20of%20students%2C%20impacting%20their%20academic,recognizing%20symptoms%2C%20understanding%20causes%2C%20and%20seeking%20professional%20help.",
  },
  {
    id: "8",
    title: "3 Ways To Be Stress Free",
    description:
      "This video is based on 3 ways to be stress-free. It teaches you not to be afraid of problems, not to take yourself too seriously, and how to forget the past and move on.",
    type: "video",
    category: "Stress Management",
    duration: "5 minutes ",
    language: "English ,हिंदी",
    rating: 4.8,
    thumbnail: "https://i.ytimg.com/vi/YhpU8VME8Gw/hqdefault.jpg",
    url: "https://www.youtube-nocookie.com/embed/YhpU8VME8Gw?rel=0",
  },
  {
    id: "9",
    title: "Time Management for Mental Wellness",
    description:
      "Balancing academics and mental health through effective time management",
    type: "guide",
    category: "Student Life",
    language: "English",
    rating: 4.4,
    thumbnail: "https://i.ytimg.com/vi/C4bofW53sO8/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=YhpU8VME8Gw",
  },
];

const categories = [
  "All",
  "Anxiety Management",
  "तनाव प्रबंधन",
  "Mental Health Education",
  "Mindfulness",
  "नींद स्वास्थ्य",
  "Therapy Techniques",
  "Relaxation",
  "Student Life",
];

const languages = ["All", "English", "हिंदी"];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || resource.category === selectedCategory;
    const matchesLanguage =
      selectedLanguage === "All" || resource.language === selectedLanguage;
    const matchesType =
      selectedType === "All" || resource.type === selectedType;

    return matchesSearch && matchesCategory && matchesLanguage && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5" />;
      case "audio":
        return <Headphones className="h-5 w-5" />;
      case "article":
        return <BookOpen className="h-5 w-5" />;
      case "guide":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    // We rely on the custom badge styles in index.css for the actual colors
    switch (type) {
      case "video":
        return "badge-info";
      case "audio":
        return "badge-success";
      case "article":
        return "badge-info";
      case "guide":
        return "badge-danger";
      default:
        return "badge-secondary";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="feature-card p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-primary mb-2">
          Mental Health Resources
        </h1>
        <p className="text-secondary">
          Access evidence-based mental health resources in multiple languages
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center space-x-4">
        {/* Search Input - Themed input box */}
        <div className="relative flex-1">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search resources, topics, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // KEY FIX: This input is now fully themed (bg, text, placeholder)
            className="w-full pl-10 pr-4 py-2 border border-theme-divider rounded-lg bg-secondary text-primary placeholder-themed focus:ring-accent focus:border-accent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns - Themed dropdown boxes */}
        {/* KEY FIX: The background and text color are applied using theme variables on SELECT elements */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 border border-theme-divider rounded-lg bg-secondary text-primary"
        >
          <option value="All">All Types</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
          <option value="article">Article</option>
          <option value="guide">Guide</option>
        </select>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="p-2 border border-theme-divider rounded-lg bg-secondary text-primary"
        >
          <option value="All">All Languages</option>
          {languages
            .filter((l) => l !== "All")
            .map((lang) => (
              // Option text color is inherited from <select> text-primary
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
        </select>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-theme-divider rounded-lg bg-secondary text-primary"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            // Resource Card uses feature-card class
            className="feature-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {resource.thumbnail && (
              <div className="aspect-video relative">
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              {/* Resource Info */}
              <div className="flex items-center justify-between mb-3">
                <span
                  // Badge uses themed colors from getTypeColor
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                    resource.type
                  )}`}
                >
                  {getTypeIcon(resource.type)}
                  <span className="ml-1 capitalize">{resource.type}</span>
                </span>
                {/* Language tag uses secondary text */}
                <div className="flex items-center text-xs text-secondary">
                  <Globe className="h-3 w-3 mr-1" />
                  {resource.language}
                </div>
              </div>

              {/* Title and Description */}
              <h3 className="font-semibold text-primary mb-2 line-clamp-2">
                {resource.title}
              </h3>
              <p className="text-sm text-secondary mb-4 line-clamp-3">
                {resource.description}
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Watch/Read Buttons */}
                {(resource.type === "video" ||
                  resource.type === "article" ||
                  resource.type === "guide") &&
                  resource.url && (
                    <button
                      onClick={() => {
                        if (resource.type === "video")
                          setVideoUrl(resource.url!);
                        else window.open(resource.url, "_blank");
                      }}
                      // Primary action button uses accent color
                      className="w-full bg-accent text-white px-4 py-2 rounded-md hover:opacity-90 transition-colors text-sm flex items-center justify-center"
                    >
                      {resource.type === "article" ||
                      resource.type === "guide" ? (
                        <BookOpen className="h-4 w-4 mr-2" />
                      ) : (
                        <Play className="h-4 w-4 mr-2" />
                      )}
                      {resource.type === "video" ? "Watch" : "Read"}
                    </button>
                  )}

                {/* Audio Download Button */}
                {resource.type === "audio" && resource.downloadUrl && (
                  <a
                    href={resource.downloadUrl}
                    download
                    // Secondary action button uses themed border/text/hover
                    className="w-full border border-theme-divider text-primary px-4 py-2 rounded-md hover-bg-secondary transition-colors text-sm flex items-center justify-center"
                  >
                    <Download className="h-4 w-4 mr-2" /> Download
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {videoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="feature-card rounded-lg overflow-hidden shadow-xl max-w-3xl w-full relative">
            <button
              onClick={() => setVideoUrl(null)}
              // Modal close button uses themed background/text/hover
              className="absolute top-2 right-2 bg-secondary rounded-full p-1 text-primary hover:bg-hover-bg z-10"
            >
              <X className="h-5 w-5" />
            </button>
            <iframe
              width="100%"
              height="450"
              src={videoUrl}
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

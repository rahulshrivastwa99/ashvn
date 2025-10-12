import React, { useState } from "react";
import { Music, Headphones, Wind, Bed, Brain } from "lucide-react";
// Import the context hook and the full list of tracks
import {
  useMusicPlayer,
  ALL_SOUNDSCAPES,
} from "../contexts/MusicPlayerContext";

// Data for the sidebar categories (unchanged)
const categories = [
  { name: "Focus", icon: <Brain /> },
  { name: "Relaxation", icon: <Headphones /> },
  { name: "Sleep", icon: <Bed /> },
  { name: "Nature", icon: <Wind /> },
  { name: "Meditation", icon: <Brain /> },
];

export default function SoundScapes() {
  const { currentTrack, setCurrentTrack } = useMusicPlayer();

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeLanguage, setActiveLanguage] = useState<"English" | "Hindi">(
    "Hindi"
  );

  const filteredSoundscapes = ALL_SOUNDSCAPES.filter((track) => {
    const isCategoryMatch =
      activeCategory === "All" || track.category === activeCategory;
    const isLanguageMatch = track.language === activeLanguage;
    return isCategoryMatch && isLanguageMatch;
  });

  return (
    <div className="p-4">
      <header className="mb-4">
        {/* Header Banner - Retains fixed gradient */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center">
            {/* Icon uses themed header colors */}
            <div className="bg-white/20 rounded-full p-3 mr-4 text-header-primary">
              <Music className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-header-primary">
                Sound Scapes
              </h1>
              {/* Uses themed header secondary color for light text on dark gradient */}
              <p className="text-header-secondary mt-1">
                Curated audio to help you relax, focus, and find peace.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Categories Sidebar */}
        {/* KEY FIX 1: Uses feature-card for background and shadow */}
        <aside className="lg:w-64 feature-card p-4 flex-shrink-0">
          <h2 className="text-xl font-bold text-primary mb-4">Categories</h2>
          <nav className="space-y-2">
            {/* All Category Button */}
            <button
              onClick={() => setActiveCategory("All")}
              className={`w-full flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors text-primary ${
                activeCategory === "All"
                  ? "bg-accent text-white shadow" // Active: Use accent
                  : "hover-bg-secondary" // Default: Use themed hover
              }`}
            >
              <Music className="h-5 w-5 mr-3" /> All
            </button>
            {/* Standard Category Buttons */}
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`w-full flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors text-primary ${
                  activeCategory === category.name
                    ? "bg-accent text-white shadow" // Active: Use accent
                    : "hover-bg-secondary" // Default: Use themed hover
                }`}
              >
                <span className="mr-3">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Track List */}
        {/* KEY FIX 2: Uses feature-card for background and shadow */}
        <main className="flex-1 feature-card p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-primary">
              Browse Soundscapes
            </h2>
            {/* Language Toggle */}
            {/* KEY FIX 3: Wrapper uses themed background secondary */}
            <div className="flex items-center p-1 bg-secondary rounded-lg">
              <button
                onClick={() => setActiveLanguage("English")}
                className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${
                  activeLanguage === "English"
                    ? "bg-primary text-accent shadow" // Active: Background/text are themed
                    : "text-secondary" // Default: Text uses secondary color
                }`}
              >
                English
              </button>
              <button
                onClick={() => setActiveLanguage("Hindi")}
                className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${
                  activeLanguage === "Hindi"
                    ? "bg-primary text-accent shadow" // Active: Background/text are themed
                    : "text-secondary" // Default: Text uses secondary color
                }`}
              >
                Hindi
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredSoundscapes.map((track) => (
              <div
                key={track.youtubeId}
                onClick={() => setCurrentTrack(track)}
                // KEY FIX 4: Track item background, border, and hover use theme classes
                className={`p-2 rounded-lg flex items-center gap-3 cursor-pointer border transition-colors ${
                  currentTrack?.youtubeId === track.youtubeId
                    ? "border-accent bg-active-bg" // Active: Accent border, active background
                    : "border-theme-divider bg-secondary hover-bg-secondary" // Default: Themed border/bg/hover
                }`}
              >
                <img
                  src={`https://img.youtube.com/vi/${track.youtubeId}/mqdefault.jpg`}
                  alt={track.title}
                  className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  {/* KEY FIX 5: Text uses theme primary/secondary colors */}
                  <p className="font-semibold text-primary text-sm truncate">
                    {track.title}
                  </p>
                  <p className="text-xs text-secondary truncate">
                    {track.artist}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

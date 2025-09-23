import React, { useState } from "react";
import { Music, Headphones, Wind, Bed, Brain } from "lucide-react";
// Import the context hook and the full list of tracks
import {
  useMusicPlayer,
  ALL_SOUNDSCAPES,
} from "../contexts/MusicPlayerContext";

// Data for the sidebar categories can be kept here or moved
const categories = [
  { name: "Focus", icon: <Brain /> },
  { name: "Relaxation", icon: <Headphones /> },
  { name: "Sleep", icon: <Bed /> },
  { name: "Nature", icon: <Wind /> },
  { name: "Meditation", icon: <Brain /> },
];

export default function SoundScapes() {
  // Get the current track and the function to set it from the global context
  const { currentTrack, setCurrentTrack } = useMusicPlayer();

  // This state is only for filtering the UI, not for playing music
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
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center">
            <div className="bg-white/20 rounded-full p-3 mr-4">
              <Music className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sound Scapes</h1>
              <p className="text-teal-100 mt-1">
                Curated audio to help you relax, focus, and find peace.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Categories Sidebar */}
        <aside className="lg:w-64 bg-white rounded-lg p-4 shadow-md flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveCategory("All")}
              className={`w-full flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeCategory === "All"
                  ? "bg-teal-500 text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Music className="h-5 w-5 mr-3" /> All
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`w-full flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category.name
                    ? "bg-teal-500 text-white shadow"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="mr-3">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Track List */}
        <main className="flex-1 bg-white rounded-lg p-4 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Browse Soundscapes
            </h2>
            <div className="flex items-center p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setActiveLanguage("English")}
                className={`px-4 py-1 text-sm font-semibold rounded-md ${
                  activeLanguage === "English"
                    ? "bg-white text-teal-600 shadow"
                    : "text-gray-600"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setActiveLanguage("Hindi")}
                className={`px-4 py-1 text-sm font-semibold rounded-md ${
                  activeLanguage === "Hindi"
                    ? "bg-white text-teal-600 shadow"
                    : "text-gray-600"
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
                // *** THIS IS THE KEY CHANGE ***
                // On click, we call the GLOBAL setCurrentTrack function
                onClick={() => setCurrentTrack(track)}
                className={`p-2 rounded-lg flex items-center gap-3 cursor-pointer border transition-colors ${
                  // The highlight is now based on the global currentTrack
                  currentTrack?.youtubeId === track.youtubeId
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <img
                  src={`https://img.youtube.com/vi/${track.youtubeId}/mqdefault.jpg`}
                  alt={track.title}
                  className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">
                    {track.title}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
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

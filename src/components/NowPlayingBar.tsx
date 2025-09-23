import React, { useState, useEffect, useRef } from "react";
import { useMusicPlayer } from "../contexts/MusicPlayerContext";
import { Play, Pause, SkipForward, SkipBack, X } from "lucide-react";

// Helper function to format time
const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds === 0) return "00:00";
  const floorSeconds = Math.floor(seconds);
  const min = Math.floor(floorSeconds / 60);
  const sec = floorSeconds % 60;
  return `${min.toString().padStart(2, "0")}:${sec
    .toString()
    .padStart(2, "0")}`;
};

const NowPlayingBar = () => {
  const {
    currentTrack,
    isPlaying,
    setIsPlaying,
    playNextTrack,
    playerRef,
    setCurrentTrack,
  } = useMusicPlayer();

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // This logic for updating time remains the same
  useEffect(() => {
    const timer = setInterval(async () => {
      if (isPlaying && playerRef.current) {
        try {
          const time = await playerRef.current.getCurrentTime?.();
          const dur = await playerRef.current.getDuration?.();
          if (typeof time === "number" && !isNaN(time)) setCurrentTime(time);
          if (typeof dur === "number" && !isNaN(dur)) setDuration(dur);
        } catch {}
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, playerRef]);

  const handleSeek = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (playerRef.current?.seekTo) {
      await playerRef.current.seekTo(newTime, true);
    }
  };

  const handleStopAndClose = () => {
    if (playerRef.current?.stopVideo) {
      playerRef.current.stopVideo();
    }
    setIsPlaying(false);
    setCurrentTrack(undefined);
  };

  if (!currentTrack) return null;

  return (
    // Main container: A fixed card in the bottom-right corner
    <div className="fixed bottom-5 right-5 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 w-full max-w-md flex items-center gap-4 text-left border dark:border-gray-700">
      {/* Album Art */}
      <img
        src={`https://img.youtube.com/vi/${currentTrack.youtubeId}/mqdefault.jpg`}
        alt={currentTrack.title}
        className="w-20 h-20 rounded-md object-cover"
      />

      {/* Player content */}
      <div className="flex-grow flex flex-col justify-center">
        {/* Track Info */}
        <div className="mb-2">
          <p className="font-bold text-md text-gray-800 truncate">
          <p className="font-bold text-md text-gray-800 dark:text-white truncate">
            {currentTrack.title}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {currentTrack.artist}
          </p>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-3">
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
            <SkipBack size={20} />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-md"
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>
          <button
            onClick={playNextTrack}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <SkipForward size={20} />
          </button>
        </div>
      </div>

      {/* Progress Bar & Time (now vertical) */}
      <div className="w-full flex-grow mx-4">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full cursor-pointer appearance-none accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Close button inside the card */}
      <button
        onClick={handleStopAndClose}
        className="absolute top-2 right-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default NowPlayingBar;

  )
}
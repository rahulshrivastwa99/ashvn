import React, { useState, useEffect, useRef } from "react";
import { useMusicPlayer } from "../contexts/MusicPlayerContext";
import { Play, Pause, SkipForward, SkipBack, X } from "lucide-react";

// Helper function to format time (Unchanged)
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
    // KEY FIX 1: Main container uses feature-card class for theme background/shadow
    <div className="fixed bottom-5 right-5 z-50 feature-card p-4 w-full max-w-md flex items-center gap-4 text-left">
      {/* Album Art (No thematic change needed) */}
      <img
        src={`https://img.youtube.com/vi/${currentTrack.youtubeId}/mqdefault.jpg`}
        alt={currentTrack.title}
        className="w-20 h-20 rounded-md object-cover"
      />

      {/* Player content */}
      <div className="flex-grow flex flex-col justify-center">
        {/* Track Info */}
        <div className="mb-2">
          {/* KEY FIX 2: Text uses theme primary/secondary colors */}
          <p className="font-bold text-md text-primary truncate">
            {currentTrack.title}
          </p>
          <p className="text-sm text-secondary truncate">
            {currentTrack.artist}
          </p>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-3">
          {/* KEY FIX 3: Skip buttons use secondary/primary theme colors */}
          <button className="text-secondary hover:text-primary transition-colors">
            <SkipBack size={20} />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            // KEY FIX 4: Play/Pause button uses accent color
            className="p-2 rounded-full bg-accent text-white hover:opacity-90 transition-colors shadow-md"
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>
          <button
            onClick={playNextTrack}
            className="text-secondary hover:text-primary transition-colors"
          >
            <SkipForward size={20} />
          </button>
        </div>
      </div>

      {/* Progress Bar & Time */}
      <div className="w-full flex-grow mx-4">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          // KEY FIX 5: Slider track uses secondary background color
          // The accent-blue-500 (track fill) will be overridden by custom CSS
          className="w-full h-1.5 bg-secondary rounded-full cursor-pointer appearance-none accent-accent"
        />
        {/* KEY FIX 6: Time text uses secondary color */}
        <div className="flex justify-between text-xs text-secondary mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Close button inside the card */}
      <button
        onClick={handleStopAndClose}
        // KEY FIX 7: Close button uses secondary/primary theme colors
        className="absolute top-2 right-2 text-secondary hover:text-primary transition-colors"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default NowPlayingBar;

import React, { useState, useEffect, useRef } from "react";
import { useMusicPlayer } from "../contexts/MusicPlayerContext";
import { Play, Pause, SkipForward, X } from "lucide-react";

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
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // update current time
  useEffect(() => {
    const updateTime = async () => {
      if (playerRef.current) {
        try {
          const time = await playerRef.current.getCurrentTime?.();
          const dur = await playerRef.current.getDuration?.();
          if (typeof time === "number" && !isNaN(time)) setCurrentTime(time);
          if (typeof dur === "number" && !isNaN(dur)) setDuration(dur);
        } catch {}
      }
    };
    if (isPlaying) {
      updateTime();
      timerRef.current = setInterval(updateTime, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playerRef]);

  const handleSeek = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (playerRef.current?.seekTo) {
      try {
        await playerRef.current.seekTo(newTime, true);
      } catch {}
    }
  };

  const handleStopAndClose = () => {
    if (playerRef.current?.stopVideo) {
      try {
        playerRef.current.stopVideo();
      } catch {}
    }
    setIsPlaying(false);
    setCurrentTrack(undefined);
  };

  if (!currentTrack) return null;

  return (
    <div
      className="fixed bottom-0 right-0 z-10 text-white bg-gradient-to-r from-teal-500 to-blue-600 px-2 py-1 flex items-center justify-between shadow-lg"
      style={{
        left: "256px",
        width: "calc(100vw - 256px)",
        height: "50px", // <-- reduced height
      }}
    >
      {/* Left: track info */}
      <div className="flex items-center gap-2 min-w-0">
        <img
          src={`https://img.youtube.com/vi/${currentTrack.youtubeId}/mqdefault.jpg`}
          alt={currentTrack.title}
          className="w-8 h-8 rounded object-cover border border-white/30"
        />
        <div className="min-w-0">
          <p className="font-medium text-xs truncate">{currentTrack.title}</p>
          <p className="text-[10px] text-blue-100 truncate">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      {/* Middle: progress bar */}
      <div className="flex-1 mx-3">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-[2px] bg-white/40 rounded-full cursor-pointer appearance-none accent-teal-400"
          style={{ WebkitAppearance: "none" }}
        />
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
          }
          input[type="range"]::-moz-range-thumb {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
          }
        `}</style>
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-1 rounded-full bg-white text-teal-600 hover:bg-teal-100 transition-colors"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button
          onClick={playNextTrack}
          className="p-1 rounded-full border border-white text-white hover:bg-white hover:text-teal-600 transition-colors"
        >
          <SkipForward size={14} />
        </button>
        <button
          onClick={handleStopAndClose}
          className="p-1 rounded-full border border-white text-white hover:bg-white hover:text-red-600 transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default NowPlayingBar;

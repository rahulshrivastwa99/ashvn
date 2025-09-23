import React, {
  createContext,
  useState,
  useContext,
  useRef,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import { Music, Headphones, Wind, Droplets, Bed, Brain } from "lucide-react";

// --- TypeScript Types ---
export type Soundscape = {
  title: string;
  artist: string;
  duration: string;
  youtubeId: string;
  category: "Focus" | "Relaxation" | "Sleep" | "Nature" | "Meditation";
  icon: React.ReactNode;
  language: "English" | "Hindi";
};

interface MusicPlayerContextType {
  currentTrack: Soundscape | null;
  setCurrentTrack: (track: Soundscape) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  playNextTrack: () => void;
  playerRef: React.RefObject<any>; // Exposed player reference
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined
);

// --- Complete Music Library ---
export const ALL_SOUNDSCAPES: Soundscape[] = [
  // English Tracks
  {
    title: "Peaceful Piano",
    artist: "Various Artists",
    duration: "1:00:00",
    youtubeId: "JgDNFQ2RaLQ",
    category: "Relaxation",
    icon: <Music />,
    language: "English",
  },
  {
    title: "Relaxing Sleep Music",
    artist: "Various Artists",
    duration: "3:00:00",
    youtubeId: "jLNrvmXboj8",
    category: "Sleep",
    icon: <Bed />,
    language: "English",
  },
  {
    title: "Calm Piano Music",
    artist: "Various Artists",
    duration: "3:01:24",
    youtubeId: "V1Pl8CzNzCw",
    category: "Relaxation",
    icon: <Music />,
    language: "English",
  },
  {
    title: "Study Music Alpha Waves",
    artist: "Various Artists",
    duration: "2:00:00",
    youtubeId: "sZrTJesvJeo",
    category: "Focus",
    icon: <Brain />,
    language: "English",
  },
  {
    title: "Deep Focus Music",
    artist: "Various Artists",
    duration: "4:00:00",
    youtubeId: "4adZ7AguVcw",
    category: "Focus",
    icon: <Brain />,
    language: "English",
  },
  {
    title: "Relaxing Jazz Music",
    artist: "Various Artists",
    duration: "1:00:00",
    youtubeId: "21XOT_a6z84",
    category: "Relaxation",
    icon: <Headphones />,
    language: "English",
  },
  {
    title: "Ocean Waves & Relaxing Music",
    artist: "Various Artists",
    duration: "3:00:00",
    youtubeId: "dhYOPzcsbGM",
    category: "Nature",
    icon: <Wind />,
    language: "English",
  },
  {
    title: "Calm Music for Studying",
    artist: "Various Artists",
    duration: "2:00:00",
    youtubeId: "W0DM5lcj6mw",
    category: "Focus",
    icon: <Brain />,
    language: "English",
  },
  {
    title: "Soothing Flute Music",
    artist: "Various Artists",
    duration: "3:00:00",
    youtubeId: "jJvDnYdD8JQ",
    category: "Relaxation",
    icon: <Music />,
    language: "English",
  },
  {
    title: "Relaxing Rain and Thunder",
    artist: "Relaxation Sounds",
    duration: "10:00:00",
    youtubeId: "1fOBgosDo7s",
    category: "Nature",
    icon: <Droplets />,
    language: "English",
  },
  // Hindi Tracks
  {
    title: "Give Me Some Sunshine",
    artist: "Suraj Jagan, Sharman Joshi",
    duration: "4:06",
    youtubeId: "lbCRtrrMvSw",
    category: "Relaxation",
    icon: <Headphones />,
    language: "Hindi",
  },
  {
    title: "Kun Faya Kun",
    artist: "A.R. Rahman, Javed Ali",
    duration: "7:51",
    youtubeId: "T94PHkuydcw",
    category: "Meditation",
    icon: <Music />,
    language: "Hindi",
  },
  {
    title: "Reverie (Ambient)",
    artist: "Various Artists",
    duration: "1:00:00",
    youtubeId: "UBBHpoW3AKA",
    category: "Relaxation",
    icon: <Music />,
    language: "Hindi",
  },
  {
    title: "Soft Piano & Rain",
    artist: "Various Artists",
    duration: "3:00:00",
    youtubeId: "9iIX4PBplAY",
    category: "Relaxation",
    icon: <Music />,
    language: "Hindi",
  },
  {
    title: "Relaxing Indian Flute",
    artist: "Various Artists",
    duration: "1:00:00",
    youtubeId: "6w67NOaRe-w",
    category: "Sleep",
    icon: <Bed />,
    language: "Hindi",
  },
  {
    title: "Deep Sleep Meditation",
    artist: "Various Artists",
    duration: "8:00:00",
    youtubeId: "FIaUYKLg5S4",
    category: "Sleep",
    icon: <Bed />,
    language: "Hindi",
  },
  {
    title: "Study Focus Music",
    artist: "Various Artists",
    duration: "1:00:00",
    youtubeId: "x5fYTPvrz4g",
    category: "Focus",
    icon: <Brain />,
    language: "Hindi",
  },
  {
    title: "Indian Forest Sounds",
    artist: "Various Artists",
    duration: "1:00:00",
    youtubeId: "d-uyxvQ7fb4",
    category: "Nature",
    icon: <Wind />,
    language: "Hindi",
  },
  {
    title: "Himalayan Stream",
    artist: "Various Artists",
    duration: "1:00:00",
    youtubeId: "g62J-8nV5FI",
    category: "Nature",
    icon: <Wind />,
    language: "Hindi",
  },
];

export const MusicPlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentTrack, _setCurrentTrack] = useState<Soundscape | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  const youtubeOpts: YouTubeProps["opts"] = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  const setCurrentTrack = (track: Soundscape) => {
    _setCurrentTrack(track);
    setIsPlaying(true);
  };

  const playNextTrack = useCallback(() => {
    if (!currentTrack) return;
    const currentIndex = ALL_SOUNDSCAPES.findIndex(
      (track) => track.youtubeId === currentTrack.youtubeId
    );

    if (currentIndex === -1) {
      setCurrentTrack(ALL_SOUNDSCAPES[0]);
      return;
    }
    const nextIndex = (currentIndex + 1) % ALL_SOUNDSCAPES.length;
    setCurrentTrack(ALL_SOUNDSCAPES[nextIndex]);
  }, [currentTrack]);

  const onPlayerReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
  };

  const onPlayerStateChange = (event: YouTubeEvent<number>) => {
    const playerState = event.data;
    if (playerState === 1) {
      // Playing
      setIsPlaying(true);
    } else if (playerState === 2 || playerState === 0) {
      // Paused or Ended
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const player = playerRef.current;
    if (player && player.getPlayerState) {
      const playerState = player.getPlayerState();
      if (isPlaying && playerState !== 1) {
        player.playVideo();
      } else if (!isPlaying && playerState === 1) {
        player.pauseVideo();
      }
    }
  }, [isPlaying]);

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        setCurrentTrack,
        isPlaying,
        setIsPlaying,
        playNextTrack,
        playerRef, // Exposing the ref
      }}
    >
      {children}
      <div style={{ position: "fixed", top: "-1000px", left: "-1000px" }}>
        {currentTrack && (
          <YouTube
            key={currentTrack.youtubeId}
            videoId={currentTrack.youtubeId}
            opts={youtubeOpts}
            onReady={onPlayerReady}
            onEnd={playNextTrack}
            onStateChange={onPlayerStateChange}
          />
        )}
      </div>
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
};

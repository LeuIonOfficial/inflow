"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import { Howl, Howler } from "howler";
import { Track } from "@/lib/schemas/track";

interface AudioContextType {
  // Current state
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isLoading: boolean;

  // Playlist state
  playlist: Track[];
  currentIndex: number;
  shuffleMode: boolean;
  repeatMode: "none" | "one" | "all";

  // Actions
  play: (track?: Track) => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  addToPlaylist: (track: Track) => void;
  setPlaylist: (tracks: Track[], startIndex?: number) => void;
  removeFromPlaylist: (trackId: string) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;

  // Queue management
  queue: Track[];
  addToQueue: (track: Track) => void;
  clearQueue: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
};

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [playlist, setPlaylistState] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"none" | "one" | "all">("none");
  const [queue, setQueue] = useState<Track[]>([]);

  const howlRef = useRef<Howl | null>(null);
  const timeUpdateInterval = useRef<NodeJS.Timeout | null>(null);

  // Load audio state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedVolume = localStorage.getItem("audio-volume");
      const savedShuffleMode = localStorage.getItem("audio-shuffle");
      const savedRepeatMode = localStorage.getItem("audio-repeat");

      if (savedVolume) setVolumeState(parseFloat(savedVolume));
      if (savedShuffleMode) setShuffleMode(savedShuffleMode === "true");
      if (savedRepeatMode)
        setRepeatMode(savedRepeatMode as "none" | "one" | "all");
    }
  }, []);

  // Save audio state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("audio-volume", volume.toString());
      localStorage.setItem("audio-shuffle", shuffleMode.toString());
      localStorage.setItem("audio-repeat", repeatMode);
    }
  }, [volume, shuffleMode, repeatMode]);

  // Update time
  const startTimeUpdate = useCallback(() => {
    if (timeUpdateInterval.current) clearInterval(timeUpdateInterval.current);
    timeUpdateInterval.current = setInterval(() => {
      if (howlRef.current && howlRef.current.playing()) {
        setCurrentTime(howlRef.current.seek() as number);
      }
    }, 1000);
  }, []);

  const stopTimeUpdate = useCallback(() => {
    if (timeUpdateInterval.current) {
      clearInterval(timeUpdateInterval.current);
      timeUpdateInterval.current = null;
    }
  }, []);

  // Load and play track
  const loadTrack = useCallback(
    (track: Track) => {
      if (howlRef.current) {
        howlRef.current.unload();
      }

      setIsLoading(true);
      setCurrentTrack(track);

      const howl = new Howl({
        src: [track.audioUrl],
        volume: volume,
        onload: () => {
          setIsLoading(false);
          setDuration(howl.duration());
        },
        onplay: () => {
          setIsPlaying(true);
          startTimeUpdate();
        },
        onpause: () => {
          setIsPlaying(false);
          stopTimeUpdate();
        },
        onend: () => {
          setIsPlaying(false);
          stopTimeUpdate();
          // Auto-play next track based on repeat mode
          if (repeatMode === "one") {
            howl.seek(0);
            howl.play();
          } else {
            next();
          }
        },
      });

      howlRef.current = howl;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [volume, repeatMode, startTimeUpdate, stopTimeUpdate]
  );

  // Actions
  const play = useCallback(
    (track?: Track) => {
      if (track) {
        loadTrack(track);
        // Find track in playlist and update index
        const index = playlist.findIndex((t) => t.id === track.id);
        if (index !== -1) {
          setCurrentIndex(index);
        }
      }

      if (howlRef.current) {
        howlRef.current.play();
      }
    },
    [loadTrack, playlist]
  );

  const pause = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.pause();
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else if (currentTrack) {
      play();
    }
  }, [isPlaying, currentTrack, play, pause]);

  const getNextIndex = useCallback(() => {
    if (playlist.length === 0) return 0;

    if (shuffleMode) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } while (nextIndex === currentIndex && playlist.length > 1);
      return nextIndex;
    }

    return (currentIndex + 1) % playlist.length;
  }, [playlist.length, shuffleMode, currentIndex]);

  const getPreviousIndex = useCallback(() => {
    if (playlist.length === 0) return 0;

    if (shuffleMode) {
      let prevIndex;
      do {
        prevIndex = Math.floor(Math.random() * playlist.length);
      } while (prevIndex === currentIndex && playlist.length > 1);
      return prevIndex;
    }

    return currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
  }, [playlist.length, shuffleMode, currentIndex]);

  const next = useCallback(() => {
    if (queue.length > 0) {
      // Play from queue first
      const nextTrack = queue[0];
      setQueue((prev) => prev.slice(1));
      play(nextTrack);
    } else if (playlist.length > 0) {
      const nextIndex = getNextIndex();
      setCurrentIndex(nextIndex);
      play(playlist[nextIndex]);
    }
  }, [queue, playlist, getNextIndex, play]);

  const previous = useCallback(() => {
    if (playlist.length > 0) {
      const prevIndex = getPreviousIndex();
      setCurrentIndex(prevIndex);
      play(playlist[prevIndex]);
    }
  }, [playlist, getPreviousIndex, play]);

  const seek = useCallback((time: number) => {
    if (howlRef.current) {
      howlRef.current.seek(time);
      setCurrentTime(time);
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    Howler.volume(clampedVolume);
    if (howlRef.current) {
      howlRef.current.volume(clampedVolume);
    }
  }, []);

  const addToPlaylist = useCallback((track: Track) => {
    setPlaylistState((prev) => [...prev, track]);
  }, []);

  const setPlaylist = useCallback(
    (tracks: Track[], startIndex = 0) => {
      setPlaylistState(tracks);
      setCurrentIndex(startIndex);
      if (tracks[startIndex]) {
        play(tracks[startIndex]);
      }
    },
    [play]
  );

  const removeFromPlaylist = useCallback((trackId: string) => {
    setPlaylistState((prev) => prev.filter((track) => track.id !== trackId));
  }, []);

  const toggleShuffle = useCallback(() => {
    setShuffleMode((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      switch (prev) {
        case "none":
          return "all";
        case "all":
          return "one";
        case "one":
          return "none";
      }
    });
  }, []);

  const addToQueue = useCallback((track: Track) => {
    setQueue((prev) => [...prev, track]);
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (howlRef.current) {
        howlRef.current.unload();
      }
      stopTimeUpdate();
    };
  }, [stopTimeUpdate]);

  const value: AudioContextType = {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    isLoading,
    playlist,
    currentIndex,
    shuffleMode,
    repeatMode,
    queue,
    play,
    pause,
    toggle,
    next,
    previous,
    seek,
    setVolume,
    addToPlaylist,
    setPlaylist,
    removeFromPlaylist,
    toggleShuffle,
    toggleRepeat,
    addToQueue,
    clearQueue,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

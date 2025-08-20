"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
  ChevronUp,
  ChevronDown,
  List,
} from "lucide-react";
import { EnhancedImage } from "@/components/enhanced-image";

import { useAudio } from "./audio-context";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function GlobalAudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    isLoading,

    shuffleMode,
    repeatMode,
    queue,
    toggle,
    next,
    previous,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat,
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  // Format time helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Progress percentage
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Handle volume mute/unmute
  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  // Handle seek
  const handleSeek = (value: number[]) => {
    const newTime = (value[0] / 100) * duration;
    seek(newTime);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle if no input is focused
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      switch (e.code) {
        case "Space":
          e.preventDefault();
          toggle();
          break;
        case "ArrowRight":
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            next();
          }
          break;
        case "ArrowLeft":
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            previous();
          }
          break;
        case "ArrowUp":
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            setVolume(Math.min(1, volume + 0.1));
          }
          break;
        case "ArrowDown":
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            setVolume(Math.max(0, volume - 0.1));
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [toggle, next, previous, volume, setVolume]);

  // Don't render if no current track
  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border"
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
          <motion.div
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Mini player */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
            {/* Track info */}
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              {currentTrack?.cover && (
                <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                  <EnhancedImage
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                    aspectRatio="1/1"
                    showHoverEffect={false}
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-sm truncate">
                  {currentTrack.title}
                </h4>
                {currentTrack?.album && (
                  <p className="text-xs text-muted-foreground truncate">
                    {currentTrack.album}
                  </p>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={previous}
                className="h-8 w-8 p-0 hidden sm:inline-flex"
              >
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggle}
                disabled={isLoading}
                className="h-10 w-10 p-0"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={next}
                className="h-8 w-8 p-0 hidden sm:inline-flex"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Volume & expand */}
            <div className="flex items-center space-x-2 flex-1 justify-end">
              {/* Volume control - hidden on mobile */}
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="h-8 w-8 p-0"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <div className="w-20">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Time display */}
              <div className="text-xs text-muted-foreground hidden sm:block">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              {/* Expand button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8 p-0"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Expanded player */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-border overflow-hidden"
            >
              <div className="p-6 max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Track info */}
                  <div className="flex items-center space-x-4">
                    {currentTrack?.cover && (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <EnhancedImage
                          src={currentTrack.cover}
                          alt={currentTrack.title}
                          className="w-full h-full object-cover"
                          aspectRatio="1/1"
                          showHoverEffect={false}
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-lg truncate">
                        {currentTrack.title}
                      </h3>
                      {currentTrack.album && (
                        <p className="text-muted-foreground truncate">
                          {currentTrack.album}
                        </p>
                      )}
                      {currentTrack.year && (
                        <p className="text-sm text-muted-foreground">
                          {currentTrack.year}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleShuffle}
                        className={cn(
                          "h-8 w-8 p-0",
                          shuffleMode && "text-primary"
                        )}
                      >
                        <Shuffle className="h-4 w-4" />
                      </Button>

                      <Button variant="ghost" size="sm" onClick={previous}>
                        <SkipBack className="h-5 w-5" />
                      </Button>

                      <Button
                        variant="default"
                        size="lg"
                        onClick={toggle}
                        disabled={isLoading}
                        className="h-12 w-12 rounded-full p-0"
                      >
                        {isLoading ? (
                          <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : isPlaying ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6 ml-0.5" />
                        )}
                      </Button>

                      <Button variant="ghost" size="sm" onClick={next}>
                        <SkipForward className="h-5 w-5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleRepeat}
                        className={cn(
                          "h-8 w-8 p-0",
                          repeatMode !== "none" && "text-primary"
                        )}
                      >
                        {repeatMode === "one" ? (
                          <Repeat1 className="h-4 w-4" />
                        ) : (
                          <Repeat className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground w-10 text-right">
                        {formatTime(currentTime)}
                      </span>
                      <div className="flex-1">
                        <Slider
                          value={[progress]}
                          max={100}
                          step={0.1}
                          onValueChange={handleSeek}
                          className="w-full"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-10">
                        {formatTime(duration)}
                      </span>
                    </div>
                  </div>

                  {/* Queue and volume */}
                  <div className="flex items-center justify-end space-x-4">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm" className="relative">
                          <List className="h-4 w-4" />
                          {queue.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {queue.length}
                            </span>
                          )}
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <div className="space-y-4">
                          <h3 className="font-semibold">Queue</h3>
                          {queue.length === 0 ? (
                            <p className="text-muted-foreground">
                              No tracks in queue
                            </p>
                          ) : (
                            <div className="space-y-2">
                              {queue.map((track, index) => (
                                <div
                                  key={`${track.id}-${index}`}
                                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted"
                                >
                                  {track.cover && (
                                    <div className="relative w-8 h-8 rounded overflow-hidden">
                                      <EnhancedImage
                                        src={track.cover}
                                        alt={track.title}
                                        className="w-full h-full object-cover"
                                        aspectRatio="1/1"
                                        showHoverEffect={false}
                                      />
                                    </div>
                                  )}
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium truncate">
                                      {track.title}
                                    </p>
                                    {track.album && (
                                      <p className="text-xs text-muted-foreground truncate">
                                        {track.album}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </SheetContent>
                    </Sheet>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleMute}
                        className="h-8 w-8 p-0"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </Button>
                      <div className="w-24">
                        <Slider
                          value={[isMuted ? 0 : volume]}
                          max={1}
                          step={0.01}
                          onValueChange={handleVolumeChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

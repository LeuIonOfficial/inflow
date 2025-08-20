"use client";

import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import ReactPlayer from "react-player";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SimpleVideoPlayerProps {
  url: string;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "auto";
  showControls?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export function SimpleVideoPlayer({
  url,
  className,
  aspectRatio = "auto",
  showControls = true,
  muted = false,
  loop = false,
}: SimpleVideoPlayerProps) {
  const [isReady, setIsReady] = useState(false);

  // Detect platform from URL
  function detectPlatform(url: string): "youtube" | "vimeo" | "direct" {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "youtube";
    }
    if (url.includes("vimeo.com")) {
      return "vimeo";
    }
    return "direct";
  }

  const platform = detectPlatform(url);

  // Handle external link
  const handleExternalLink = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Get aspect ratio styles
  const getAspectRatioStyles = () => {
    switch (aspectRatio) {
      case "16/9":
        return { aspectRatio: "16/9" };
      case "4/3":
        return { aspectRatio: "4/3" };
      case "1/1":
        return { aspectRatio: "1/1" };
      default:
        return { aspectRatio: "16/9" };
    }
  };

  return (
    <div
      className={cn("relative overflow-hidden rounded-lg bg-black", className)}
      style={getAspectRatioStyles()}
    >
      {/* ReactPlayer */}
      <ReactPlayer
        src={url}
        muted={muted}
        loop={loop}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
        onReady={() => setIsReady(true)}
        controls={false}
      />

      {/* Simple External Link Button */}
      {showControls && platform !== "direct" && (
        <div className="absolute top-2 right-2 pointer-events-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExternalLink}
            className="bg-black/40 hover:bg-black/60 text-white border-white/20"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Watch on {platform === "youtube" ? "YouTube" : "Vimeo"}
          </Button>
        </div>
      )}

      {/* Loading State */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
}

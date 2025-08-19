"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

interface VideoEmbedProps {
  video: {
    url: string;
    title: string;
    thumbnail?: string;
    platform: "youtube" | "vimeo" | "direct";
  };
  className?: string;
}

export function VideoEmbed({ video, className }: VideoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const getEmbedUrl = (url: string, platform: string) => {
    switch (platform) {
      case "youtube":
        // Extract video ID from various YouTube URL formats
        const youtubeMatch = url.match(
          /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
        );
        const videoId = youtubeMatch?.[1];
        return videoId
          ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
          : url;

      case "vimeo":
        // Extract video ID from Vimeo URL
        const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
        const vimeoId = vimeoMatch?.[1];
        return vimeoId
          ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1`
          : url;

      case "direct":
      default:
        return url;
    }
  };

  const getThumbnail = () => {
    if (video.thumbnail) return video.thumbnail;

    // Generate thumbnail for YouTube videos
    if (video.platform === "youtube") {
      const youtubeMatch = video.url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
      );
      const videoId = youtubeMatch?.[1];
      return videoId
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        : null;
    }

    return null;
  };

  const handlePlay = () => {
    setIsLoaded(true);
  };

  const handleExternalLink = () => {
    window.open(video.url, "_blank", "noopener,noreferrer");
  };

  const thumbnail = getThumbnail();
  const embedUrl = getEmbedUrl(video.url, video.platform);

  return (
    <div
      className={`relative aspect-video rounded-lg overflow-hidden bg-muted ${className}`}
    >
      {!isLoaded ? (
        // Thumbnail with play button
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-full group cursor-pointer"
          onClick={handlePlay}
        >
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
              <Play className="h-16 w-16 text-muted-foreground" />
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="h-20 w-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-2xl"
            >
              <Play className="h-8 w-8 text-primary-foreground ml-1" />
            </motion.div>
          </div>

          {/* Video Title */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-medium mb-2">{video.title}</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleExternalLink();
                }}
                className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Watch on{" "}
                {video.platform === "youtube"
                  ? "YouTube"
                  : video.platform === "vimeo"
                    ? "Vimeo"
                    : "External"}
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        // Embedded video
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {video.platform === "direct" ? (
            <video
              src={video.url}
              controls
              autoPlay
              className="w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              src={embedUrl}
              title={video.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </motion.div>
      )}
    </div>
  );
}

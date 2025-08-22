"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface EnhancedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "auto";
  showHoverEffect?: boolean;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

export function EnhancedImage({
  src,
  alt,
  className,
  aspectRatio = "auto",
  showHoverEffect = true,
  priority = false,
  fill = true,
  sizes = "100vw",
}: EnhancedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Get aspect ratio styles
  const getAspectRatioStyles = () => {
    if (aspectRatio === "auto") return {};

    switch (aspectRatio) {
      case "16/9":
        return { aspectRatio: "16/9" };
      case "4/3":
        return { aspectRatio: "4/3" };
      case "1/1":
        return { aspectRatio: "1/1" };
      default:
        return {};
    }
  };

  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted rounded-lg",
          className
        )}
        style={getAspectRatioStyles()}
      >
        <div className="text-center text-muted-foreground">
          <div className="text-2xl mb-2">📷</div>
          <div className="text-sm">Image not available</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden rounded-lg bg-muted", className)}
      style={getAspectRatioStyles()}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-cover transition-transform duration-500",
          showHoverEffect && "hover:scale-105",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />

      {/* Loading State */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
}

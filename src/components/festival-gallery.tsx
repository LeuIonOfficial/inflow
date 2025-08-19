"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import Image from "next/image";

import { Festival } from "@/lib/schemas/festival";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface FestivalGalleryProps {
  festival: Festival;
}

export function FestivalGallery({ festival }: FestivalGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex === null) return;
    const newIndex =
      selectedImageIndex === 0
        ? festival.photos.length - 1
        : selectedImageIndex - 1;
    setSelectedImageIndex(newIndex);
  };

  const goToNext = () => {
    if (selectedImageIndex === null) return;
    const newIndex =
      selectedImageIndex === festival.photos.length - 1
        ? 0
        : selectedImageIndex + 1;
    setSelectedImageIndex(newIndex);
  };

  // Handle keyboard navigation
  const handleKeyPress = (e: KeyboardEvent) => {
    if (!isLightboxOpen) return;

    switch (e.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        goToPrevious();
        break;
      case "ArrowRight":
        goToNext();
        break;
    }
  };

  // Add keyboard event listeners
  useState(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  if (festival.photos.length === 0) {
    return (
      <div className="text-center py-12">
        <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">
          No photos available for this performance.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {festival.photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative aspect-[4/3] cursor-pointer group overflow-hidden rounded-lg"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={photo.url}
              alt={photo.caption || `${festival.name} photo ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

            {/* Caption overlay */}
            {photo.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">
                  {photo.caption}
                </p>
                {photo.photographer && (
                  <p className="text-white/70 text-xs">
                    Photo by {photo.photographer}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-0">
          <div className="relative w-full h-full flex items-center justify-center">
            {selectedImageIndex !== null && (
              <>
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
                  onClick={closeLightbox}
                >
                  <X className="h-6 w-6" />
                </Button>

                {/* Navigation Buttons */}
                {festival.photos.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
                      onClick={goToPrevious}
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
                      onClick={goToNext}
                    >
                      <ChevronRight className="h-8 w-8" />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute top-4 left-4 z-50 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {festival.photos.length}
                </div>

                {/* Main Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="relative max-w-full max-h-full"
                  >
                    <Image
                      src={festival.photos[selectedImageIndex].url}
                      alt={
                        festival.photos[selectedImageIndex].caption ||
                        `${festival.name} photo ${selectedImageIndex + 1}`
                      }
                      width={1200}
                      height={800}
                      className="max-w-full max-h-full object-contain"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Image Info */}
                {festival.photos[selectedImageIndex].caption && (
                  <div className="absolute bottom-4 left-4 right-4 z-50 text-center">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white">
                      <p className="font-medium mb-1">
                        {festival.photos[selectedImageIndex].caption}
                      </p>
                      {festival.photos[selectedImageIndex].photographer && (
                        <p className="text-sm text-white/70">
                          Photo by{" "}
                          {festival.photos[selectedImageIndex].photographer}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

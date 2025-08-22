"use client";

import { motion } from "framer-motion";
import { Play, Plus, Clock, Calendar, Pause } from "lucide-react";
import { useTranslations } from "next-intl";
import { EnhancedImage } from "@/components/enhanced-image";

import { type Track } from "@/lib/schemas/track";
import { useAudio } from "@/components/audio/audio-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MusicPageClientProps {
  tracks: Track[];
}

export function MusicPageClient({ tracks }: MusicPageClientProps) {
  const t = useTranslations();
  const { play, setPlaylist, addToQueue, currentTrack, isPlaying } = useAudio();

  const handlePlayTrack = (track: Track) => {
    play(track);
  };

  const handlePlayAll = () => {
    setPlaylist(tracks, 0);
  };

  const handleAddToQueue = (track: Track) => {
    addToQueue(track);
  };

  // Group tracks by album
  const albumGroups = tracks.reduce(
    (groups, track) => {
      const album = track.album || t("Singles");
      if (!groups[album]) {
        groups[album] = [];
      }
      groups[album].push(track);
      return groups;
    },
    {} as Record<string, Track[]>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Play All Button */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button size="lg" onClick={handlePlayAll} className="group">
            <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
            {t("Play All")}
          </Button>
        </motion.div>
      </div>

      {/* Albums */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {Object.entries(albumGroups).map(([albumName, albumTracks]) => (
          <motion.div key={albumName} variants={cardVariants}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">{albumName}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {albumTracks.length} track
                  {albumTracks.length !== 1 ? "s" : ""}
                </span>
                {albumTracks[0]?.year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {albumTracks[0].year}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albumTracks.map((track) => (
                <Card
                  key={track.id}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-4">
                    <div className="aspect-square relative overflow-hidden rounded-lg">
                      {track.cover ? (
                        <EnhancedImage
                          src={track.cover}
                          alt={`${track.title} cover`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Calendar className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}

                      {/* Play button overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          size="sm"
                          className="h-12 w-12 rounded-full"
                          onClick={() => handlePlayTrack(track)}
                        >
                          {currentTrack?.id === track.id && isPlaying ? (
                            <Pause className="h-6 w-6" />
                          ) : (
                            <Play className="h-6 w-6" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg leading-tight">
                        {track.title}
                      </h3>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{track.duration}</span>
                        {track.genre && (
                          <Badge variant="secondary" className="text-xs">
                            {track.genre}
                          </Badge>
                        )}
                      </div>

                      {track.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {track.description}
                        </p>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePlayTrack(track)}
                          className="flex-1"
                        >
                          {currentTrack?.id === track.id && isPlaying ? (
                            <>
                              <Pause className="mr-1 h-3 w-3" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="mr-1 h-3 w-3" />
                              Play
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAddToQueue(track)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

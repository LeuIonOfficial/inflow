"use client";

import { motion } from "framer-motion";
import { Play, Plus, Clock, Calendar } from "lucide-react";
import Image from "next/image";

import { tracks } from "@/lib/data/tracks";
import { useAudio } from "@/components/audio/audio-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TextAnimate } from "@/components/ui/text-animate";

export default function MusicPage() {
  const { play, setPlaylist, addToQueue, currentTrack, isPlaying } = useAudio();

  const handlePlayTrack = (track: (typeof tracks)[0]) => {
    play(track);
  };

  const handlePlayAll = () => {
    setPlaylist(tracks, 0);
  };

  const handleAddToQueue = (track: (typeof tracks)[0]) => {
    addToQueue(track);
  };

  // Group tracks by album
  const albumGroups = tracks.reduce(
    (groups, track) => {
      const album = track.album || "Singles";
      if (!groups[album]) {
        groups[album] = [];
      }
      groups[album].push(track);
      return groups;
    },
    {} as Record<string, typeof tracks>
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <TextAnimate
            animation="blurInUp"
            by="word"
            className="text-4xl md:text-6xl font-bold mb-6"
            as="h1"
          >
            Our Music
          </TextAnimate>
          <TextAnimate
            animation="slideUp"
            by="word"
            delay={0.3}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            as="p"
          >
            Explore our discography featuring powerful rock anthems, emotional
            ballads, and electrifying performances.
          </TextAnimate>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button size="lg" onClick={handlePlayAll} className="group">
              <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Play All Tracks
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
            <motion.div key={albumName} variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {albumTracks[0]?.cover && (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={albumTracks[0].cover}
                            alt={albumName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h2 className="text-2xl font-bold">{albumName}</h2>
                        {albumTracks[0]?.year && (
                          <p className="text-muted-foreground flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            {albumTracks[0].year}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setPlaylist(albumTracks, 0)}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Play Album
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {albumTracks.map((track, index) => (
                      <motion.div
                        key={track.id}
                        whileHover={{ scale: 1.01 }}
                        className="group flex items-center space-x-4 p-3 rounded-md hover:bg-muted/50 cursor-pointer"
                        onClick={() => handlePlayTrack(track)}
                      >
                        {/* Track number */}
                        <div className="w-8 h-8 flex items-center justify-center text-sm text-muted-foreground group-hover:text-foreground">
                          {currentTrack?.id === track.id && isPlaying ? (
                            <div className="w-4 h-4 flex items-center justify-center">
                              <div className="flex space-x-0.5">
                                <div className="w-0.5 h-3 bg-primary animate-pulse" />
                                <div
                                  className="w-0.5 h-2 bg-primary animate-pulse"
                                  style={{ animationDelay: "0.1s" }}
                                />
                                <div
                                  className="w-0.5 h-4 bg-primary animate-pulse"
                                  style={{ animationDelay: "0.2s" }}
                                />
                              </div>
                            </div>
                          ) : (
                            <span className="group-hover:hidden">
                              {index + 1}
                            </span>
                          )}
                          <Play className="h-4 w-4 hidden group-hover:block" />
                        </div>

                        {/* Track info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                              {track.title}
                            </h3>
                            {track.isSingle && (
                              <Badge variant="secondary" className="text-xs">
                                Single
                              </Badge>
                            )}
                          </div>
                          {track.description && (
                            <p className="text-sm text-muted-foreground truncate">
                              {track.description}
                            </p>
                          )}
                        </div>

                        {/* Duration */}
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{track.duration}</span>
                        </div>

                        {/* Add to queue */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToQueue(track);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary">
                {tracks.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Tracks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                {Object.keys(albumGroups).length}
              </div>
              <div className="text-sm text-muted-foreground">Albums & EPs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50M+</div>
              <div className="text-sm text-muted-foreground">Total Streams</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

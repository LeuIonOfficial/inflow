"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Play, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Festival } from "@/lib/schemas/festival";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FestivalCardProps {
  festival: Festival;
  index?: number;
}

export function FestivalCard({ festival, index = 0 }: FestivalCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: Festival["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "completed":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const primaryImage = festival.photos[0]
    ? typeof festival.photos[0] === "string"
      ? festival.photos[0]
      : festival.photos[0].url
    : festival.videos[0]?.thumbnail;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden group cursor-pointer h-full">
        {/* Featured Image */}
        {primaryImage && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={primaryImage}
              alt={festival.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <Badge className={`${getStatusColor(festival.status)} border`}>
                {festival.status === "upcoming"
                  ? "Upcoming"
                  : festival.status === "completed"
                    ? "Completed"
                    : "Cancelled"}
              </Badge>
            </div>

            {/* Play Button Overlay */}
            {festival.videos.length > 0 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="h-16 w-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
                  <Play className="h-6 w-6 text-primary-foreground ml-1" />
                </div>
              </div>
            )}
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="space-y-2">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
              {festival.name}
            </h3>

            {/* Date and Location */}
            <div className="space-y-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {formatDate(festival.date)}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                {festival.location.city}, {festival.location.country}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-4">
            {/* Venue and Stage */}
            <div className="space-y-1">
              <p className="text-sm font-medium">{festival.location.venue}</p>
              {festival.stage && (
                <p className="text-xs text-muted-foreground">
                  {festival.stage}
                </p>
              )}
            </div>

            {/* Description Preview */}
            <p className="text-sm text-muted-foreground line-clamp-3">
              {festival.descriptionMD.split("\n")[0].substring(0, 120)}...
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{festival.photos.length} Photos</span>
              <span>{festival.videos.length} Videos</span>
              <span>{festival.setlist.length} Songs</span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-2">
              <Button
                asChild
                variant="default"
                className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                <Link href={`/portfolio/festivals/${festival.slug}`}>
                  View Details
                </Link>
              </Button>

              {festival.ticketUrl && festival.status === "upcoming" && (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={festival.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

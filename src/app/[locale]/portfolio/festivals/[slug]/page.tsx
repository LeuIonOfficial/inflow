"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Music,
  Quote,
  ExternalLink,
  Play,
  Camera,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EnhancedImage } from "@/components/enhanced-image";

import { Festival } from "@/lib/schemas/festival";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TextAnimate } from "@/components/ui/text-animate";
import { FestivalGallery } from "@/components/festival-gallery";
import { VideoEmbed } from "@/components/video-embed";

type FestivalPageProps = Record<string, never>;

export default function FestivalPage({}: FestivalPageProps) {
  const params = useParams();
  const slug = params.slug as string;
  const [festival, setFestival] = useState<Festival | null>(null);
  const [otherFestivals, setOtherFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [festivalResponse, festivalsResponse] = await Promise.all([
          fetch(`/api/festivals/${slug}`),
          fetch("/api/festivals"),
        ]);

        const festivalResult = await festivalResponse.json();
        const festivalsResult = await festivalsResponse.json();

        if (festivalResult.success) {
          setFestival(festivalResult.data);
        } else {
          setFestival(null);
        }

        if (festivalsResult.success) {
          setOtherFestivals(
            festivalsResult.data.filter((f: Festival) => f.slug !== slug)
          );
        }
      } catch (error) {
        console.error("Error fetching festival data:", error);
        setFestival(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen py-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading festival...</p>
        </div>
      </div>
    );
  }

  if (!festival) {
    return (
      <div className="min-h-screen py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-2xl font-bold mb-4">Festival Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The festival you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/portfolio/festivals">Back to Festivals</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: typeof festival.status) => {
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

  // Convert markdown to paragraphs (simple implementation)
  const descriptionParagraphs = festival.descriptionMD
    .split("\n\n")
    .filter((p) => p.trim());

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild className="group">
            <Link href="/portfolio/festivals">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Festivals
            </Link>
          </Button>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Festival Info */}
            <div className="flex-1">
              <div className="mb-4">
                <Badge
                  className={`${getStatusColor(festival.status)} border mb-4`}
                >
                  {festival.status === "upcoming"
                    ? "Upcoming"
                    : festival.status === "completed"
                      ? "Completed"
                      : "Cancelled"}
                </Badge>

                <TextAnimate
                  animation="blurInUp"
                  by="word"
                  className="text-3xl md:text-5xl font-bold mb-4"
                  as="h1"
                >
                  {festival.name}
                </TextAnimate>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-3 h-5 w-5" />
                  <span>{formatDate(festival.date)}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-3 h-5 w-5" />
                  <span>
                    {festival.location.venue}, {festival.location.city},{" "}
                    {festival.location.country}
                  </span>
                </div>
                {festival.stage && (
                  <div className="flex items-center text-muted-foreground">
                    <Users className="mr-3 h-5 w-5" />
                    <span>{festival.stage}</span>
                  </div>
                )}
              </div>

              {/* Ticket Link */}
              {festival.ticketUrl && festival.status === "upcoming" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <Button asChild size="lg">
                    <a
                      href={festival.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Get Tickets
                    </a>
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Featured Image */}
            {festival.photos[0] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:w-1/2"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <EnhancedImage
                    src={festival.photos[0].url}
                    alt={festival.name}
                    className="w-full h-full object-cover"
                    aspectRatio="auto"
                    showHoverEffect={false}
                    priority
                  />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>About This Performance</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none dark:prose-invert">
              {descriptionParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-muted-foreground leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Setlist */}
          {festival.setlist.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Music className="mr-2 h-5 w-5" />
                    Setlist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {festival.setlist.map((song, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-3 w-6">
                          {index + 1}.
                        </span>
                        <span className="font-medium">{song}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Press Quotes */}
          {festival.pressQuotes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Quote className="mr-2 h-5 w-5" />
                    Press & Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {festival.pressQuotes.map((quote, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <blockquote className="text-lg italic mb-2">
                        &quot;{quote.quote}&quot;
                      </blockquote>
                      <div className="flex items-center justify-between">
                        <cite className="text-sm font-medium">
                          — {quote.author ? `${quote.author}, ` : ""}
                          {quote.source}
                        </cite>
                        {quote.url && (
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={quote.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Videos */}
        {festival.videos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mb-12"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  Performance Videos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {festival.videos.map((video, index) => (
                    <VideoEmbed key={index} video={video} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Photo Gallery */}
        {festival.photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mb-12"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="mr-2 h-5 w-5" />
                  Photo Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FestivalGallery festival={festival} />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Other Festivals */}
        {otherFestivals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">
              Other Performances
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherFestivals.slice(0, 3).map((otherFestival) => (
                <motion.div
                  key={otherFestival.slug}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/portfolio/festivals/${otherFestival.slug}`}>
                    <Card className="overflow-hidden group cursor-pointer h-full">
                      {otherFestival.photos[0] && (
                        <div className="relative aspect-[16/10]">
                          <EnhancedImage
                            src={otherFestival.photos[0].url}
                            alt={otherFestival.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            aspectRatio="auto"
                            showHoverEffect={false}
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <h4 className="font-semibold group-hover:text-primary transition-colors mb-1">
                          {otherFestival.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {otherFestival.location.city},{" "}
                          {otherFestival.location.country}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(otherFestival.date)}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

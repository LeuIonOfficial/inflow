"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Calendar, Music, Users } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Button } from "@/components/ui/button";
import { PromoSection } from "@/components/promo-section";
import { BadgeList } from "@/components/badge-list";

const pressItems = [
  {
    name: "Rolling Stone",
    logo: "/images/logos/rolling-stone.png",
    url: "#",
    quote: "A powerhouse performance that left the crowd begging for more.",
  },
  {
    name: "NME",
    logo: "/images/logos/nme.png",
    url: "#",
    quote: "Raw energy and incredible musicianship define this band.",
  },
  { name: "Pitchfork", logo: "/images/logos/pitchfork.png", url: "#" },
  { name: "Billboard", logo: "/images/logos/billboard.png", url: "#" },
  {
    name: "Kerrang!",
    logo: "/images/logos/kerrang.png",
    url: "#",
    quote: "They've mastered the art of stadium-shaking rock.",
  },
  { name: "Metal Hammer", logo: "/images/logos/metal-hammer.png", url: "#" },
];

const stats = [
  { icon: Music, value: "50M+", label: "Streams" },
  { icon: Users, value: "500K+", label: "Monthly Listeners" },
  { icon: Calendar, value: "100+", label: "Shows Played" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <AnimatedGradientText className="text-sm font-medium uppercase tracking-wider">
              🎸 New Single Out Now
            </AnimatedGradientText>
          </motion.div>

          <div className="space-y-6 mb-8">
            <TextAnimate
              animation="blurInUp"
              by="word"
              className="text-4xl md:text-6xl lg:text-8xl font-bold leading-tight"
              as="h1"
            >
              INFLOW
            </TextAnimate>

            <TextAnimate
              animation="slideUp"
              by="word"
              delay={0.5}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              as="p"
            >
              Moldova&apos;s premier rock band. Join us on our journey through
              festivals, albums, and unforgettable live performances that define
              modern rock music.
            </TextAnimate>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button size="lg" className="group">
              <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Listen to &quot;Thunder Road&quot;
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/portfolio/festivals">View Live Performances</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-muted-foreground/30 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Press Section */}
      <BadgeList
        title="As Featured In"
        items={pressItems}
        className="bg-muted/20"
      />

      {/* Latest Single Promo */}
      <PromoSection
        subtitle="Latest Single"
        title="Thunder Road"
        description="Our most powerful track yet - a thunderous journey through raw emotion and electrifying sound. Experience the energy that's been captivating audiences worldwide."
        ctaText="Listen Now"
        ctaHref="/music"
        mediaUrl="/images/thunder-road-cover.jpg"
        mediaType="image"
        className="bg-gradient-to-br from-background to-muted/10"
      />

      {/* Upcoming Shows */}
      <PromoSection
        subtitle="Live Performances"
        title="See Us Live"
        description="Nothing compares to the raw energy of our live performances. Join thousands of fans as we bring our music to life on stage across the world's biggest festivals."
        ctaText="View All Shows"
        ctaHref="/portfolio/festivals"
        mediaUrl="/images/live-performance.jpg"
        mediaType="image"
        layout="reverse"
        className="bg-muted/10"
      />

      {/* Band Spotlight */}
      <PromoSection
        subtitle="Meet the Band"
        title="The Artists Behind the Music"
        description="Get to know the talented musicians who pour their hearts and souls into every performance. From our lead guitarist's blazing solos to our drummer's thunderous beats."
        ctaText="Meet the Band"
        ctaHref="/band"
        mediaUrl="/images/band-photo.jpg"
        mediaType="image"
        layout="centered"
        className="bg-gradient-to-t from-muted/20 to-background"
      />
    </div>
  );
}

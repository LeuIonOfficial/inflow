"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Filter, SortAsc, Link } from "lucide-react";

import { festivals } from "@/lib/data/festivals";
import { FestivalCard } from "@/components/festival-card";
import { TextAnimate } from "@/components/ui/text-animate";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterType = "all" | "upcoming" | "completed" | "cancelled";
type SortType = "date-desc" | "date-asc" | "name-asc" | "name-desc";

const stats = [
  {
    icon: Calendar,
    value: festivals.length.toString(),
    label: "Total Performances",
  },
  {
    icon: MapPin,
    value: new Set(festivals.map((f) => f.location.country)).size.toString(),
    label: "Countries",
  },
  {
    icon: Calendar,
    value: festivals.filter((f) => f.status === "upcoming").length.toString(),
    label: "Upcoming Shows",
  },
];

export default function FestivalsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("date-desc");

  // Filter festivals
  const filteredFestivals = festivals.filter((festival) => {
    if (filter === "all") return true;
    return festival.status === filter;
  });

  // Sort festivals
  const sortedFestivals = [...filteredFestivals].sort((a, b) => {
    switch (sort) {
      case "date-asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "date-desc":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <TextAnimate
            animation="blurInUp"
            by="word"
            className="text-4xl md:text-6xl font-bold mb-6"
            as="h1"
          >
            Live Performances
          </TextAnimate>
          <TextAnimate
            animation="slideUp"
            by="word"
            delay={0.3}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
            as="p"
          >
            Experience the raw energy of our live performances at festivals and
            venues around the world. From intimate club shows to massive
            festival stages, we bring the same passion and intensity to every
            performance.
          </TextAnimate>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -2 }}
              className="text-center p-6 rounded-lg bg-muted/50 border border-border/50"
            >
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters and Sorting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={filter}
              onValueChange={(value: FilterType) => setFilter(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Performances</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <SortAsc className="h-4 w-4 text-muted-foreground" />
            <Select
              value={sort}
              onValueChange={(value: SortType) => setSort(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Date (Newest)</SelectItem>
                <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="sm:ml-auto text-sm text-muted-foreground self-center">
            Showing {sortedFestivals.length} of {festivals.length} performances
          </div>
        </motion.div>

        {/* Festivals Grid */}
        {sortedFestivals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">
              No performances found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters to see more performances.
            </p>
            <Button onClick={() => setFilter("all")}>
              Show All Performances
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sortedFestivals.map((festival, index) => (
              <FestivalCard
                key={festival.slug}
                festival={festival}
                index={index}
              />
            ))}
          </motion.div>
        )}

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20"
        >
          <h3 className="text-2xl font-bold mb-4">Want to Book Us?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We&apos;re always looking for new stages to rock and audiences to
            energize. Whether it&apos;s a festival, private event, or venue
            booking, let&apos;s make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default">
              <a href="/contact">Get in Touch</a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/music">Listen to Our Music</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

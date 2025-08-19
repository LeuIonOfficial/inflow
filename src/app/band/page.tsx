"use client";

import { motion } from "framer-motion";
import { Users, Music, Calendar, Award } from "lucide-react";

import { members } from "@/lib/data/members";
import { MemberCard } from "@/components/member-card";
import { TextAnimate } from "@/components/ui/text-animate";

const stats = [
  { icon: Users, value: members.length.toString(), label: "Band Members" },
  { icon: Music, value: "6+", label: "Years Together" },
  { icon: Calendar, value: "100+", label: "Shows Played" },
  { icon: Award, value: "3", label: "Albums Released" },
];

export default function BandPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
            Meet the Band
          </TextAnimate>
          <TextAnimate
            animation="slideUp"
            by="word"
            delay={0.3}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
            as="p"
          >
            Get to know the talented musicians who bring our music to life. Each
            member brings their unique style, experience, and passion to create
            the powerful sound that defines RockBand.
          </TextAnimate>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
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

        {/* Band story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="text-lg text-muted-foreground space-y-4">
            <p>
              INFLOW was formed in 2018 when four passionate musicians came
              together with a shared vision: to create music that moves people
              both emotionally and physically. What started as jam sessions in a
              Detroit garage has evolved into a powerhouse rock act that
              commands stages across the world.
            </p>
            <p>
              Our sound blends classic rock foundations with modern production
              techniques, creating anthems that resonate with both longtime rock
              fans and new generations discovering the genre. Each member brings
              their unique background and influences, resulting in a rich,
              layered sound that&apos;s distinctly our own.
            </p>
            <p>
              From intimate club shows to major festival headlining slots,
              we&apos;ve built our reputation on delivering high-energy
              performances that leave audiences wanting more. Our chemistry on
              stage reflects the deep musical connection we&apos;ve developed
              over years of creating and performing together.
            </p>
          </div>
        </motion.div>

        {/* Members grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {members.map((member, index) => (
            <MemberCard key={member.slug} member={member} index={index} />
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20"
        >
          <h3 className="text-2xl font-bold mb-4">Experience Our Music Live</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            The best way to truly understand our music is to experience it live.
            Check out our upcoming shows and see why our performances are
            creating buzz across the rock scene.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/portfolio/festivals"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              View Live Performances
            </motion.a>
            <motion.a
              href="/music"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-border font-medium hover:bg-muted transition-colors"
            >
              Listen to Our Music
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

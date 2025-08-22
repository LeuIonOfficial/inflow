"use client";

import { motion } from "framer-motion";
import { Users, Music, Calendar, Award } from "lucide-react";
import { useTranslations } from "next-intl";

import { type Member } from "@/lib/schemas/member";
import { MemberCard } from "@/components/member-card";

interface BandPageClientProps {
  members: Member[];
}

export function BandPageClient({ members }: BandPageClientProps) {
  const t = useTranslations();

  const stats = [
    { icon: Users, value: members.length.toString(), label: t("Band Members") },
    { icon: Music, value: "6+", label: t("Years Together") },
    { icon: Calendar, value: t("100+"), label: t("Shows Played") },
    { icon: Award, value: "3", label: t("Albums Released") },
  ];

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
    <>
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
        <h2 className="text-3xl font-bold mb-6">{t("Our Story")}</h2>
        <div className="text-lg text-muted-foreground space-y-4">
          <p>{t("INFLOW was formed in 2018 when four passionate musicians")}</p>
          <p>{t("Our sound blends classic rock foundations")}</p>
          <p>
            {t("From intimate club shows to major festival headlining slots")}
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
        <h3 className="text-2xl font-bold mb-4">
          {t("Experience Our Music Live")}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          {t("The best way to truly understand our music")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="/portfolio/festivals"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            {t("View Live Performances")}
          </motion.a>
          <motion.a
            href="/music"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-border font-medium hover:bg-muted transition-colors"
          >
            {t("Listen to Our Music")}
          </motion.a>
        </div>
      </motion.div>
    </>
  );
}

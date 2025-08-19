"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PressItem {
  name: string;
  logo?: string;
  url?: string;
  quote?: string;
  category?: string;
}

interface BadgeListProps {
  title?: string;
  items: PressItem[];
  className?: string;
  showLogos?: boolean;
  animated?: boolean;
}

export function BadgeList({
  title = "As Featured In",
  items,
  className,
  showLogos = true,
  animated = true,
}: BadgeListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const renderBadge = (item: PressItem) => {
    const badgeContent = (
      <div className="flex items-center space-x-2 p-3">
        {showLogos && item.logo && (
          <Image
            src={item.logo}
            alt={`${item.name} logo`}
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
        )}
        <span className="font-medium">{item.name}</span>
        {item.url && <ExternalLink className="h-3 w-3 opacity-50" />}
      </div>
    );

    const badgeElement = (
      <Badge
        variant="secondary"
        className={cn(
          "cursor-pointer transition-all hover:scale-105 hover:shadow-md",
          "bg-muted/50 hover:bg-muted border border-border/50",
          !item.url && "cursor-default"
        )}
      >
        {badgeContent}
      </Badge>
    );

    if (animated) {
      return (
        <motion.div
          key={item.name}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {badgeElement}
            </a>
          ) : (
            badgeElement
          )}
        </motion.div>
      );
    }

    return (
      <div key={item.name}>
        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {badgeElement}
          </a>
        ) : (
          badgeElement
        )}
      </div>
    );
  };

  if (animated) {
    return (
      <section className={cn("py-16 px-4", className)}>
        <div className="container mx-auto text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8"
          >
            {title}
          </motion.h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
          >
            {items.map((item) => renderBadge(item))}
          </motion.div>

          {/* Quotes Section */}
          {items.some((item) => item.quote) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {items
                .filter((item) => item.quote)
                .map((item) => (
                  <div
                    key={`quote-${item.name}`}
                    className="p-6 rounded-lg bg-muted/30 border border-border/50"
                  >
                    <blockquote className="text-sm italic mb-4">
                      &quot;{item.quote}&quot;
                    </blockquote>
                    <cite className="text-xs font-medium text-muted-foreground">
                      — {item.name}
                    </cite>
                  </div>
                ))}
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-16 px-4", className)}>
      <div className="container mx-auto text-center">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
          {title}
        </h3>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {items.map((item) => renderBadge(item))}
        </div>
      </div>
    </section>
  );
}

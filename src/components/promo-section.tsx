"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SimpleVideoPlayer } from "./simple-video-player";
import { EnhancedImage } from "./enhanced-image";

interface PromoSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  layout?: "default" | "reverse" | "centered";
  className?: string;
}

export function PromoSection({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  mediaUrl,
  mediaType = "image",
  layout = "default",
  className,
}: PromoSectionProps) {
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const mediaVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const,
        delay: 0.2,
      },
    },
  };

  const renderMedia = () => {
    if (!mediaUrl) return null;

    if (mediaType === "video") {
      return (
        <motion.div
          variants={mediaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative group h-full overflow-hidden rounded-2xl"
        >
          <SimpleVideoPlayer
            url={mediaUrl}
            muted
            loop
            showControls={true}
            className="w-full h-full"
          />
        </motion.div>
      );
    }

    return (
      <motion.div
        variants={mediaVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="overflow-hidden h-full rounded-2xl"
      >
        <EnhancedImage
          src={mediaUrl}
          alt={title}
          className="w-full h-full"
          aspectRatio="auto"
          showHoverEffect={true}
        />
      </motion.div>
    );
  };

  const renderContent = () => (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-6"
    >
      {subtitle && (
        <div className="text-sm font-medium text-primary uppercase tracking-wider">
          {subtitle}
        </div>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
        {title}
      </h2>

      <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
        {description}
      </p>

      <div className="pt-4">
        <Button asChild size="lg" className="group">
          <Link href={ctaHref}>
            {ctaText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );

  if (layout === "centered") {
    return (
      <section className={cn("py-24 px-4", className)}>
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 text-center"
          >
            {subtitle && (
              <div className="text-sm font-medium text-primary uppercase tracking-wider">
                {subtitle}
              </div>
            )}

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {title}
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>

            <div className="pt-4">
              <Button asChild size="lg" className="group">
                <Link href={ctaHref}>
                  {ctaText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
          {mediaUrl && (
            <motion.div
              variants={mediaVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-12 aspect-video max-w-3xl mx-auto"
            >
              {renderMedia()}
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-24 px-4", className)}>
      <div className="container mx-auto">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center",
            layout === "reverse" && "lg:grid-cols-2"
          )}
        >
          <div className={cn(layout === "reverse" && "lg:order-2")}>
            {renderContent()}
          </div>

          {mediaUrl && (
            <div
              className={cn(
                "aspect-video lg:aspect-square",
                layout === "reverse" && "lg:order-1"
              )}
            >
              {renderMedia()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

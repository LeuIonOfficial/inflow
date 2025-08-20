"use client";

import { motion, Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { Member } from "@/lib/schemas/member";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnhancedImage } from "@/components/enhanced-image";

interface MemberCardProps {
  member: Member;
  index?: number;
}

export function MemberCard({ member, index = 0 }: MemberCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  } as Variants;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full group cursor-pointer">
        <div className="relative aspect-[4/5] overflow-hidden">
          <EnhancedImage
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            aspectRatio="auto"
            showHoverEffect={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Social links overlay */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              {member.socials.map((social) => (
                <Button
                  key={social.platform}
                  variant="secondary"
                  size="sm"
                  asChild
                  className="h-8 w-8 p-0"
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span className="sr-only">{social.platform}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <CardContent className="pt-0 flex flex-col h-full">
          {/* Title and role */}
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
              {member.name}
            </h3>
            <p className="text-muted-foreground">{member.role}</p>
          </div>

          {/* Content area */}
          <div className="space-y-3 flex-1">
            {/* Instruments */}
            {member.instruments && member.instruments.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-center">
                {member.instruments.map((instrument) => (
                  <Badge
                    key={instrument}
                    variant="secondary"
                    className="text-xs"
                  >
                    {instrument}
                  </Badge>
                ))}
              </div>
            )}

            {/* Join year */}
            {member.joinedYear && (
              <p className="text-sm text-muted-foreground text-center">
                Joined {member.joinedYear}
              </p>
            )}

            {/* Bio preview */}
            <p className="text-sm text-muted-foreground line-clamp-3 text-center">
              {member.bioMD.split("\n")[0].substring(0, 120)}...
            </p>
          </div>

          {/* Button at bottom */}
          <div className="mt-auto pt-4">
            <Button
              asChild
              variant="default"
              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            >
              <Link href={`/band/${member.slug}`}>Learn More</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { members } from "@/lib/data/members";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TextAnimate } from "@/components/ui/text-animate";

interface MemberPageProps {
  params: Promise<{ slug: string }>;
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { slug } = await params;
  const member = members.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  // Convert markdown to paragraphs (simple implementation)
  const bioContent = member.bioMD.split("\n\n").filter((p) => p.trim());

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild className="group">
            <Link href="/band">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Band
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Member photo and info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/5]">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold">{member.name}</h1>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>

                  {/* Joined year */}
                  {member.joinedYear && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      Joined {member.joinedYear}
                    </div>
                  )}

                  {/* Instruments */}
                  {member.instruments && member.instruments.length > 0 && (
                    <div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Music className="mr-2 h-4 w-4" />
                        Instruments
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {member.instruments.map((instrument) => (
                          <Badge key={instrument} variant="secondary">
                            {instrument}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social links */}
                  {member.socials.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Connect</h3>
                      <div className="space-y-2">
                        {member.socials.map((social) => (
                          <Button
                            key={social.platform}
                            variant="outline"
                            size="sm"
                            asChild
                            className="w-full justify-start"
                          >
                            <a
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-3 w-3" />
                              {social.platform}
                              {social.handle && (
                                <span className="ml-auto text-muted-foreground">
                                  {social.handle}
                                </span>
                              )}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bio content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="space-y-8">
              <div>
                <TextAnimate
                  animation="blurInUp"
                  by="word"
                  className="text-3xl md:text-4xl font-bold mb-4"
                  as="h2"
                >
                  About {member.name.split(" ")[0]}
                </TextAnimate>
              </div>

              <div className="prose prose-lg max-w-none dark:prose-invert">
                {bioContent.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="text-muted-foreground leading-relaxed mb-6"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Call to action */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="pt-8 border-t border-border"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <Link href="/music">Listen to Our Music</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/portfolio/festivals">
                      Watch Live Performances
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Other band members */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            Other Band Members
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {members
              .filter((m) => m.slug !== member.slug)
              .map((otherMember) => (
                <motion.div
                  key={otherMember.slug}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/band/${otherMember.slug}`}>
                    <Card className="overflow-hidden group cursor-pointer">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={otherMember.photo}
                          alt={otherMember.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                          {otherMember.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {otherMember.role}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

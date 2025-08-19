"use client";

import * as React from "react";
import Link from "next/link";
import {
  Music,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

const quickLinks = [
  { name: "Band", href: "/band" },
  { name: "Festivals", href: "/portfolio/festivals" },
  { name: "Music", href: "/music" },
  { name: "Contact", href: "/contact" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [isSubscribing, setIsSubscribing] = React.useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form
    setEmail("");
    setIsSubscribing(false);

    // Show success message (you can implement toast notifications here)
    console.log("Newsletter subscription:", email);
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Music className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-gradient">INFLOW</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Experience the raw energy and powerful sound of INFLOW,
              Moldova&apos;s premier rock band. Join us on our journey through
              festivals, albums, and unforgettable live performances.
            </p>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Stay Updated</h4>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex space-x-2"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={isSubscribing}
                  className="shrink-0"
                >
                  {isSubscribing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                    />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <div className="flex space-x-2 mb-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-9 w-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>booking@inflow.md</p>
              <p>+373 22 123 456</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} INFLOW. All rights reserved.
          </div>
          <div className="flex space-x-4">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

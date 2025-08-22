"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CheckCircle,
  AlertCircle,
  Link,
} from "lucide-react";

import { ContactFormSchema, ContactFormData } from "@/lib/schemas/contact";
import { TextAnimate } from "@/components/ui/text-animate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HCaptchaStub } from "@/components/hcaptcha-stub";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "booking@inflow.md",
    href: "mailto:booking@inflow.md",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+373 22 123 456",
    href: "tel:+37322123456",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Chișinău, Moldova",
    href: "#",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/inflow.band",
  },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/inflow_band" },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/inflow.band",
  },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/inflow.band" },
];

const inquiryTypes = [
  { value: "booking", label: "Booking & Events" },
  { value: "press", label: "Press & Media" },
  { value: "collaboration", label: "Collaboration" },
  { value: "general", label: "General Inquiry" },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [hcaptchaToken, setHcaptchaToken] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
  });

  const watchedInquiryType = watch("inquiryType");

  const onSubmit = async (_data: ContactFormData) => {
    if (!hcaptchaToken) {
      setValue("hcaptchaToken", "");
      return;
    }

    console.log(_data);

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success/failure (90% success rate)
      const success = Math.random() > 0.1;

      if (success) {
        setSubmitStatus("success");
        reset();
        setHcaptchaToken("");

        // Auto-clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");

      // Auto-clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHCaptchaVerify = (token: string) => {
    setHcaptchaToken(token);
    setValue("hcaptchaToken", token);
  };

  const handleHCaptchaExpire = () => {
    setHcaptchaToken("");
    setValue("hcaptchaToken", "");
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
            Get in Touch
          </TextAnimate>
          <TextAnimate
            animation="slideUp"
            by="word"
            delay={0.3}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            as="p"
          >
            Ready to book us for your event, collaborate on a project, or just
            want to say hello? We&apos;d love to hear from you. Reach out and
            let&apos;s make something amazing together.
          </TextAnimate>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contact Details */}
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <motion.div
                      key={info.label}
                      whileHover={{ x: 4 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{info.label}</p>
                        {info.href !== "#" ? (
                          <a
                            href={info.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-3">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="h-10 w-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                        aria-label={social.name}
                      >
                        <social.icon className="h-4 w-4" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Response Time */}
                <div className="pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold mb-2">Response Time</h3>
                  <p className="text-sm text-muted-foreground">
                    We typically respond to all inquiries within 24-48 hours.
                    For urgent booking requests, please call us directly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Status Messages */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
                      submitStatus === "success"
                        ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                        : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <span className="text-sm font-medium">
                      {submitStatus === "success"
                        ? "Message sent successfully! We&apos;ll get back to you soon."
                        : "Failed to send message. Please try again or contact us directly."}
                    </span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Your full name"
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="your.email@example.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">Inquiry Type *</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue(
                          "inquiryType",
                          value as ContactFormData["inquiryType"]
                        )
                      }
                      value={watchedInquiryType}
                    >
                      <SelectTrigger
                        className={errors.inquiryType ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.inquiryType && (
                      <p className="text-sm text-red-500">
                        {errors.inquiryType.message}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      placeholder="Brief description of your inquiry"
                      className={errors.subject ? "border-red-500" : ""}
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* hCaptcha */}
                  <div className="space-y-2">
                    <Label>Verification *</Label>
                    <HCaptchaStub
                      onVerify={handleHCaptchaVerify}
                      onExpire={handleHCaptchaExpire}
                      onError={() => {
                        setHcaptchaToken("");
                        setValue("hcaptchaToken", "");
                      }}
                    />
                    {errors.hcaptchaToken && (
                      <p className="text-sm text-red-500">
                        {errors.hcaptchaToken.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !hcaptchaToken}
                    className="w-full group"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20"
        >
          <h3 className="text-2xl font-bold mb-4">Looking to Book Us?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We&apos;re available for festivals, private events, corporate
            functions, and more. Check out our live performances to see what we
            bring to the stage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default">
              <Link href="/portfolio/festivals">See Live Performances</Link>
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

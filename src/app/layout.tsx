import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AudioProvider } from "@/components/audio/audio-context";
import { GlobalAudioPlayer } from "@/components/audio/global-player";
import { generateSEO, generateJSONLD, organizationSchema } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = generateSEO({
  title: "INFLOW - Rock Band from Moldova",
  description:
    "Join INFLOW, Moldova's premier rock band, on their journey through festivals, albums, and unforgettable live performances. Experience the raw energy that defines our music.",
  keywords: [
    "INFLOW",
    "rock band",
    "Moldova",
    "live music",
    "festivals",
    "concerts",
    "albums",
    "music",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateJSONLD(organizationSchema)),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AudioProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <GlobalAudioPlayer />
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { getTracks } from "@/lib/api/client";
import { MusicPageClient } from "@/components/music-page-client";
import { TextAnimate } from "@/components/ui/text-animate";
import { ClientOnly } from "@/components/client-only";
import { getTranslations } from "next-intl/server";

export default async function MusicPage() {
  const t = await getTranslations();

  // Fetch tracks from API
  const tracks = await getTracks();

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <ClientOnly>
            <TextAnimate
              animation="blurInUp"
              by="word"
              className="text-4xl md:text-6xl font-bold mb-6"
              as="h1"
            >
              {t("Our Music")}
            </TextAnimate>
          </ClientOnly>
          <ClientOnly>
            <TextAnimate
              animation="slideUp"
              by="word"
              delay={0.3}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              as="p"
            >
              {t("Discover our discography")}
            </TextAnimate>
          </ClientOnly>
        </div>

        {/* Client-side interactive music component */}
        <ClientOnly>
          <MusicPageClient tracks={tracks} />
        </ClientOnly>
      </div>
    </div>
  );
}

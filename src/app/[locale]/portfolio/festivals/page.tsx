import { getFestivals } from "@/lib/api/client";
import { FestivalsPageClient } from "@/components/festivals-page-client";
import { TextAnimate } from "@/components/ui/text-animate";
import { ClientOnly } from "@/components/client-only";
import { getTranslations } from "next-intl/server";

export default async function FestivalsPage() {
  const t = await getTranslations();

  // Fetch festivals from API
  const festivals = await getFestivals();

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
              {t("Festival Performances")}
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
              {t("Live shows and festival appearances")}
            </TextAnimate>
          </ClientOnly>
        </div>

        {/* Client-side interactive festivals component */}
        <ClientOnly>
          <FestivalsPageClient festivals={festivals} />
        </ClientOnly>
      </div>
    </div>
  );
}

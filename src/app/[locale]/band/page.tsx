import { getMembers } from "@/lib/api/client";
import { BandPageClient } from "@/components/band-page-client";
import { TextAnimate } from "@/components/ui/text-animate";
import { ClientOnly } from "@/components/client-only";
import { getTranslations } from "next-intl/server";

export default async function BandPage() {
  const t = await getTranslations();

  // Fetch members from API
  const members = await getMembers();

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
              {t("Meet the Band")}
            </TextAnimate>
          </ClientOnly>
          <ClientOnly>
            <TextAnimate
              animation="slideUp"
              by="word"
              delay={0.3}
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
              as="p"
            >
              {t(
                "Get to know the talented musicians who bring our music to life"
              )}
            </TextAnimate>
          </ClientOnly>
        </div>

        {/* Client-side interactive band component */}
        <ClientOnly>
          <BandPageClient members={members} />
        </ClientOnly>
      </div>
    </div>
  );
}

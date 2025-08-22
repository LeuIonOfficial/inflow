import { notFound } from "next/navigation";

import { getMemberBySlug } from "@/lib/api/client";
import { MemberDetailClient } from "@/components/member-detail-client";

type MemberPageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function MemberPage({ params }: MemberPageProps) {
  const { slug } = await params;

  try {
    const member = await getMemberBySlug(slug);
    return <MemberDetailClient member={member} />;
  } catch {
    notFound();
  }
}

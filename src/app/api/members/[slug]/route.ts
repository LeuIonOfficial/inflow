import { NextResponse } from "next/server";
import { getMemberBySlug } from "@/lib/sanity/api";
import { transformSanityMember } from "@/lib/transformers/member";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const sanityMember = await getMemberBySlug(slug);

    if (!sanityMember) {
      return NextResponse.json(
        {
          success: false,
          error: "Member not found",
        },
        { status: 404 }
      );
    }

    // Transform Sanity data to standard format
    const member = transformSanityMember(sanityMember);

    return NextResponse.json({
      success: true,
      data: member,
    });
  } catch (error) {
    console.error("Error fetching member:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch member",
      },
      { status: 500 }
    );
  }
}

export const revalidate = 60; // Revalidate every 60 seconds

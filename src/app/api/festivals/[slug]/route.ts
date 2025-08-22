import { NextResponse } from "next/server";
import { getFestivalBySlug } from "@/lib/sanity/api";
import { transformSanityFestival } from "@/lib/transformers/festival";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const sanityFestival = await getFestivalBySlug(slug);

    if (!sanityFestival) {
      return NextResponse.json(
        {
          success: false,
          error: "Festival not found",
        },
        { status: 404 }
      );
    }

    // Transform Sanity data to standard format
    const festival = transformSanityFestival(sanityFestival);

    return NextResponse.json({
      success: true,
      data: festival,
    });
  } catch (error) {
    console.error("Error fetching festival:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch festival",
      },
      { status: 500 }
    );
  }
}

export const revalidate = 60; // Revalidate every 60 seconds

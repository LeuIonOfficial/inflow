/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

"use client";

import { Studio } from "sanity";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "../../../../sanity/schemaTypes";

const config = defineConfig({
  name: "inflow-band-studio",
  title: "INFLOW Band Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dummy",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});

export default function StudioPage() {
  return <Studio config={config} />;
}

export const dynamic = "force-dynamic";

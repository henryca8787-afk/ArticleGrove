import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01";

export const sanityConfigured = Boolean(projectId && /^[a-z0-9-]+$/.test(projectId));

export const sanityClient = sanityConfigured ? createClient({
  projectId, dataset, apiVersion, useCdn: true, perspective: "published"
}) : null;

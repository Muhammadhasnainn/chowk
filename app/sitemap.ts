import type { MetadataRoute } from "next";
import { dishes } from "@/lib/menu";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chowk.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/menu", "/about", "/visit"].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
  }));

  const items = dishes.map((d) => ({
    url: `${BASE}/menu/${d.slug}`,
    lastModified: new Date(),
  }));

  return [...pages, ...items];
}

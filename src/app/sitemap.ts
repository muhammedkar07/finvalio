import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";
import { CALCULATORS, getCalculatorUrl } from "@/lib/calculators/registry";
import { GUIDES, getGuideUrl } from "@/lib/guides";
import { STATIC_ROUTES, type StaticPageId } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const staticIds: StaticPageId[] = [
    "home",
    "guides",
    "about",
    "contact",
    "privacy",
    "terms",
    "disclaimer",
  ];

  for (const id of staticIds) {
    const enUrl = `${SITE_CONFIG.url}${STATIC_ROUTES[id].en}`;
    const trUrl = `${SITE_CONFIG.url}${STATIC_ROUTES[id].tr}`;
    const priority = id === "home" ? 1.0 : id === "guides" ? 0.85 : 0.4;
    const changeFrequency = id === "home" || id === "guides" ? "weekly" : "monthly";

    entries.push(
      {
        url: enUrl,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages: { en: enUrl, tr: trUrl } },
      },
      {
        url: trUrl,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages: { en: enUrl, tr: trUrl } },
      }
    );
  }

  for (const calc of CALCULATORS) {
    const enUrl = `${SITE_CONFIG.url}${getCalculatorUrl(calc, "en")}`;
    const trUrl = `${SITE_CONFIG.url}${getCalculatorUrl(calc, "tr")}`;
    entries.push(
      {
        url: enUrl,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.95,
        alternates: { languages: { en: enUrl, tr: trUrl } },
      },
      {
        url: trUrl,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.95,
        alternates: { languages: { en: enUrl, tr: trUrl } },
      }
    );
  }

  for (const guide of GUIDES) {
    const enUrl = `${SITE_CONFIG.url}${getGuideUrl(guide, "en")}`;
    const trUrl = `${SITE_CONFIG.url}${getGuideUrl(guide, "tr")}`;
    const modified = new Date(guide.updatedAt);
    entries.push(
      {
        url: enUrl,
        lastModified: modified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: { en: enUrl, tr: trUrl } },
      },
      {
        url: trUrl,
        lastModified: modified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: { en: enUrl, tr: trUrl } },
      }
    );
  }

  return entries;
}

import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import type { Locale } from "@/lib/i18n";

export function buildMetadata(options: {
  locale: Locale;
  title: string;
  description: string;
  enPath: string;
  trPath: string;
  type?: "website" | "article";
}): Metadata {
  const canonicalPath = options.locale === "tr" ? options.trPath : options.enPath;
  const canonicalUrl = `${SITE_CONFIG.url}${canonicalPath}`;
  const enUrl = `${SITE_CONFIG.url}${options.enPath}`;
  const trUrl = `${SITE_CONFIG.url}${options.trPath}`;

  return {
    title: options.title,
    description: options.description,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: enUrl,
        tr: trUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title: options.title,
      description: options.description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: options.locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: options.locale === "tr" ? "en_US" : "tr_TR",
      type: options.type || "website",
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
  };
}

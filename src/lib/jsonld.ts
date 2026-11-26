import { SITE_CONFIG } from "@/config/site";
import type { CalculatorDefinition } from "@/lib/calculators/registry";
import { getCalculatorUrl } from "@/lib/calculators/registry";
import type { GuideDefinition } from "@/lib/guides";
import { getGuideUrl } from "@/lib/guides";
import type { Locale } from "@/lib/i18n";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/icon.svg`,
    email: SITE_CONFIG.contactEmail,
  };
}

export function buildWebSiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.url}/${locale}`,
    inLanguage: locale === "tr" ? "tr-TR" : "en-US",
  };
}

export function buildCalculatorJsonLd(calc: CalculatorDefinition, locale: Locale) {
  const content = calc[locale];
  const url = `${SITE_CONFIG.url}${getCalculatorUrl(calc, locale)}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: content.name,
      description: content.seoDescription,
      url,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      inLanguage: locale === "tr" ? "tr-TR" : "en-US",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: locale === "tr" ? "TRY" : "USD",
      },
      publisher: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "tr" ? "Ana Sayfa" : "Home",
          item: `${SITE_CONFIG.url}/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: content.shortName,
          item: url,
        },
      ],
    },
  ];
}

export function buildGuideJsonLd(guide: GuideDefinition, locale: Locale) {
  const content = guide[locale];
  const url = `${SITE_CONFIG.url}${getGuideUrl(guide, locale)}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: content.title,
      description: content.seoDescription,
      datePublished: guide.publishedAt,
      dateModified: guide.updatedAt,
      inLanguage: locale === "tr" ? "tr-TR" : "en-US",
      author: {
        "@type": "Organization",
        name: `${SITE_CONFIG.name} Editorial Team`,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_CONFIG.url}/icon.svg`,
        },
      },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "tr" ? "Ana Sayfa" : "Home",
          item: `${SITE_CONFIG.url}/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: locale === "tr" ? "Rehberler" : "Guides",
          item: `${SITE_CONFIG.url}/${locale === "tr" ? "tr/rehberler" : "en/guides"}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: content.title,
          item: url,
        },
      ],
    },
  ];
}

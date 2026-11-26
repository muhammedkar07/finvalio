export type Locale = "en" | "tr";

export const LOCALES: readonly Locale[] = ["en", "tr"] as const;

export type CurrencyCode = "USD" | "TRY" | "EUR" | "GBP";

export const CURRENCY_META: Record<
  CurrencyCode,
  { symbol: string; locale: string; labelEn: string; labelTr: string }
> = {
  USD: { symbol: "$", locale: "en-US", labelEn: "USD ($)", labelTr: "USD ($)" },
  TRY: { symbol: "₺", locale: "tr-TR", labelEn: "TRY (₺)", labelTr: "TL (₺)" },
  EUR: { symbol: "€", locale: "de-DE", labelEn: "EUR (€)", labelTr: "EUR (€)" },
  GBP: { symbol: "£", locale: "en-GB", labelEn: "GBP (£)", labelTr: "GBP (£)" },
};

export function formatCurrency(
  amount: number,
  currency: CurrencyCode = "USD",
  decimals = 2
): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  const meta = CURRENCY_META[currency];
  return new Intl.NumberFormat(meta.locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(safe);
}

export function formatNumber(amount: number, locale: Locale, decimals = 2): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(safe);
}

export function formatPercent(rate: number, locale: Locale, decimals = 2): string {
  const safe = Number.isFinite(rate) ? rate : 0;
  return `${formatNumber(safe, locale, decimals)}%`;
}

export type StaticPageId = "home" | "guides" | "about" | "contact" | "privacy" | "terms" | "disclaimer";

export const STATIC_ROUTES: Record<StaticPageId, Record<Locale, string>> = {
  home: { en: "/en", tr: "/tr" },
  guides: { en: "/en/guides", tr: "/tr/rehberler" },
  about: { en: "/en/about", tr: "/tr/hakkimizda" },
  contact: { en: "/en/contact", tr: "/tr/iletisim" },
  privacy: { en: "/en/privacy", tr: "/tr/gizlilik" },
  terms: { en: "/en/terms", tr: "/tr/kullanim-sartlari" },
  disclaimer: { en: "/en/disclaimer", tr: "/tr/yasal-uyari" },
};

export function getCalcBasePath(locale: Locale): string {
  return locale === "tr" ? "/tr/hesaplayicilar" : "/en/calculators";
}

export function getGuideBasePath(locale: Locale): string {
  return locale === "tr" ? "/tr/rehberler" : "/en/guides";
}

export const UI_TEXT = {
  en: {
    tagline: "Precision Financial Calculators & 2026 Tax Tools",
    nav: {
      calculators: "Calculators",
      guides: "Guides",
      about: "About",
      contact: "Contact",
    },
    hero: {
      badge: "Updated for 2026 Tax & Rate Rules",
      title: "Make Smarter Money Decisions With",
      highlight: "Transparent Financial Math",
      subtitle:
        "Fast, ad-light, institution-grade calculators for salary, taxes, mortgages, compound growth, deposits, and retirement — built for global and Turkish financial systems.",
      ctaPrimary: "Explore Calculators",
      ctaSecondary: "Read 2026 Guides",
    },
    trust: {
      item1Title: "2026 Official Brackets",
      item1Desc: "IRS 2026 & Turkey GVK 2026 progressive tax tables built-in.",
      item2Title: "100% Private In-Browser",
      item2Desc: "Your salary and financial inputs never leave your device.",
      item3Title: "Export & Share Ready",
      item3Desc: "Download CSV schedules and print clean financial breakdowns.",
    },
    searchPlaceholder: "Search calculators (salary, mortgage, compound, FIRE, VAT...)",
    allCategories: "All Tools",
    openCalculator: "Open Calculator",
    relatedCalculators: "Related Calculators",
    workedExample: "Worked Example",
    formulaSection: "Formula & Methodology",
    faqTitle: "Frequently Asked Questions",
    copyLink: "Copy Share Link",
    copied: "Link Copied!",
    exportCsv: "Export CSV",
    printReport: "Print / PDF",
    reset: "Reset",
    disclaimerShort:
      "Educational & estimation purposes only. Not licensed financial, tax, or legal advice.",
    footer: {
      calculatorsCol: "Calculators",
      guidesCol: "Financial Guides",
      companyCol: "Trust & Legal",
      about: "About & Methodology",
      contact: "Contact Us",
      privacy: "Privacy & Cookie Policy",
      terms: "Terms of Service",
      disclaimer: "Financial Disclaimer",
      rights: "All rights reserved.",
    },
    cookie: {
      title: "Privacy & Cookie Preferences",
      desc: "We use essential cookies for language/theme preferences and optional advertising cookies (Google AdSense) to keep our calculators free.",
      acceptAll: "Accept All",
      essentialOnly: "Essential Only",
      learnMore: "Privacy Policy",
    },
    adLabel: "Advertisement",
  },
  tr: {
    tagline: "2026 Güncel Finans, Maaş, Vergi ve Kredi Hesaplama Merkezi",
    nav: {
      calculators: "Hesaplayıcılar",
      guides: "Rehberler",
      about: "Hakkımızda",
      contact: "İletişim",
    },
    hero: {
      badge: "2026 Vergi Dilimleri ve Yasal Oranlarla Güncel",
      title: "Paranızı Şeffaf ve Kesin",
      highlight: "Finansal Hesaplamalarla Yönetin",
      subtitle:
        "2026 brüt-net maaş, kıdem tazminatı, kredi ödeme planı, mevduat stopaj, bileşik getiri, kira artışı ve emeklilik için hızlı, ücretsiz ve tamamen tarayıcı içi profesyonel araçlar.",
      ctaPrimary: "Hesaplayıcıları İncele",
      ctaSecondary: "2026 Rehberlerini Oku",
    },
    trust: {
      item1Title: "2026 Resmi Dilimler",
      item1Desc: "GİB 2026 gelir vergisi dilimleri, asgari ücret ve kıdem tavanı dahildir.",
      item2Title: "%100 Tarayıcı İçi Gizlilik",
      item2Desc: "Maaş, kredi ve birikim verileriniz hiçbir sunucuya gönderilmez.",
      item3Title: "CSV Dışa Aktarma & Paylaşım",
      item3Desc: "Ödeme planlarını CSV olarak indirin veya hesaplamayı tek tıkla paylaşın.",
    },
    searchPlaceholder: "Hesaplayıcı ara (maaş, kıdem, kredi, mevduat, kira, KDV...)",
    allCategories: "Tüm Araçlar",
    openCalculator: "Hesaplayıcıyı Aç",
    relatedCalculators: "İlgili Hesaplayıcılar",
    workedExample: "Örnek Hesaplama Senaryosu",
    formulaSection: "Formül ve Metodoloji",
    faqTitle: "Sıkça Sorulan Sorular",
    copyLink: "Bağlantıyı Kopyala",
    copied: "Kopyalandı!",
    exportCsv: "CSV İndir",
    printReport: "Yazdır / PDF",
    reset: "Sıfırla",
    disclaimerShort:
      "Yalnızca bilgilendirme ve tahmin amaçlıdır. Yatırım, vergi veya hukuki danışmanlık yerine geçmez.",
    footer: {
      calculatorsCol: "Hesaplayıcılar",
      guidesCol: "Finans Rehberleri",
      companyCol: "Güven ve Yasal",
      about: "Hakkımızda & Metodoloji",
      contact: "İletişim",
      privacy: "Gizlilik & Çerez Politikası",
      terms: "Kullanım Şartları",
      disclaimer: "Yasal Uyarı",
      rights: "Tüm hakları saklıdır.",
    },
    cookie: {
      title: "Gizlilik ve Çerez Tercihleri",
      desc: "Dil ve tema ayarları için zorunlu çerezler, araçlarımızı ücretsiz sunabilmek için isteğe bağlı reklam çerezleri (Google AdSense) kullanıyoruz.",
      acceptAll: "Tümünü Kabul Et",
      essentialOnly: "Sadece Zorunlu",
      learnMore: "Gizlilik Politikası",
    },
    adLabel: "Reklam",
  },
} as const;

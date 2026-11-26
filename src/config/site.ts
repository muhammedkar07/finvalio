export const SITE_CONFIG = {
  name: "FinValio",
  domain: "finvalio.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://finvalio.com").replace(/\/$/, ""),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  contactEmail: "contact@finvalio.com",
  foundedYear: 2026,
  dataYear: 2026,
  adsense: {
    clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "",
    slots: {
      top: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP || "",
      inContent: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT || "",
      sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || "",
      bottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM || "",
    },
  },
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
} as const;

export const TR_2026_CONSTANTS = {
  year: 2026,
  minWageGross: 33030, // 2026 Aylık Brüt Asgari Ücret (TL)
  minWageNet: 28075.5, // 2026 Aylık Net Asgari Ücret (TL)
  sgkEmployeeRate: 0.14,
  unemploymentEmployeeRate: 0.01,
  sgkEmployerRate: 0.2075, // %20.75 (5 puan hazine teşviksiz ~%20.75, 5 puan indirimle %15.75)
  sgkEmployerIncentiveRate: 0.1575,
  unemploymentEmployerRate: 0.02,
  stampTaxRate: 0.00759, // Binde 7.59
  sgkUpperCapMonthly: 33030 * 7.5, // Brüt asgari ücretin 7.5 katı (247.725 TL)
  // 2026 Ücret Gelirleri Gelir Vergisi Dilimleri (GVK Madde 103)
  incomeTaxBrackets: [
    { limit: 190000, rate: 0.15 },
    { limit: 400000, rate: 0.2 },
    { limit: 1500000, rate: 0.27 },
    { limit: 5300000, rate: 0.35 },
    { limit: Infinity, rate: 0.4 },
  ],
  severanceCapH1: 64948.77, // 1 Ocak - 30 Haziran 2026
  severanceCapH2: 73729.87, // 1 Temmuz - 31 Aralık 2026
  defaultSeveranceCap: 73729.87,
} as const;

export const US_2026_CONSTANTS = {
  year: 2026,
  standardDeduction: {
    single: 16100,
    married: 32200,
    hoh: 24150,
  },
  brackets: {
    single: [
      { limit: 12400, rate: 0.1 },
      { limit: 50400, rate: 0.12 },
      { limit: 105700, rate: 0.22 },
      { limit: 201775, rate: 0.24 },
      { limit: 256225, rate: 0.32 },
      { limit: 640600, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ],
    married: [
      { limit: 24800, rate: 0.1 },
      { limit: 100800, rate: 0.12 },
      { limit: 211400, rate: 0.22 },
      { limit: 403550, rate: 0.24 },
      { limit: 512450, rate: 0.32 },
      { limit: 768150, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ],
    hoh: [
      { limit: 17750, rate: 0.1 },
      { limit: 67500, rate: 0.12 },
      { limit: 105700, rate: 0.22 },
      { limit: 201750, rate: 0.24 },
      { limit: 256200, rate: 0.32 },
      { limit: 640600, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ],
  },
  socialSecurityRate: 0.062,
  socialSecurityWageBase: 184500,
  medicareRate: 0.0145,
  additionalMedicareThreshold: {
    single: 200000,
    married: 250000,
    hoh: 200000,
  },
  additionalMedicareRate: 0.009,
} as const;

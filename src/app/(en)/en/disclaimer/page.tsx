import { LegalPageView } from "@/components/pages/LegalPageView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "en",
  title: "Financial & Tax Disclaimer | FinValio",
  description:
    "Important financial, tax, and legal disclaimer for FinValio educational calculators and articles.",
  enPath: "/en/disclaimer",
  trPath: "/tr/yasal-uyari",
});

export default function EnDisclaimerPage() {
  return <LegalPageView page="disclaimer" locale="en" />;
}

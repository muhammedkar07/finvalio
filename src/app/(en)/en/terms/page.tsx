import { LegalPageView } from "@/components/pages/LegalPageView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "en",
  title: "Terms of Service | FinValio",
  description: "Terms of Service governing access and use of FinValio financial calculators and guides.",
  enPath: "/en/terms",
  trPath: "/tr/kullanim-sartlari",
});

export default function EnTermsPage() {
  return <LegalPageView page="terms" locale="en" />;
}

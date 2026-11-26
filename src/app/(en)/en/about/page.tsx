import { LegalPageView } from "@/components/pages/LegalPageView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "en",
  title: "About & Methodology | FinValio",
  description:
    "Learn how FinValio verifies 2026 tax brackets, banking formulas, and keeps your personal financial inputs 100% private in-browser.",
  enPath: "/en/about",
  trPath: "/tr/hakkimizda",
});

export default function EnAboutPage() {
  return <LegalPageView page="about" locale="en" />;
}

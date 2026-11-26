import { LegalPageView } from "@/components/pages/LegalPageView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "en",
  title: "Privacy & Cookie Policy (GDPR, KVKK & Google AdSense) | FinValio",
  description:
    "How FinValio protects calculator privacy, manages Google AdSense cookies, and honors GDPR and KVKK user rights.",
  enPath: "/en/privacy",
  trPath: "/tr/gizlilik",
});

export default function EnPrivacyPage() {
  return <LegalPageView page="privacy" locale="en" />;
}

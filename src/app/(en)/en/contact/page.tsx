import { LegalPageView } from "@/components/pages/LegalPageView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "en",
  title: "Contact FinValio",
  description: "Contact the FinValio team with calculator feedback, 2026 rate updates, or inquiries.",
  enPath: "/en/contact",
  trPath: "/tr/iletisim",
});

export default function EnContactPage() {
  return <LegalPageView page="contact" locale="en" />;
}

import { LegalPageView } from "@/components/pages/LegalPageView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "tr",
  title: "Kullanım Şartları | FinValio",
  description: "FinValio finans hesaplama araçları ve rehberlerinin kullanım koşulları.",
  enPath: "/en/terms",
  trPath: "/tr/kullanim-sartlari",
});

export default function TrTermsPage() {
  return <LegalPageView page="terms" locale="tr" />;
}

import { LegalPageView } from "@/components/pages/LegalPageView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "tr",
  title: "Gizlilik ve Çerez Politikası (KVKK, GDPR & Google AdSense) | FinValio",
  description:
    "FinValio'nun hesaplama verisi gizliliği, Google AdSense çerez kullanımı ve KVKK/GDPR hakları politikası.",
  enPath: "/en/privacy",
  trPath: "/tr/gizlilik",
});

export default function TrPrivacyPage() {
  return <LegalPageView page="privacy" locale="tr" />;
}

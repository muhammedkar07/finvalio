import { LegalPageView } from "@/components/pages/LegalPageView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "tr",
  title: "İletişim | FinValio",
  description: "FinValio ekibine geri bildirim, hata bildirimi veya yeni hesaplayıcı talebi gönderin.",
  enPath: "/en/contact",
  trPath: "/tr/iletisim",
});

export default function TrContactPage() {
  return <LegalPageView page="contact" locale="tr" />;
}

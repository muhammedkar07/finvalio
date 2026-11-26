import { LegalPageView } from "@/components/pages/LegalPageView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "tr",
  title: "Hakkımızda ve Hesaplama Metodolojisi | FinValio",
  description:
    "FinValio'nun 2026 vergi ve finans verilerini nasıl doğruladığını ve tarayıcı içi gizlilik mimarisini inceleyin.",
  enPath: "/en/about",
  trPath: "/tr/hakkimizda",
});

export default function TrAboutPage() {
  return <LegalPageView page="about" locale="tr" />;
}

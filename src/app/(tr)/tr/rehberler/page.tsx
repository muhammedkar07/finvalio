import { GuidesIndexView } from "@/components/pages/GuidesIndexView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "tr",
  title: "2026 Finans, Vergi, Kredi ve Yatırım Rehberleri | FinValio",
  description:
    "2026 gelir vergisi dilimleri, kıdem tazminatı tavanı, kredi maliyeti düşürme, enflasyon üstü reel getiri ve finansal özgürlük (FIRE) rehberleri.",
  enPath: "/en/guides",
  trPath: "/tr/rehberler",
});

export default function TrGuidesIndexPage() {
  return <GuidesIndexView locale="tr" />;
}

import { LegalPageView } from "@/components/pages/LegalPageView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "tr",
  title: "Finansal ve Yasal Sorumluluk Reddi | FinValio",
  description:
    "FinValio hesaplayıcı ve rehberlerinin bilgilendirme kapsamı ve finansal/hukuki sorumluluk reddi metni.",
  enPath: "/en/disclaimer",
  trPath: "/tr/yasal-uyari",
});

export default function TrDisclaimerPage() {
  return <LegalPageView page="disclaimer" locale="tr" />;
}

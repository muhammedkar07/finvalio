import { HomePageView } from "@/components/pages/HomePageView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "tr",
  title: "FinValio | 2026 Maaş, Kıdem Tazminatı, Kredi, Mevduat ve Finans Hesaplama",
  description:
    "2026 brütten nete maaş, 73.729,87 TL tavanlı kıdem tazminatı, KKDF/BSMV'li kredi, mevduat stopaj, TÜFE kira artışı ve bileşik getiri hesaplama merkezi.",
  enPath: "/en",
  trPath: "/tr",
});

export default function TrHomePage() {
  return <HomePageView locale="tr" />;
}

import { GuidesIndexView } from "@/components/pages/GuidesIndexView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "en",
  title: "2026 Financial, Tax & Investing Guides | FinValio",
  description:
    "Original, formula-backed 2026 guides on IRS & Turkey tax brackets, mortgage payoff math, real compounding, severance rules, and FIRE retirement.",
  enPath: "/en/guides",
  trPath: "/tr/rehberler",
});

export default function EnGuidesIndexPage() {
  return <GuidesIndexView locale="en" />;
}

import { HomePageView } from "@/components/pages/HomePageView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "en",
  title: "FinValio | 2026 Salary, Tax, Mortgage, Compound & FIRE Calculators",
  description:
    "Free, ultra-fast 2026 financial calculators for US IRS & Turkey take-home pay, mortgages, compound interest, high-yield savings, severance, and FIRE retirement.",
  enPath: "/en",
  trPath: "/tr",
});

export default function EnHomePage() {
  return <HomePageView locale="en" />;
}

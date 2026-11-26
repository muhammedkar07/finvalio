import { notFound } from "next/navigation";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import {
  CALCULATORS,
  getCalculatorBySlug,
  getCalculatorUrl,
} from "@/lib/calculators/registry";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return CALCULATORS.map((c) => ({ slug: c.tr.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const calc = getCalculatorBySlug("tr", slug);
  if (!calc) return {};
  return buildMetadata({
    locale: "tr",
    title: calc.tr.seoTitle,
    description: calc.tr.seoDescription,
    enPath: getCalculatorUrl(calc, "en"),
    trPath: getCalculatorUrl(calc, "tr"),
  });
}

export default async function TrCalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const calc = getCalculatorBySlug("tr", slug);
  if (!calc) notFound();
  return <CalculatorShell calc={calc} locale="tr" />;
}

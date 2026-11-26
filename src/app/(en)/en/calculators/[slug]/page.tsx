import { notFound } from "next/navigation";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import {
  CALCULATORS,
  getCalculatorBySlug,
  getCalculatorUrl,
} from "@/lib/calculators/registry";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return CALCULATORS.map((c) => ({ slug: c.en.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const calc = getCalculatorBySlug("en", slug);
  if (!calc) return {};
  return buildMetadata({
    locale: "en",
    title: calc.en.seoTitle,
    description: calc.en.seoDescription,
    enPath: getCalculatorUrl(calc, "en"),
    trPath: getCalculatorUrl(calc, "tr"),
  });
}

export default async function EnCalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const calc = getCalculatorBySlug("en", slug);
  if (!calc) notFound();
  return <CalculatorShell calc={calc} locale="en" />;
}

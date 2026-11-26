import { notFound } from "next/navigation";
import { GuideDetailView } from "@/components/pages/GuideDetailView";
import { GUIDES, getGuideBySlug, getGuideUrl } from "@/lib/guides";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.tr.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug("tr", slug);
  if (!guide) return {};
  return buildMetadata({
    locale: "tr",
    title: guide.tr.seoTitle,
    description: guide.tr.seoDescription,
    enPath: getGuideUrl(guide, "en"),
    trPath: getGuideUrl(guide, "tr"),
    type: "article",
  });
}

export default async function TrGuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug("tr", slug);
  if (!guide) notFound();
  return <GuideDetailView guide={guide} locale="tr" />;
}

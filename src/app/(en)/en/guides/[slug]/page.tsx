import { notFound } from "next/navigation";
import { GuideDetailView } from "@/components/pages/GuideDetailView";
import { GUIDES, getGuideBySlug, getGuideUrl } from "@/lib/guides";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.en.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug("en", slug);
  if (!guide) return {};
  return buildMetadata({
    locale: "en",
    title: guide.en.seoTitle,
    description: guide.en.seoDescription,
    enPath: getGuideUrl(guide, "en"),
    trPath: getGuideUrl(guide, "tr"),
    type: "article",
  });
}

export default async function EnGuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug("en", slug);
  if (!guide) notFound();
  return <GuideDetailView guide={guide} locale="en" />;
}

import Link from "next/link";
import { ArrowRight, Calculator, Calendar, CheckCircle2, ChevronRight, Clock } from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";
import { getCalculatorById, getCalculatorUrl } from "@/lib/calculators/registry";
import { GUIDES, getGuideUrl, type GuideDefinition } from "@/lib/guides";
import { STATIC_ROUTES, type Locale } from "@/lib/i18n";
import { buildGuideJsonLd } from "@/lib/jsonld";

export function GuideDetailView({
  guide,
  locale,
}: {
  guide: GuideDefinition;
  locale: Locale;
}) {
  const isTr = locale === "tr";
  const g = guide[locale];
  const calc = getCalculatorById(guide.relatedCalculatorId);
  const otherGuides = GUIDES.filter((item) => item.id !== guide.id).slice(0, 3);
  const schemas = buildGuideJsonLd(guide, locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-slate-500">
        <Link href={STATIC_ROUTES.home[locale]} className="hover:text-emerald-600">
          {isTr ? "Ana Sayfa" : "Home"}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={STATIC_ROUTES.guides[locale]} className="hover:text-emerald-600">
          {isTr ? "Rehberler" : "Guides"}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="truncate font-semibold text-slate-800 dark:text-slate-200">{g.categoryLabel}</span>
      </nav>

      <article>
        <header className="mb-8">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            {g.categoryLabel}
          </span>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight text-slate-950 sm:text-4xl dark:text-white">
            {g.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {g.excerpt}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {isTr ? "Güncelleme:" : "Updated:"} {guide.updatedAt}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {g.readTimeMin} {isTr ? "dakika okuma" : "min read"}
            </span>
          </div>
        </header>

        {/* Interactive Calculator CTA Card */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-emerald-200 bg-gradient-to-r from-[#0B1F3A] to-slate-900 p-5 text-white sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-300">
                {isTr ? "Kendi Rakamlarınızla Hesaplayın" : "Try With Your Own Numbers"}
              </p>
              <p className="text-sm font-bold">{calc[locale].name}</p>
            </div>
          </div>
          <Link
            href={getCalculatorUrl(calc, locale)}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            {isTr ? "Aracı Aç" : "Open Calculator"}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <AdSlot placement="top" locale={locale} />

        <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          {g.sections.map((section, idx) => (
            <section key={idx} className="space-y-3.5">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">{section.heading}</h2>
              {section.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="text-sm leading-7 text-slate-700 sm:text-[15px] dark:text-slate-300"
                >
                  {p}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-3 space-y-2.5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  {section.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <AdSlot placement="inContent" locale={locale} />

        {/* More guides */}
        <section className="mt-10">
          <h3 className="mb-4 text-lg font-bold text-slate-950 dark:text-white">
            {isTr ? "Diğer Finans Rehberleri" : "More Financial Guides"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {otherGuides.map((og) => (
              <Link
                key={og.id}
                href={getGuideUrl(og, locale)}
                className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                  {og[locale].categoryLabel}
                </span>
                <p className="mt-1.5 text-sm font-bold text-slate-900 dark:text-white">
                  {og[locale].title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";
import { CalculatorRenderer } from "@/components/calculators/CalculatorRenderer";
import {
  CATEGORY_LABELS,
  getCalculatorById,
  getCalculatorUrl,
  type CalculatorDefinition,
} from "@/lib/calculators/registry";
import { GUIDES, getGuideUrl } from "@/lib/guides";
import { STATIC_ROUTES, UI_TEXT, type Locale } from "@/lib/i18n";
import { buildCalculatorJsonLd } from "@/lib/jsonld";

export function CalculatorShell({
  calc,
  locale,
}: {
  calc: CalculatorDefinition;
  locale: Locale;
}) {
  const content = calc[locale];
  const t = UI_TEXT[locale];
  const relatedCalcs = calc.relatedIds.map((id) => getCalculatorById(id));
  const relatedGuide = GUIDES.find((g) => g.relatedCalculatorId === calc.id);
  const schemas = buildCalculatorJsonLd(calc, locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs text-slate-500">
        <Link href={STATIC_ROUTES.home[locale]} className="hover:text-emerald-600">
          {locale === "tr" ? "Ana Sayfa" : "Home"}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span>{CATEGORY_LABELS[calc.category][locale]}</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-slate-800 dark:text-slate-200">{content.shortName}</span>
      </nav>

      {/* Hero Header */}
      <header className="mb-6">
        <div className="mb-2.5 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300">
            {content.badge}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {CATEGORY_LABELS[calc.category][locale]}
          </span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
          {content.name}
        </h1>
        <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
          {content.intro}
        </p>
      </header>

      {/* Top Ad Slot (safely separated from interactive controls) */}
      <AdSlot placement="top" locale={locale} />

      {/* Main Interactive Calculator */}
      <section className="rounded-3xl border border-slate-200/90 bg-slate-50/70 p-4 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900/40">
        <CalculatorRenderer id={calc.id} locale={locale} />
      </section>

      {/* Policy Disclaimer Note */}
      <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
        {t.disclaimerShort}{" "}
        <Link href={STATIC_ROUTES.disclaimer[locale]} className="underline hover:text-emerald-600">
          {t.footer.disclaimer}
        </Link>
      </p>

      {/* In-Content Ad Slot */}
      <AdSlot placement="inContent" locale={locale} />

      {/* Deep Editorial Value: Formula + Worked Example + FAQ (Critical for SEO & AdSense Approval) */}
      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <article className="space-y-8 lg:col-span-8">
          {/* Formula & Methodology */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <Calculator className="h-5 w-5" />
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                {content.formulaTitle}
              </h2>
            </div>
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 px-4 py-3.5 font-mono text-xs text-emerald-300 sm:text-sm">
              {content.formulaExpression}
            </div>
            <ul className="mt-5 space-y-3">
              {content.methodologyPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Worked Example */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-bold tracking-wider text-emerald-700 uppercase dark:text-emerald-400">
              {t.workedExample}
            </span>
            <h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">
              {content.workedExampleTitle}
            </h2>
            <ol className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {content.workedExampleSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm font-medium text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
              {content.workedExampleSummary}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">{t.faqTitle}</h2>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {content.faqs.map((faq, idx) => (
                <details key={idx} className="group py-4 first:pt-1 last:pb-1" open={idx === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-900 dark:text-white">
                    <span>{faq.question}</span>
                    <span className="text-lg font-light text-slate-400 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </article>

        {/* Right Sidebar: Related Calculators + Guide + Sidebar Ad */}
        <aside className="space-y-6 lg:col-span-4">
          {relatedGuide ? (
            <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-[#0B1F3A] to-slate-900 p-5 text-white shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <BookOpen className="h-4 w-4" />
                <span>{locale === "tr" ? "Derinlemesine Rehber" : "In-Depth Guide"}</span>
              </div>
              <h3 className="mt-2 text-base font-bold leading-snug">
                {relatedGuide[locale].title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                {relatedGuide[locale].excerpt}
              </p>
              <Link
                href={getGuideUrl(relatedGuide, locale)}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3.5 py-2 text-xs font-bold text-slate-950 transition hover:bg-emerald-400"
              >
                {locale === "tr" ? "Rehberi Oku" : "Read Guide"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : null}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white">
              {t.relatedCalculators}
            </h3>
            <div className="mt-3 space-y-2.5">
              {relatedCalcs.map((rel) => (
                <Link
                  key={rel.id}
                  href={getCalculatorUrl(rel, locale)}
                  className="group block rounded-xl border border-slate-200/80 p-3.5 transition hover:border-emerald-400 hover:bg-emerald-50/40 dark:border-slate-800 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/20"
                >
                  <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                    {rel[locale].shortName}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                    {rel[locale].tagline}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <AdSlot placement="sidebar" locale={locale} className="!my-0" />
        </aside>
      </div>

      <AdSlot placement="bottom" locale={locale} />
    </div>
  );
}

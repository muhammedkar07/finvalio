import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, FileSpreadsheet, Lock, Sparkles } from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";
import { HomeToolsGrid } from "@/components/home/HomeToolsGrid";
import { CALCULATORS, getCalculatorUrl } from "@/lib/calculators/registry";
import { GUIDES, getGuideUrl } from "@/lib/guides";
import { STATIC_ROUTES, UI_TEXT, type Locale } from "@/lib/i18n";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/jsonld";

export function HomePageView({ locale }: { locale: Locale }) {
  const t = UI_TEXT[locale];
  const isTr = locale === "tr";

  const quickLinks = [
    CALCULATORS[0], // Salary
    CALCULATORS[1], // Loan
    CALCULATORS[4], // Severance
    CALCULATORS[2], // Compound
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteJsonLd(locale)) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#0B1F3A] via-[#0F294D] to-[#0B1F3A] text-white dark:border-slate-800">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(16,185,129,0.20),transparent_48%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              {t.hero.title}{" "}
              <span className="text-emerald-400">{t.hero.highlight}</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {t.hero.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#calculators"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-400"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href={STATIC_ROUTES.guides[locale]}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <BookOpen className="h-4 w-4" />
                {t.hero.ctaSecondary}
              </Link>
            </div>

            {/* Popular shortcuts */}
            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-slate-400">
                {isTr ? "Popüler:" : "Popular:"}
              </span>
              {quickLinks.map((calc) => (
                <Link
                  key={calc.id}
                  href={getCalculatorUrl(calc, locale)}
                  className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 font-medium text-slate-200 transition hover:border-emerald-400/50 hover:text-emerald-300"
                >
                  {calc[locale].shortName}
                </Link>
              ))}
            </div>
          </div>

          {/* Trust Pillars */}
          <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <div>
                <p className="text-sm font-bold text-white">{t.trust.item1Title}</p>
                <p className="mt-0.5 text-xs text-slate-300">{t.trust.item1Desc}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <div>
                <p className="text-sm font-bold text-white">{t.trust.item2Title}</p>
                <p className="mt-0.5 text-xs text-slate-300">{t.trust.item2Desc}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileSpreadsheet className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <div>
                <p className="text-sm font-bold text-white">{t.trust.item3Title}</p>
                <p className="mt-0.5 text-xs text-slate-300">{t.trust.item3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <AdSlot placement="top" locale={locale} className="!mt-0" />

        {/* Calculators Directory */}
        <section id="calculators" className="scroll-mt-20">
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold tracking-wider text-emerald-700 uppercase dark:text-emerald-400">
                {isTr ? "FinValio Araç Seti" : "FinValio Calculator Suite"}
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-950 sm:text-3xl dark:text-white">
                {isTr
                  ? "2026 Finans, Maaş, Vergi ve Yatırım Hesaplayıcıları"
                  : "2026 Salary, Tax, Loan & Investment Calculators"}
              </h2>
            </div>
          </div>
          <HomeToolsGrid locale={locale} />
        </section>

        <AdSlot placement="inContent" locale={locale} />

        {/* Featured Guides */}
        <section className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-wider text-emerald-700 uppercase dark:text-emerald-400">
                {isTr ? "Özgün Finans Rehberleri" : "Original Financial Guides"}
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-950 dark:text-white">
                {isTr ? "Rakamların Arkasındaki Matematiği Öğrenin" : "Master the Math Behind Your Money"}
              </h2>
            </div>
            <Link
              href={STATIC_ROUTES.guides[locale]}
              className="hidden items-center gap-1 text-sm font-bold text-emerald-700 hover:underline sm:inline-flex dark:text-emerald-400"
            >
              {isTr ? "Tüm Rehberler" : "View All Guides"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {GUIDES.map((guide) => {
              const g = guide[locale];
              return (
                <Link
                  key={guide.id}
                  href={getGuideUrl(guide, locale)}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        {g.categoryLabel}
                      </span>
                      <span className="text-slate-400">
                        {g.readTimeMin} {isTr ? "dk okuma" : "min read"}
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-bold leading-snug text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                      {g.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {g.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    {isTr ? "Rehberi Oku" : "Read Guide"}
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* E-E-A-T Methodology Strip */}
        <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
                {isTr
                  ? "Şeffaf Formüller, Resmi 2026 Verileri, Sıfır Veri Toplama"
                  : "Transparent Formulas, Official 2026 Tax Data, Zero Data Harvesting"}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {isTr
                  ? "FinValio'daki her hesaplayıcı; Gelir İdaresi Başkanlığı (GİB) 2026 ücret vergi dilimleri, 4857 Sayılı İş Kanunu kıdem/ihbar kuralları, IRS 2026 federal tarifeleri ve uluslararası bankacılık anüite formülleriyle doğrulanmıştır. Girdiğiniz tutarlar asla sunuculara gönderilmez."
                  : "Every FinValio calculator is verified against 2026 IRS federal brackets, official Social Security wage caps, Turkey GVK Article 103 tax tables, and standard banking amortization formulas. Your personal inputs stay 100% inside your browser."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
              <Link
                href={STATIC_ROUTES.about[locale]}
                className="rounded-xl bg-[#0B1F3A] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                {t.footer.about}
              </Link>
              <Link
                href={STATIC_ROUTES.disclaimer[locale]}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {t.footer.disclaimer}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

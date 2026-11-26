import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";
import { GUIDES, getGuideUrl } from "@/lib/guides";
import type { Locale } from "@/lib/i18n";

export function GuidesIndexView({ locale }: { locale: Locale }) {
  const isTr = locale === "tr";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300">
          <BookOpen className="h-3.5 w-3.5" />
          {isTr ? "FinValio Finans Kütüphanesi" : "FinValio Financial Library"}
        </span>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl dark:text-white">
          {isTr ? "2026 Finans, Vergi ve Yatırım Rehberleri" : "2026 Financial, Tax & Investing Guides"}
        </h1>
        <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
          {isTr
            ? "Karmaşık vergi dilimlerini, kredi maliyetlerini, bileşik getiriyi ve kıdem haklarınızı sade örneklerle açıklayan özgün rehberler."
            : "Clear, formula-backed articles explaining 2026 tax brackets, mortgage payoff math, real compounding, severance rules, and financial independence."}
        </p>
      </header>

      <AdSlot placement="top" locale={locale} />

      <div className="grid gap-6 md:grid-cols-2">
        {GUIDES.map((guide) => {
          const g = guide[locale];
          return (
            <Link
              key={guide.id}
              href={getGuideUrl(guide, locale)}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-emerald-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    {g.categoryLabel}
                  </span>
                  <span className="text-slate-400">
                    {guide.updatedAt} • {g.readTimeMin} {isTr ? "dk" : "min"}
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-bold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                  {g.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {g.excerpt}
                </p>
              </div>
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                {isTr ? "Rehberi Oku" : "Read Full Guide"}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>

      <AdSlot placement="bottom" locale={locale} />
    </div>
  );
}

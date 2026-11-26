import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";
import { CALCULATORS, getCalculatorUrl } from "@/lib/calculators/registry";
import { GUIDES, getGuideUrl } from "@/lib/guides";
import { STATIC_ROUTES, UI_TEXT, type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = UI_TEXT[locale];

  return (
    <footer className="no-print mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <Link
              href={STATIC_ROUTES.home[locale]}
              className="inline-flex items-center gap-2 text-lg font-bold text-slate-950 dark:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B1F3A] text-xs font-extrabold text-white">
                F<span className="text-emerald-400">V</span>
              </span>
              <span>{SITE_CONFIG.name}</span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {t.tagline}
            </p>
            <p className="rounded-lg border border-amber-200/70 bg-amber-50/70 p-2.5 text-[11px] leading-relaxed text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
              {t.disclaimerShort}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-white">
              {t.footer.calculatorsCol}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {CALCULATORS.map((calc) => (
                <li key={calc.id}>
                  <Link
                    href={getCalculatorUrl(calc, locale)}
                    className="text-slate-600 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                  >
                    {calc[locale].shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-white">
              {t.footer.guidesCol}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {GUIDES.map((g) => (
                <li key={g.id}>
                  <Link
                    href={getGuideUrl(g, locale)}
                    className="line-clamp-1 text-slate-600 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                  >
                    {g[locale].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-white">
              {t.footer.companyCol}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href={STATIC_ROUTES.about[locale]}
                  className="text-slate-600 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                >
                  {t.footer.about}
                </Link>
              </li>
              <li>
                <Link
                  href={STATIC_ROUTES.contact[locale]}
                  className="text-slate-600 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                >
                  {t.footer.contact}
                </Link>
              </li>
              <li>
                <Link
                  href={STATIC_ROUTES.privacy[locale]}
                  className="text-slate-600 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                >
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={STATIC_ROUTES.terms[locale]}
                  className="text-slate-600 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                >
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link
                  href={STATIC_ROUTES.disclaimer[locale]}
                  className="text-slate-600 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                >
                  {t.footer.disclaimer}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row dark:border-slate-800 dark:text-slate-400">
          <p>
            © {SITE_CONFIG.foundedYear} {SITE_CONFIG.name} ({SITE_CONFIG.domain}).{" "}
            {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/en" className="hover:text-emerald-600">
              English
            </Link>
            <span>•</span>
            <Link href="/tr" className="hover:text-emerald-600">
              Türkçe
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

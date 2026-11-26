"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, Moon, Sun, X } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { CALCULATORS, getCalculatorUrl } from "@/lib/calculators/registry";
import { GUIDES, getGuideUrl } from "@/lib/guides";
import { STATIC_ROUTES, UI_TEXT, type Locale } from "@/lib/i18n";

function resolveAlternatePath(pathname: string, currentLocale: Locale): string {
  const target: Locale = currentLocale === "tr" ? "en" : "tr";
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  for (const calc of CALCULATORS) {
    if (clean === getCalculatorUrl(calc, currentLocale)) {
      return getCalculatorUrl(calc, target);
    }
  }
  for (const guide of GUIDES) {
    if (clean === getGuideUrl(guide, currentLocale)) {
      return getGuideUrl(guide, target);
    }
  }
  for (const key of Object.keys(STATIC_ROUTES) as (keyof typeof STATIC_ROUTES)[]) {
    if (clean === STATIC_ROUTES[key][currentLocale]) {
      return STATIC_ROUTES[key][target];
    }
  }

  return STATIC_ROUTES.home[target];
}

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("finvalio_theme", next ? "dark" : "light");
    } catch {
      // Ignore
    }
  };

  const t = UI_TEXT[locale].nav;
  const altLocale: Locale = locale === "tr" ? "en" : "tr";
  const altHref = resolveAlternatePath(pathname, locale);

  const navItems = [
    { href: `${STATIC_ROUTES.home[locale]}#calculators`, label: t.calculators },
    { href: STATIC_ROUTES.guides[locale], label: t.guides },
    { href: STATIC_ROUTES.about[locale], label: t.about },
    { href: STATIC_ROUTES.contact[locale], label: t.contact },
  ];

  return (
    <header className="no-print sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href={STATIC_ROUTES.home[locale]}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-950 dark:text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B1F3A] text-sm font-extrabold text-white shadow-sm">
            F<span className="text-emerald-400">V</span>
          </span>
          <span>
            {SITE_CONFIG.name}
            <span className="ml-1.5 hidden rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 sm:inline dark:bg-emerald-950 dark:text-emerald-300">
              2026
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={altHref}
            title={altLocale === "tr" ? "Türkçe sürüme geç" : "Switch to English"}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-500"
          >
            <Globe className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{altLocale.toUpperCase()}</span>
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 md:hidden dark:border-slate-700 dark:text-slate-200"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

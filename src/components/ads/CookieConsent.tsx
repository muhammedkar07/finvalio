"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { STATIC_ROUTES, UI_TEXT, type Locale } from "@/lib/i18n";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function CookieConsent({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("finvalio_consent");
      if (!saved) setVisible(true);
    } catch {
      // Ignore storage failures
    }
  }, []);

  const choose = (choice: "all" | "essential") => {
    try {
      localStorage.setItem("finvalio_consent", choice);
    } catch {
      // Ignore
    }
    const state = choice === "all" ? "granted" : "denied";
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
        analytics_storage: state,
      });
    }
    setVisible(false);
  };

  if (!visible) return null;

  const t = UI_TEXT[locale].cookie;

  return (
    <div className="no-print fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md sm:p-5 dark:border-slate-700 dark:bg-slate-900/95">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {t.desc}{" "}
              <Link
                href={STATIC_ROUTES.privacy[locale]}
                className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800 dark:text-emerald-400"
              >
                {t.learnMore}
              </Link>
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {t.essentialOnly}
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            {t.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}

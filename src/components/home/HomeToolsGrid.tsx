"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Flame,
  Home,
  Landmark,
  Percent,
  PiggyBank,
  Search,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  CALCULATORS,
  CATEGORY_LABELS,
  getCalculatorUrl,
  type CalculatorCategory,
  type CalculatorDefinition,
} from "@/lib/calculators/registry";
import { UI_TEXT, type Locale } from "@/lib/i18n";

function CalcIcon({ name }: { name: CalculatorDefinition["icon"] }) {
  const cls = "h-5 w-5";
  switch (name) {
    case "wallet":
      return <Wallet className={cls} />;
    case "landmark":
      return <Landmark className={cls} />;
    case "trending-up":
      return <TrendingUp className={cls} />;
    case "piggy-bank":
      return <PiggyBank className={cls} />;
    case "briefcase":
      return <Briefcase className={cls} />;
    case "flame":
      return <Flame className={cls} />;
    case "home":
      return <Home className={cls} />;
    case "percent":
      return <Percent className={cls} />;
  }
}

export function HomeToolsGrid({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | CalculatorCategory>("all");
  const t = UI_TEXT[locale];

  const categories: ("all" | CalculatorCategory)[] = [
    "all",
    "income",
    "credit",
    "investing",
    "housing",
    "business",
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CALCULATORS.filter((c) => {
      if (category !== "all" && c.category !== category) return false;
      if (!q) return true;
      const loc = c[locale];
      return (
        loc.name.toLowerCase().includes(q) ||
        loc.shortName.toLowerCase().includes(q) ||
        loc.tagline.toLowerCase().includes(q) ||
        loc.badge.toLowerCase().includes(q)
      );
    });
  }, [query, category, locale]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm text-slate-900 shadow-xs outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                category === cat
                  ? "bg-[#0B1F3A] text-white dark:bg-emerald-600"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              {cat === "all" ? t.allCategories : CATEGORY_LABELS[cat][locale]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((calc) => {
          const loc = calc[locale];
          return (
            <Link
              key={calc.id}
              href={getCalculatorUrl(calc, locale)}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-600"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950/70 dark:text-emerald-400">
                    <CalcIcon name={calc.icon} />
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {loc.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                  {loc.shortName}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {loc.tagline}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <span>{t.openCalculator}</span>
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

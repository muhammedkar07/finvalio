"use client";

import { Download, Printer, RotateCcw } from "lucide-react";
import { CURRENCY_META, UI_TEXT, type CurrencyCode, type Locale } from "@/lib/i18n";

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  slider?: boolean;
  hint?: string;
}

export function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  prefix,
  suffix,
  slider = false,
  hint,
}: NumberFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">{label}</label>
        {hint ? <span className="text-[11px] text-slate-400">{hint}</span> : null}
      </div>
      <div className="relative flex items-center">
        {prefix ? (
          <span className="pointer-events-none absolute left-3 text-sm font-semibold text-slate-400">
            {prefix}
          </span>
        ) : null}
        <input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const parsed = parseFloat(e.target.value);
            onChange(Number.isFinite(parsed) ? parsed : 0);
          }}
          className={`tabular-nums w-full rounded-xl border border-slate-300 bg-white py-2.5 text-sm font-semibold text-slate-900 shadow-xs transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white ${
            prefix ? "pl-8" : "pl-3.5"
          } ${suffix ? "pr-12" : "pr-3.5"}`}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3 text-xs font-semibold text-slate-400">
            {suffix}
          </span>
        ) : null}
      </div>
      {slider && max !== undefined ? (
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={Math.min(max, Math.max(min, value))}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full"
        />
      ) : null}
    </div>
  );
}

export function CurrencySelector({
  value,
  onChange,
  locale,
}: {
  value: CurrencyCode;
  onChange: (c: CurrencyCode) => void;
  locale: Locale;
}) {
  const codes: CurrencyCode[] = ["TRY", "USD", "EUR", "GBP"];
  return (
    <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100/80 p-1 dark:border-slate-700 dark:bg-slate-800/80">
      {codes.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
          className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
            value === code
              ? "bg-white text-slate-900 shadow-xs dark:bg-slate-950 dark:text-white"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
        >
          {locale === "tr" ? CURRENCY_META[code].labelTr : CURRENCY_META[code].labelEn}
        </button>
      ))}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sublabel,
  highlight = false,
}: {
  label: string;
  value: string;
  sublabel?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight
          ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-800/70 dark:bg-emerald-950/40"
          : "border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/60"
      }`}
    >
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p
        className={`tabular-nums mt-1 text-xl font-extrabold tracking-tight sm:text-2xl ${
          highlight ? "text-emerald-700 dark:text-emerald-300" : "text-slate-900 dark:text-white"
        }`}
      >
        {value}
      </p>
      {sublabel ? (
        <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{sublabel}</p>
      ) : null}
    </div>
  );
}

export function CalcActionBar({
  locale,
  onReset,
  onExportCsv,
}: {
  locale: Locale;
  onReset: () => void;
  onExportCsv?: () => void;
}) {
  const t = UI_TEXT[locale];
  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      {onExportCsv ? (
        <button
          type="button"
          onClick={onExportCsv}
          className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 dark:hover:bg-emerald-900/60"
        >
          <Download className="h-3.5 w-3.5" />
          {t.exportCsv}
        </button>
      ) : null}
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <Printer className="h-3.5 w-3.5" />
        {t.printReport}
      </button>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        {t.reset}
      </button>
    </div>
  );
}

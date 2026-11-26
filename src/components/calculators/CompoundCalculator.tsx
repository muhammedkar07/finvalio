"use client";

import { useMemo, useState } from "react";
import {
  CalcActionBar,
  CurrencySelector,
  NumberField,
  StatCard,
} from "@/components/calculators/CalcPrimitives";
import { AreaLineChart } from "@/components/charts/AreaLineChart";
import { calculateCompound, type CompoundFrequency } from "@/lib/calculators";
import { downloadCsv } from "@/lib/export";
import {
  CURRENCY_META,
  formatCurrency,
  formatPercent,
  type CurrencyCode,
  type Locale,
} from "@/lib/i18n";

export function CompoundCalculator({ locale }: { locale: Locale }) {
  const isTr = locale === "tr";
  const [currency, setCurrency] = useState<CurrencyCode>(isTr ? "USD" : "USD");
  const [initial, setInitial] = useState<number>(10000);
  const [monthly, setMonthly] = useState<number>(500);
  const [annualRate, setAnnualRate] = useState<number>(8.5);
  const [years, setYears] = useState<number>(20);
  const [frequency, setFrequency] = useState<CompoundFrequency>("monthly");
  const [inflation, setInflation] = useState<number>(2.5);

  const result = useMemo(
    () =>
      calculateCompound({
        initialPrincipal: initial,
        monthlyContribution: monthly,
        annualRatePct: annualRate,
        years,
        frequency,
        annualInflationPct: inflation,
      }),
    [initial, monthly, annualRate, years, frequency, inflation]
  );

  const sym = CURRENCY_META[currency].symbol;

  const handleReset = () => {
    setCurrency("USD");
    setInitial(10000);
    setMonthly(500);
    setAnnualRate(8.5);
    setYears(20);
    setFrequency("monthly");
    setInflation(2.5);
  };

  const handleExportCsv = () => {
    downloadCsv(
      "finvalio-compound-growth.csv",
      [
        isTr ? "Yıl" : "Year",
        isTr ? "Toplam Katkı" : "Total Contributions",
        isTr ? "Bileşik Kazanç" : "Compound Interest",
        isTr ? "Nominal Bakiye" : "Nominal Balance",
        isTr ? "Reel Alım Gücü" : "Inflation-Adjusted Real Balance",
      ],
      result.yearly.map((r) => [
        r.year,
        r.totalContributions.toFixed(2),
        r.totalInterest.toFixed(2),
        r.nominalBalance.toFixed(2),
        r.realBalance.toFixed(2),
      ])
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CurrencySelector value={currency} onChange={setCurrency} locale={locale} />
        <CalcActionBar locale={locale} onReset={handleReset} onExportCsv={handleExportCsv} />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
          <NumberField
            label={isTr ? "Başlangıç Sermayesi" : "Initial Investment"}
            value={initial}
            onChange={setInitial}
            min={0}
            max={currency === "TRY" ? 5000000 : 500000}
            step={currency === "TRY" ? 5000 : 1000}
            prefix={sym}
            slider
          />
          <NumberField
            label={isTr ? "Aylık Düzenli Katkı" : "Monthly Contribution"}
            value={monthly}
            onChange={setMonthly}
            min={0}
            max={currency === "TRY" ? 200000 : 10000}
            step={currency === "TRY" ? 1000 : 100}
            prefix={sym}
            slider
          />
          <NumberField
            label={isTr ? "Beklenen Yıllık Getiri (%)" : "Expected Annual Return (%)"}
            value={annualRate}
            onChange={setAnnualRate}
            min={0}
            max={60}
            step={0.25}
            suffix="%"
            slider
          />
          <NumberField
            label={isTr ? "Yatırım Süresi (Yıl)" : "Investment Horizon (Years)"}
            value={years}
            onChange={setYears}
            min={1}
            max={45}
            step={1}
            suffix={isTr ? "yıl" : "yrs"}
            slider
          />
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {isTr ? "Bileşik Dönemi" : "Compounding"}
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as CompoundFrequency)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value="monthly">{isTr ? "Aylık" : "Monthly"}</option>
                <option value="quarterly">{isTr ? "3 Aylık" : "Quarterly"}</option>
                <option value="semiannual">{isTr ? "6 Aylık" : "Semiannual"}</option>
                <option value="annual">{isTr ? "Yıllık" : "Annual"}</option>
              </select>
            </div>
            <NumberField
              label={isTr ? "Yıllık Enflasyon (%)" : "Annual Inflation (%)"}
              value={inflation}
              onChange={setInflation}
              min={0}
              max={60}
              step={0.5}
              suffix="%"
            />
          </div>
        </div>

        <div className="space-y-5 lg:col-span-7">
          <div className="grid gap-3 sm:grid-cols-2">
            <StatCard
              highlight
              label={isTr ? `${years} Yıl Sonunda Nominal Değer` : `Future Nominal Balance (${years} Yrs)`}
              value={formatCurrency(result.finalNominalBalance, currency, 0)}
              sublabel={`${isTr ? "Toplam Kazanç" : "Total Gain"}: +${formatPercent(result.totalReturnPct, locale, 1)}`}
            />
            <StatCard
              label={isTr ? "Enflasyon Düzeltmeli Reel Değer" : "Inflation-Adjusted Real Value"}
              value={formatCurrency(result.finalRealBalance, currency, 0)}
              sublabel={isTr ? "Bugünün alım gücü cinsinden" : "In today's purchasing power"}
            />
            <StatCard
              label={isTr ? "Toplam Yatırılan Anapara" : "Total Cash Contributed"}
              value={formatCurrency(result.totalContributions, currency, 0)}
            />
            <StatCard
              label={isTr ? "Bileşik Getiri Kazancı" : "Total Interest Earned"}
              value={formatCurrency(result.totalInterestEarned, currency, 0)}
              sublabel={`${((result.totalInterestEarned / Math.max(1, result.finalNominalBalance)) * 100).toFixed(1)}% ${isTr ? "portföy payı" : "of ending value"}`}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
              {isTr ? "Nominal vs. Reel Büyüme ve Anapara Grafiği" : "Nominal vs. Inflation-Adjusted Growth"}
            </h3>
            <AreaLineChart
              labels={result.yearly.map((r) => `${isTr ? "Yıl" : "Yr"} ${r.year}`)}
              series={[
                {
                  id: "nominal",
                  label: isTr ? "Nominal Bakiye" : "Nominal Balance",
                  color: "#059669",
                  values: result.yearly.map((r) => r.nominalBalance),
                  fillOpacity: 0.14,
                },
                {
                  id: "real",
                  label: isTr ? "Reel Alım Gücü" : "Real Purchasing Power",
                  color: "#0284c7",
                  values: result.yearly.map((r) => r.realBalance),
                },
                {
                  id: "contrib",
                  label: isTr ? "Yatırılan Anapara" : "Contributions",
                  color: "#94a3b8",
                  values: result.yearly.map((r) => r.totalContributions),
                  dashed: true,
                },
              ]}
              formatY={(v) => formatCurrency(v, currency, 0)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import {
  CalcActionBar,
  CurrencySelector,
  NumberField,
  StatCard,
} from "@/components/calculators/CalcPrimitives";
import { DonutChart } from "@/components/charts/DonutChart";
import { calculateDeposit } from "@/lib/calculators";
import { downloadCsv } from "@/lib/export";
import {
  CURRENCY_META,
  formatCurrency,
  formatPercent,
  type CurrencyCode,
  type Locale,
} from "@/lib/i18n";

export function DepositCalculator({ locale }: { locale: Locale }) {
  const isTr = locale === "tr";
  const [currency, setCurrency] = useState<CurrencyCode>(isTr ? "TRY" : "USD");
  const [principal, setPrincipal] = useState<number>(isTr ? 500000 : 50000);
  const [annualRate, setAnnualRate] = useState<number>(isTr ? 42 : 4.75);
  const [termDays, setTermDays] = useState<number>(isTr ? 32 : 90);
  const [taxPct, setTaxPct] = useState<number>(isTr ? 15 : 22);
  const [cycles, setCycles] = useState<number>(isTr ? 6 : 4);

  const result = useMemo(
    () =>
      calculateDeposit({
        principal,
        annualRatePct: annualRate,
        termDays,
        withholdingTaxPct: taxPct,
        renewalCycles: cycles,
      }),
    [principal, annualRate, termDays, taxPct, cycles]
  );

  const sym = CURRENCY_META[currency].symbol;

  const handleReset = () => {
    setCurrency(isTr ? "TRY" : "USD");
    setPrincipal(isTr ? 500000 : 50000);
    setAnnualRate(isTr ? 42 : 4.75);
    setTermDays(isTr ? 32 : 90);
    setTaxPct(isTr ? 15 : 22);
    setCycles(isTr ? 6 : 4);
  };

  const handleExportCsv = () => {
    downloadCsv(
      "finvalio-deposit-rollover.csv",
      [
        isTr ? "Dönem" : "Cycle",
        isTr ? "Başlangıç" : "Start Balance",
        isTr ? "Brüt Faiz" : "Gross Interest",
        isTr ? "Stopaj / Vergi" : "Tax",
        isTr ? "Net Faiz" : "Net Interest",
        isTr ? "Dönem Sonu" : "End Balance",
      ],
      result.cycles.map((c) => [
        c.cycle,
        c.startBalance.toFixed(2),
        c.grossInterest.toFixed(2),
        c.taxPaid.toFixed(2),
        c.netInterest.toFixed(2),
        c.endBalance.toFixed(2),
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
            label={isTr ? "Mevduat Anaparası" : "Deposit Principal"}
            value={principal}
            onChange={setPrincipal}
            min={1000}
            max={currency === "TRY" ? 10000000 : 1000000}
            step={currency === "TRY" ? 10000 : 1000}
            prefix={sym}
            slider
          />

          <NumberField
            label={isTr ? "Yıllık Brüt Faiz Oranı (%)" : "Gross Annual Interest Rate (%)"}
            value={annualRate}
            onChange={setAnnualRate}
            min={0}
            max={75}
            step={0.25}
            suffix="%"
            slider
          />

          <div className="space-y-2">
            <NumberField
              label={isTr ? "Vade Süresi (Gün)" : "Term Maturity (Days)"}
              value={termDays}
              onChange={setTermDays}
              min={1}
              max={730}
              step={1}
              suffix={isTr ? "gün" : "days"}
            />
            <div className="flex flex-wrap gap-1.5">
              {[32, 46, 92, 181, 365].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setTermDays(d)}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
                    termDays === d
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                      : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                  }`}
                >
                  {d} {isTr ? "Gün" : "d"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <NumberField
              label={isTr ? "Stopaj / Vergi Oranı (%)" : "Withholding / Marginal Tax (%)"}
              value={taxPct}
              onChange={setTaxPct}
              min={0}
              max={50}
              step={0.5}
              suffix="%"
            />
            <div className="flex flex-wrap gap-1.5">
              {[0, 10, 12.5, 15, 17.5, 22].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setTaxPct(r)}
                  className={`rounded-lg border px-2 py-0.5 text-[11px] font-semibold transition ${
                    taxPct === r
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                      : "border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400"
                  }`}
                >
                  %{r}
                </button>
              ))}
            </div>
          </div>

          <NumberField
            label={isTr ? "Vade Yenileme Sayısı (Bileşik)" : "Auto-Rollover Cycles"}
            value={cycles}
            onChange={setCycles}
            min={1}
            max={24}
            step={1}
            hint={`${cycles * termDays} ${isTr ? "toplam gün" : "total days"}`}
            slider
          />
        </div>

        <div className="space-y-5 lg:col-span-7">
          <div className="grid gap-3 sm:grid-cols-2">
            <StatCard
              highlight
              label={isTr ? `İlk Vade Net Faiz (${termDays} Gün)` : `First-Term Net Interest (${termDays}d)`}
              value={formatCurrency(result.firstTermNetInterest, currency)}
              sublabel={`${isTr ? "Brüt" : "Gross"}: ${formatCurrency(result.firstTermGrossInterest, currency)} • ${isTr ? "Stopaj" : "Tax"}: ${formatCurrency(result.firstTermTax, currency)}`}
            />
            <StatCard
              label={isTr ? `${cycles} Dönem Sonu Bakiye` : `Balance After ${cycles} Cycle(s)`}
              value={formatCurrency(result.finalBalance, currency)}
              sublabel={`${isTr ? "Toplam Net Kazanç" : "Total Net Interest"}: +${formatCurrency(result.totalNetInterest, currency)}`}
            />
            <StatCard
              label={isTr ? "Efektif Yıllık Net Getiri (Bileşik)" : "Effective Annual Net APY"}
              value={formatPercent(result.effectiveAnnualNetYieldPct, locale)}
              sublabel={isTr ? "Faiz anaparaya eklendiğinde" : "Assuming full net rollover"}
            />
            <StatCard
              label={isTr ? "Toplam Stopaj Kesintisi" : "Total Tax Paid"}
              value={formatCurrency(result.totalTaxPaid, currency)}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <DonutChart
              centerLabel={isTr ? "Vade Sonu" : "Ending Value"}
              centerValue={formatCurrency(result.finalBalance, currency, 0)}
              slices={[
                {
                  label: isTr ? "Anapara" : "Principal",
                  value: principal,
                  color: "#0b1f3a",
                  formattedValue: formatCurrency(principal, currency, 0),
                },
                {
                  label: isTr ? "Toplam Net Kazanç" : "Total Net Interest",
                  value: result.totalNetInterest,
                  color: "#059669",
                  formattedValue: formatCurrency(result.totalNetInterest, currency, 0),
                },
                {
                  label: isTr ? "Stopaj / Vergi" : "Withholding Tax",
                  value: result.totalTaxPaid,
                  color: "#f59e0b",
                  formattedValue: formatCurrency(result.totalTaxPaid, currency, 0),
                },
              ]}
            />
          </div>
        </div>

        {/* Rollover table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white lg:col-span-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {isTr ? "Vade Yenileme (Bileşik Getiri) Tablosu" : "Maturity Rollover Schedule"}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">{isTr ? "Dönem" : "Cycle"}</th>
                  <th className="px-4 py-2.5 text-right font-semibold">{isTr ? "Dönem Başı" : "Start"}</th>
                  <th className="px-4 py-2.5 text-right font-semibold">{isTr ? "Brüt Faiz" : "Gross"}</th>
                  <th className="px-4 py-2.5 text-right font-semibold">{isTr ? "Vergi/Stopaj" : "Tax"}</th>
                  <th className="px-4 py-2.5 text-right font-semibold text-emerald-700 dark:text-emerald-400">
                    {isTr ? "Net Faiz" : "Net Interest"}
                  </th>
                  <th className="px-4 py-2.5 text-right font-semibold">{isTr ? "Dönem Sonu" : "End Balance"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 tabular-nums dark:divide-slate-800">
                {result.cycles.map((c) => (
                  <tr key={c.cycle} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
                    <td className="px-4 py-2 font-semibold">
                      #{c.cycle} ({c.cycle * termDays} {isTr ? "gün" : "d"})
                    </td>
                    <td className="px-4 py-2 text-right">{formatCurrency(c.startBalance, currency)}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(c.grossInterest, currency)}</td>
                    <td className="px-4 py-2 text-right text-amber-700 dark:text-amber-400">
                      {formatCurrency(c.taxPaid, currency)}
                    </td>
                    <td className="px-4 py-2 text-right font-bold text-emerald-700 dark:text-emerald-400">
                      +{formatCurrency(c.netInterest, currency)}
                    </td>
                    <td className="px-4 py-2 text-right font-semibold">
                      {formatCurrency(c.endBalance, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

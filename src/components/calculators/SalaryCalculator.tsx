"use client";

import { useMemo, useState } from "react";
import { CalcActionBar, NumberField, StatCard } from "@/components/calculators/CalcPrimitives";
import { DonutChart } from "@/components/charts/DonutChart";
import { calculateTrSalary, calculateUsSalary, type UsFilingStatus } from "@/lib/calculators";
import { downloadCsv } from "@/lib/export";
import { formatCurrency, formatPercent, type Locale } from "@/lib/i18n";

const TR_MONTH_NAMES = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const EN_MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function SalaryCalculator({ locale }: { locale: Locale }) {
  const [system, setSystem] = useState<"tr" | "us">(locale === "tr" ? "tr" : "us");

  // TR 2026 state
  const [trMode, setTrMode] = useState<"gross-to-net" | "net-to-gross">("gross-to-net");
  const [trAmount, setTrAmount] = useState<number>(80000);
  const [trExemption, setTrExemption] = useState<boolean>(true);
  const [trIncentive, setTrIncentive] = useState<boolean>(true);

  // US 2026 state
  const [usGross, setUsGross] = useState<number>(95000);
  const [usStatus, setUsStatus] = useState<UsFilingStatus>("single");
  const [us401k, setUs401k] = useState<number>(6);
  const [usHealth, setUsHealth] = useState<number>(2400);
  const [usStateTax, setUsStateTax] = useState<number>(5);

  const trResult = useMemo(
    () =>
      calculateTrSalary({
        mode: trMode,
        monthlyAmount: trAmount,
        applyMinWageExemption: trExemption,
        applyEmployerIncentive: trIncentive,
      }),
    [trMode, trAmount, trExemption, trIncentive]
  );

  const usResult = useMemo(
    () =>
      calculateUsSalary({
        annualGross: usGross,
        filingStatus: usStatus,
        retirement401kPct: us401k,
        healthInsuranceAnnual: usHealth,
        stateTaxRatePct: usStateTax,
      }),
    [usGross, usStatus, us401k, usHealth, usStateTax]
  );

  const isTr = locale === "tr";

  const handleReset = () => {
    setTrMode("gross-to-net");
    setTrAmount(80000);
    setTrExemption(true);
    setTrIncentive(true);
    setUsGross(95000);
    setUsStatus("single");
    setUs401k(6);
    setUsHealth(2400);
    setUsStateTax(5);
  };

  const handleExportCsv = () => {
    if (system === "tr") {
      downloadCsv(
        "finvalio-2026-tr-maas.csv",
        [
          isTr ? "Ay" : "Month",
          isTr ? "Brüt (TL)" : "Gross (TRY)",
          isTr ? "SGK + İşsizlik" : "SGK + Unemp",
          isTr ? "Gelir Vergisi" : "Income Tax",
          isTr ? "Damga Vergisi" : "Stamp Tax",
          isTr ? "Net Maaş (TL)" : "Net Pay (TRY)",
          isTr ? "Dilim %" : "Bracket %",
          isTr ? "İşveren Maliyeti" : "Employer Cost",
        ],
        trResult.months.map((r, i) => [
          isTr ? TR_MONTH_NAMES[i] : EN_MONTH_NAMES[i],
          r.gross.toFixed(2),
          (r.sgkEmployee + r.unemploymentEmployee).toFixed(2),
          r.payableIncomeTax.toFixed(2),
          r.payableStampTax.toFixed(2),
          r.net.toFixed(2),
          r.marginalRate.toFixed(0),
          r.employerCost.toFixed(2),
        ])
      );
    } else {
      downloadCsv(
        "finvalio-2026-us-salary.csv",
        ["Item", "Annual (USD)", "Monthly (USD)"],
        [
          ["Gross Salary", usResult.annualGross.toFixed(2), (usResult.annualGross / 12).toFixed(2)],
          ["Pre-Tax 401(k)", usResult.preTax401k.toFixed(2), (usResult.preTax401k / 12).toFixed(2)],
          ["Federal Income Tax", usResult.federalTax.toFixed(2), (usResult.federalTax / 12).toFixed(2)],
          ["Social Security (6.2%)", usResult.socialSecurityTax.toFixed(2), (usResult.socialSecurityTax / 12).toFixed(2)],
          ["Medicare", usResult.medicareTax.toFixed(2), (usResult.medicareTax / 12).toFixed(2)],
          ["State Tax", usResult.stateTax.toFixed(2), (usResult.stateTax / 12).toFixed(2)],
          ["Net Take-Home Pay", usResult.annualNet.toFixed(2), usResult.monthlyNet.toFixed(2)],
        ]
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Tax System Switcher + Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100/80 p-1 dark:border-slate-700 dark:bg-slate-800/80">
          <button
            type="button"
            onClick={() => setSystem("tr")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
              system === "tr"
                ? "bg-[#0B1F3A] text-white shadow-xs dark:bg-emerald-600"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300"
            }`}
          >
            {isTr ? "Türkiye 2026 Bordro (₺)" : "Turkey 2026 Payroll (₺)"}
          </button>
          <button
            type="button"
            onClick={() => setSystem("us")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
              system === "us"
                ? "bg-[#0B1F3A] text-white shadow-xs dark:bg-emerald-600"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300"
            }`}
          >
            {isTr ? "ABD 2026 IRS Maaş ($)" : "US 2026 Federal IRS ($)"}
          </button>
        </div>

        <CalcActionBar locale={locale} onReset={handleReset} onExportCsv={handleExportCsv} />
      </div>

      {system === "tr" ? (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* TR Inputs */}
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-200">
                {isTr ? "Hesaplama Yönü" : "Calculation Direction"}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTrMode("gross-to-net")}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition ${
                    trMode === "gross-to-net"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                      : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                  }`}
                >
                  {isTr ? "Brütten Nete" : "Gross → Net"}
                </button>
                <button
                  type="button"
                  onClick={() => setTrMode("net-to-gross")}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition ${
                    trMode === "net-to-gross"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                      : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                  }`}
                >
                  {isTr ? "Netten Brüte" : "Net → Gross"}
                </button>
              </div>
            </div>

            <NumberField
              label={
                trMode === "gross-to-net"
                  ? isTr
                    ? "Aylık Brüt Maaş (TL)"
                    : "Monthly Gross Salary (TRY)"
                  : isTr
                  ? "Aylık Hedef Net Maaş (TL)"
                  : "Monthly Target Net Salary (TRY)"
              }
              value={trAmount}
              onChange={setTrAmount}
              min={10000}
              max={600000}
              step={1000}
              prefix="₺"
              slider
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: isTr ? "Asgari (33.030₺)" : "Min Wage (33,030₺)", val: 33030, mode: "gross-to-net" as const },
                { label: "60.000₺", val: 60000, mode: trMode },
                { label: "100.000₺", val: 100000, mode: trMode },
                { label: "180.000₺", val: 180000, mode: trMode },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setTrMode(p.mode);
                    setTrAmount(p.val);
                  }}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600 transition hover:border-emerald-400 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
              <label className="flex cursor-pointer items-center justify-between gap-3 text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {isTr ? "2026 Asgari Ücret Vergi İstisnası (33.030 TL)" : "2026 Min Wage Tax Exemption"}
                </span>
                <input
                  type="checkbox"
                  checked={trExemption}
                  onChange={(e) => setTrExemption(e.target.checked)}
                  className="h-4 w-4 accent-emerald-600"
                />
              </label>
              <label className="flex cursor-pointer items-center justify-between gap-3 text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {isTr ? "5 Puan SGK İşveren Hazine Teşviki" : "5-pt Employer SGK Incentive"}
                </span>
                <input
                  type="checkbox"
                  checked={trIncentive}
                  onChange={(e) => setTrIncentive(e.target.checked)}
                  className="h-4 w-4 accent-emerald-600"
                />
              </label>
            </div>
          </div>

          {/* TR Results */}
          <div className="space-y-5 lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              <StatCard
                highlight
                label={isTr ? "Yıllık Ortalama Aylık Net" : "Average Monthly Net"}
                value={formatCurrency(trResult.averageMonthlyNet, "TRY")}
                sublabel={
                  isTr
                    ? `Ocak: ${formatCurrency(trResult.months[0].net, "TRY", 0)} • Aralık: ${formatCurrency(trResult.months[11].net, "TRY", 0)}`
                    : `Jan: ${formatCurrency(trResult.months[0].net, "TRY", 0)} • Dec: ${formatCurrency(trResult.months[11].net, "TRY", 0)}`
                }
              />
              <StatCard
                label={isTr ? "Yıllık Toplam Net Gelir" : "Annual Total Net"}
                value={formatCurrency(trResult.annualNet, "TRY", 0)}
                sublabel={
                  isTr
                    ? `Efektif Kesinti: ${formatPercent(trResult.effectiveDeductionRate, locale)}`
                    : `Effective Deduction: ${formatPercent(trResult.effectiveDeductionRate, locale)}`
                }
              />
              <StatCard
                label={isTr ? "Yıllık Toplam Brüt" : "Annual Total Gross"}
                value={formatCurrency(trResult.annualGross, "TRY", 0)}
                sublabel={
                  isTr
                    ? `Aylık Ort. Brüt: ${formatCurrency(trResult.averageMonthlyGross, "TRY", 0)}`
                    : `Avg Monthly Gross: ${formatCurrency(trResult.averageMonthlyGross, "TRY", 0)}`
                }
              />
              <StatCard
                label={isTr ? "Yıllık İşveren Maliyeti" : "Annual Employer Cost"}
                value={formatCurrency(trResult.annualEmployerCost, "TRY", 0)}
                sublabel={
                  isTr
                    ? `Aylık Ort.: ${formatCurrency(trResult.annualEmployerCost / 12, "TRY", 0)}`
                    : `Monthly Avg: ${formatCurrency(trResult.annualEmployerCost / 12, "TRY", 0)}`
                }
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <DonutChart
                centerLabel={isTr ? "Yıllık Brüt" : "Annual Gross"}
                centerValue={formatCurrency(trResult.annualGross, "TRY", 0)}
                slices={[
                  {
                    label: isTr ? "Net Ele Geçen" : "Net Take-Home",
                    value: trResult.annualNet,
                    color: "#059669",
                    formattedValue: formatCurrency(trResult.annualNet, "TRY", 0),
                  },
                  {
                    label: isTr ? "SGK + İşsizlik (İşçi)" : "SGK + Unemployment",
                    value: trResult.annualSgkEmployee,
                    color: "#0284c7",
                    formattedValue: formatCurrency(trResult.annualSgkEmployee, "TRY", 0),
                  },
                  {
                    label: isTr ? "Ödenecek Gelir Vergisi" : "Payable Income Tax",
                    value: trResult.annualIncomeTax,
                    color: "#f59e0b",
                    formattedValue: formatCurrency(trResult.annualIncomeTax, "TRY", 0),
                  },
                  {
                    label: isTr ? "Ödenecek Damga Vergisi" : "Payable Stamp Tax",
                    value: trResult.annualStampTax,
                    color: "#64748b",
                    formattedValue: formatCurrency(trResult.annualStampTax, "TRY", 0),
                  },
                ]}
              />
            </div>
          </div>

          {/* 12-Month Breakdown Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white lg:col-span-12 dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {isTr ? "2026 12 Aylık Detaylı Bordro ve Vergi Dilimi Tablosu" : "2026 12-Month Turkey Payroll Schedule"}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-semibold">{isTr ? "Ay" : "Month"}</th>
                    <th className="px-4 py-3 text-right font-semibold">{isTr ? "Brüt" : "Gross"}</th>
                    <th className="px-4 py-3 text-right font-semibold">{isTr ? "SGK+İşs." : "SGK+Unemp"}</th>
                    <th className="px-4 py-3 text-right font-semibold">{isTr ? "Öd. Gelir V." : "Income Tax"}</th>
                    <th className="px-4 py-3 text-right font-semibold">{isTr ? "Damga V." : "Stamp"}</th>
                    <th className="px-4 py-3 text-right font-semibold text-emerald-700 dark:text-emerald-400">
                      {isTr ? "Net Maaş" : "Net Pay"}
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">{isTr ? "Dilim" : "Bracket"}</th>
                    <th className="px-4 py-3 text-right font-semibold">{isTr ? "İşveren Mal." : "Employer Cost"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 tabular-nums dark:divide-slate-800">
                  {trResult.months.map((row, idx) => (
                    <tr key={row.month} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
                      <td className="px-4 py-2.5 font-semibold text-slate-900 dark:text-white">
                        {isTr ? TR_MONTH_NAMES[idx] : EN_MONTH_NAMES[idx]}
                      </td>
                      <td className="px-4 py-2.5 text-right">{formatCurrency(row.gross, "TRY")}</td>
                      <td className="px-4 py-2.5 text-right text-slate-500">
                        {formatCurrency(row.sgkEmployee + row.unemploymentEmployee, "TRY")}
                      </td>
                      <td className="px-4 py-2.5 text-right text-amber-700 dark:text-amber-400">
                        {formatCurrency(row.payableIncomeTax, "TRY")}
                      </td>
                      <td className="px-4 py-2.5 text-right text-slate-500">
                        {formatCurrency(row.payableStampTax, "TRY")}
                      </td>
                      <td className="px-4 py-2.5 text-right font-bold text-emerald-700 dark:text-emerald-400">
                        {formatCurrency(row.net, "TRY")}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          %{row.marginalRate.toFixed(0)}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">
                        {formatCurrency(row.employerCost, "TRY")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* US 2026 IRS Mode */
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
            <NumberField
              label={isTr ? "Yıllık Brüt Maaş (USD)" : "Annual Gross Salary (USD)"}
              value={usGross}
              onChange={setUsGross}
              min={15000}
              max={600000}
              step={1000}
              prefix="$"
              slider
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {isTr ? "Vergi Beyan Statüsü (IRS 2026)" : "Filing Status (IRS 2026)"}
              </label>
              <select
                value={usStatus}
                onChange={(e) => setUsStatus(e.target.value as UsFilingStatus)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value="single">{isTr ? "Bekar ($16,100 İndirim)" : "Single ($16,100 Std. Deduction)"}</option>
                <option value="married">{isTr ? "Evli Ortak ($32,200 İndirim)" : "Married Filing Jointly ($32,200)"}</option>
                <option value="hoh">{isTr ? "Hane Reisi ($24,150 İndirim)" : "Head of Household ($24,150)"}</option>
              </select>
            </div>

            <NumberField
              label={isTr ? "Vergi Öncesi 401(k) Katkısı (%)" : "Pre-Tax 401(k) Contribution (%)"}
              value={us401k}
              onChange={setUs401k}
              min={0}
              max={30}
              step={0.5}
              suffix="%"
              slider
            />

            <NumberField
              label={isTr ? "Yıllık Sağlık Sigortası Kesintisi ($)" : "Annual Pre-Tax Health Premiums ($)"}
              value={usHealth}
              onChange={setUsHealth}
              min={0}
              max={25000}
              step={200}
              prefix="$"
            />

            <NumberField
              label={isTr ? "Tahmini Eyalet Vergisi (%)" : "Estimated State Income Tax (%)"}
              value={usStateTax}
              onChange={setUsStateTax}
              min={0}
              max={13.3}
              step={0.25}
              suffix="%"
              hint={isTr ? "TX/FL/WA: %0" : "TX/FL/WA: 0%"}
              slider
            />
          </div>

          <div className="space-y-5 lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              <StatCard
                highlight
                label={isTr ? "Aylık Net Ele Geçen" : "Monthly Take-Home Pay"}
                value={formatCurrency(usResult.monthlyNet, "USD")}
                sublabel={`${isTr ? "2 Haftalık" : "Biweekly"}: ${formatCurrency(usResult.biweeklyNet, "USD")}`}
              />
              <StatCard
                label={isTr ? "Yıllık Net Gelir" : "Annual Take-Home Pay"}
                value={formatCurrency(usResult.annualNet, "USD", 0)}
                sublabel={`${isTr ? "Saatlik Net" : "Hourly Net"}: ${formatCurrency(usResult.hourlyNet, "USD")}`}
              />
              <StatCard
                label={isTr ? "Toplam Vergiler (Fed + FICA + Eyalet)" : "Total Taxes (Fed + FICA + State)"}
                value={formatCurrency(usResult.totalTaxes, "USD", 0)}
                sublabel={`${isTr ? "Efektif Vergi" : "Effective Rate"}: ${formatPercent(usResult.effectiveTotalTaxRate, locale)}`}
              />
              <StatCard
                label={isTr ? "Federal Marjinal Dilim" : "Federal Marginal Bracket"}
                value={`${usResult.marginalFederalRate.toFixed(0)}%`}
                sublabel={`${isTr ? "Efektif Federal" : "Effective Federal"}: ${formatPercent(usResult.effectiveFederalRate, locale)}`}
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <DonutChart
                centerLabel={isTr ? "Yıllık Brüt" : "Annual Gross"}
                centerValue={formatCurrency(usResult.annualGross, "USD", 0)}
                slices={[
                  {
                    label: isTr ? "Net Ele Geçen" : "Net Take-Home",
                    value: usResult.annualNet,
                    color: "#059669",
                    formattedValue: formatCurrency(usResult.annualNet, "USD", 0),
                  },
                  {
                    label: isTr ? "Federal Gelir Vergisi" : "Federal Income Tax",
                    value: usResult.federalTax,
                    color: "#0284c7",
                    formattedValue: formatCurrency(usResult.federalTax, "USD", 0),
                  },
                  {
                    label: "FICA (SS + Medicare)",
                    value: usResult.socialSecurityTax + usResult.medicareTax,
                    color: "#f59e0b",
                    formattedValue: formatCurrency(
                      usResult.socialSecurityTax + usResult.medicareTax,
                      "USD",
                      0
                    ),
                  },
                  {
                    label: isTr ? "Eyalet Vergisi" : "State Income Tax",
                    value: usResult.stateTax,
                    color: "#8b5cf6",
                    formattedValue: formatCurrency(usResult.stateTax, "USD", 0),
                  },
                  {
                    label: isTr ? "401(k) & Sağlık" : "401(k) & Health",
                    value: usResult.preTax401k + usResult.preTaxHealth,
                    color: "#64748b",
                    formattedValue: formatCurrency(
                      usResult.preTax401k + usResult.preTaxHealth,
                      "USD",
                      0
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

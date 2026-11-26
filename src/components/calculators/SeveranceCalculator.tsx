"use client";

import { useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { CalcActionBar, NumberField, StatCard } from "@/components/calculators/CalcPrimitives";
import { TR_2026_CONSTANTS } from "@/config/site";
import { calculateGlobalSeverance, calculateTrSeverance } from "@/lib/calculators";
import { formatCurrency, type Locale } from "@/lib/i18n";

export function SeveranceCalculator({ locale }: { locale: Locale }) {
  const isTr = locale === "tr";
  const [region, setRegion] = useState<"tr" | "global">(isTr ? "tr" : "global");

  // TR 2026 state
  const [years, setYears] = useState<number>(5);
  const [months, setMonths] = useState<number>(4);
  const [days, setDays] = useState<number>(0);
  const [grossSalary, setGrossSalary] = useState<number>(65000);
  const [extras, setExtras] = useState<number>(5000);
  const [capPeriod, setCapPeriod] = useState<"h2" | "h1">("h2");
  const [noticeBracket, setNoticeBracket] = useState<number>(20);

  // Global state
  const [annualSalary, setAnnualSalary] = useState<number>(110000);
  const [gYears, setGYears] = useState<number>(6);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(2);
  const [ptoDays, setPtoDays] = useState<number>(10);
  const [gTaxPct, setGTaxPct] = useState<number>(28);

  const trCap = capPeriod === "h2" ? TR_2026_CONSTANTS.severanceCapH2 : TR_2026_CONSTANTS.severanceCapH1;

  const trRes = useMemo(
    () =>
      calculateTrSeverance({
        years,
        months,
        days,
        monthlyGrossSalary: grossSalary,
        monthlyExtras: extras,
        severanceCap: trCap,
        noticeTaxBracketPct: noticeBracket,
      }),
    [years, months, days, grossSalary, extras, trCap, noticeBracket]
  );

  const gRes = useMemo(
    () =>
      calculateGlobalSeverance({
        annualSalary,
        yearsOfService: gYears,
        weeksPerYear,
        unusedPtoDays: ptoDays,
        taxWithholdingPct: gTaxPct,
      }),
    [annualSalary, gYears, weeksPerYear, ptoDays, gTaxPct]
  );

  const handleReset = () => {
    setYears(5);
    setMonths(4);
    setDays(0);
    setGrossSalary(65000);
    setExtras(5000);
    setCapPeriod("h2");
    setNoticeBracket(20);
    setAnnualSalary(110000);
    setGYears(6);
    setWeeksPerYear(2);
    setPtoDays(10);
    setGTaxPct(28);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100/80 p-1 dark:border-slate-700 dark:bg-slate-800/80">
          <button
            type="button"
            onClick={() => setRegion("tr")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
              region === "tr"
                ? "bg-[#0B1F3A] text-white dark:bg-emerald-600"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            {isTr ? "Türkiye 2026 Kıdem & İhbar (₺)" : "Turkey 2026 Statutory Cap (₺)"}
          </button>
          <button
            type="button"
            onClick={() => setRegion("global")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
              region === "global"
                ? "bg-[#0B1F3A] text-white dark:bg-emerald-600"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            {isTr ? "Global / ABD Paket ($)" : "Global / US Severance ($)"}
          </button>
        </div>
        <CalcActionBar locale={locale} onReset={handleReset} />
      </div>

      {region === "tr" ? (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="grid grid-cols-3 gap-2.5">
              <NumberField
                label={isTr ? "Yıl" : "Years"}
                value={years}
                onChange={setYears}
                min={0}
                max={45}
              />
              <NumberField
                label={isTr ? "Ay" : "Months"}
                value={months}
                onChange={setMonths}
                min={0}
                max={11}
              />
              <NumberField
                label={isTr ? "Gün" : "Days"}
                value={days}
                onChange={setDays}
                min={0}
                max={30}
              />
            </div>

            <NumberField
              label={isTr ? "Aylık Brüt Maaş (TL)" : "Monthly Gross Salary (TRY)"}
              value={grossSalary}
              onChange={setGrossSalary}
              min={33030}
              max={300000}
              step={1000}
              prefix="₺"
              slider
            />

            <NumberField
              label={isTr ? "Aylık Düzenli Yan Haklar (Yol+Yemek+İkramiye)" : "Monthly Regular Benefits"}
              value={extras}
              onChange={setExtras}
              min={0}
              max={100000}
              step={500}
              prefix="₺"
            />

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {isTr ? "2026 Tavan Dönemi" : "2026 Cap Period"}
                </label>
                <select
                  value={capPeriod}
                  onChange={(e) => setCapPeriod(e.target.value as "h2" | "h1")}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  <option value="h2">Tem–Ara 2026 (73.729,87₺)</option>
                  <option value="h1">Oca–Haz 2026 (64.948,77₺)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {isTr ? "İhbar Vergi Dilimi" : "Notice Tax Bracket"}
                </label>
                <select
                  value={noticeBracket}
                  onChange={(e) => setNoticeBracket(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  {[15, 20, 27, 35, 40].map((b) => (
                    <option key={b} value={b}>
                      %{b}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-7">
            {!trRes.eligibleForSeverance ? (
              <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  {isTr
                    ? "Kıdem tazminatına hak kazanmak için aynı işverende en az 1 tam yıl (365 gün) çalışmış olmak gerekir. İhbar tazminatı yine de hesaplanmıştır."
                    : "At least 1 full year (365 days) of tenure is required for Turkish statutory severance (Kıdem). Notice pay is still shown below."}
                </p>
              </div>
            ) : null}

            {trRes.isCapApplied ? (
              <div className="rounded-xl border border-sky-200 bg-sky-50 px-3.5 py-2.5 text-xs text-sky-900 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-200">
                {isTr
                  ? `Giydirilmiş brüt ücretiniz (${formatCurrency(trRes.dressedGross, "TRY")}) 2026 kıdem tavanını aştığı için kıdem hesabı ${formatCurrency(trRes.appliedCap, "TRY")} üzerinden yapılmıştır. İhbar tazminatında tavan sınırı uygulanmaz.`
                  : `Your dressed gross (${formatCurrency(trRes.dressedGross, "TRY")}) exceeds the 2026 cap (${formatCurrency(trRes.appliedCap, "TRY")}), which caps severance pay only.`}
              </div>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-2">
              <StatCard
                highlight
                label={isTr ? "Toplam Net Ödeme (Kıdem + İhbar)" : "Total Net Payout"}
                value={formatCurrency(trRes.totalNetPayout, "TRY")}
                sublabel={`${trRes.totalDays} ${isTr ? "gün" : "days"} (${trRes.totalYearsDecimal.toFixed(2)} ${isTr ? "yıl" : "yrs"})`}
              />
              <StatCard
                label={isTr ? "Net Kıdem Tazminatı" : "Net Severance (Kıdem)"}
                value={formatCurrency(trRes.netSeverance, "TRY")}
                sublabel={`${isTr ? "Brüt" : "Gross"}: ${formatCurrency(trRes.grossSeverance, "TRY")} • ${isTr ? "Damga" : "Stamp"}: ${formatCurrency(trRes.severanceStampTax, "TRY")}`}
              />
              <StatCard
                label={isTr ? `Net İhbar Tazminatı (${trRes.noticeWeeks} Hafta)` : `Net Notice Pay (${trRes.noticeWeeks} Wks)`}
                value={formatCurrency(trRes.netNotice, "TRY")}
                sublabel={`${trRes.noticeDays} ${isTr ? "gün" : "days"} • ${isTr ? "GV+DV" : "Taxes"}: ${formatCurrency(trRes.noticeIncomeTax + trRes.noticeStampTax, "TRY")}`}
              />
              <StatCard
                label={isTr ? "Giydirilmiş Brüt Ücret" : "Dressed Monthly Gross"}
                value={formatCurrency(trRes.dressedGross, "TRY")}
                sublabel={`${isTr ? "Uygulanan Kıdem Tavanı" : "Applied Cap"}: ${formatCurrency(trRes.appliedCap, "TRY")}`}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
            <NumberField
              label={isTr ? "Yıllık Brüt Maaş ($)" : "Annual Base Salary ($)"}
              value={annualSalary}
              onChange={setAnnualSalary}
              min={20000}
              max={500000}
              step={2500}
              prefix="$"
              slider
            />
            <div className="grid grid-cols-2 gap-3">
              <NumberField
                label={isTr ? "Hizmet Süresi (Yıl)" : "Years of Service"}
                value={gYears}
                onChange={setGYears}
                min={0.5}
                max={40}
                step={0.5}
              />
              <NumberField
                label={isTr ? "Yıl Başına Hafta" : "Weeks per Year"}
                value={weeksPerYear}
                onChange={setWeeksPerYear}
                min={0.5}
                max={6}
                step={0.5}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <NumberField
                label={isTr ? "Kullanılmamış İzin (Gün)" : "Unused PTO Days"}
                value={ptoDays}
                onChange={setPtoDays}
                min={0}
                max={60}
              />
              <NumberField
                label={isTr ? "Tahmini Vergi Kesintisi (%)" : "Est. Tax Withholding (%)"}
                value={gTaxPct}
                onChange={setGTaxPct}
                min={0}
                max={55}
                suffix="%"
              />
            </div>
          </div>

          <div className="grid gap-3 self-start sm:grid-cols-2 lg:col-span-7">
            <StatCard
              highlight
              label={isTr ? "Tahmini Net Tazminat Paketi" : "Estimated Net Package"}
              value={formatCurrency(gRes.totalNetPackage, "USD")}
              sublabel={`${gRes.severanceWeeks} ${isTr ? "haftalık tazminat" : "weeks severance"} + ${ptoDays} PTO`}
            />
            <StatCard
              label={isTr ? "Brüt Toplam Paket" : "Total Gross Package"}
              value={formatCurrency(gRes.totalGrossPackage, "USD")}
            />
            <StatCard
              label={isTr ? "Brüt Kıdem Kısmı" : "Gross Severance Pay"}
              value={formatCurrency(gRes.grossSeverance, "USD")}
              sublabel={`${isTr ? "Haftalık Ücret" : "Weekly Base"}: ${formatCurrency(gRes.weeklyPay, "USD")}`}
            />
            <StatCard
              label={isTr ? "İzin Ödemesi & Vergi" : "PTO Payout & Est. Tax"}
              value={formatCurrency(gRes.ptoPayout, "USD")}
              sublabel={`${isTr ? "Tahmini Vergi" : "Est. Tax"}: −${formatCurrency(gRes.estimatedTaxes, "USD")}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

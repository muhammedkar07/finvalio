"use client";

import { useMemo, useState } from "react";
import {
  CalcActionBar,
  CurrencySelector,
  NumberField,
  StatCard,
} from "@/components/calculators/CalcPrimitives";
import { AreaLineChart } from "@/components/charts/AreaLineChart";
import {
  calculateFreelanceRate,
  calculateInflation,
  calculateVat,
} from "@/lib/calculators";
import {
  CURRENCY_META,
  formatCurrency,
  formatPercent,
  type CurrencyCode,
  type Locale,
} from "@/lib/i18n";

export function InflationVatCalculator({ locale }: { locale: Locale }) {
  const isTr = locale === "tr";
  const [tab, setTab] = useState<"inflation" | "vat" | "freelance">("inflation");
  const [currency, setCurrency] = useState<CurrencyCode>(isTr ? "TRY" : "USD");

  // Inflation state
  const [infAmount, setInfAmount] = useState<number>(isTr ? 100000 : 10000);
  const [infRate, setInfRate] = useState<number>(isTr ? 28 : 3.2);
  const [infYears, setInfYears] = useState<number>(10);

  // VAT / KDV state
  const [vatAmount, setVatAmount] = useState<number>(isTr ? 100000 : 5000);
  const [vatRate, setVatRate] = useState<number>(20);
  const [vatMode, setVatMode] = useState<"exclusive" | "inclusive">("exclusive");
  const [tevkifat, setTevkifat] = useState<number>(0);

  // Freelance state
  const [targetNet, setTargetNet] = useState<number>(isTr ? 1200000 : 90000);
  const [expenses, setExpenses] = useState<number>(isTr ? 180000 : 8000);
  const [taxRate, setTaxRate] = useState<number>(28);
  const [weeks, setWeeks] = useState<number>(46);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(30);

  const infRes = useMemo(
    () => calculateInflation({ amount: infAmount, annualInflationPct: infRate, years: infYears }),
    [infAmount, infRate, infYears]
  );

  const vatRes = useMemo(
    () => calculateVat({ amount: vatAmount, vatRatePct: vatRate, mode: vatMode, tevkifatRatio: tevkifat }),
    [vatAmount, vatRate, vatMode, tevkifat]
  );

  const flRes = useMemo(
    () =>
      calculateFreelanceRate({
        targetAnnualNet: targetNet,
        annualExpenses: expenses,
        effectiveTaxRatePct: taxRate,
        billableWeeksPerYear: weeks,
        billableHoursPerWeek: hoursPerWeek,
      }),
    [targetNet, expenses, taxRate, weeks, hoursPerWeek]
  );

  const sym = CURRENCY_META[currency].symbol;

  const handleReset = () => {
    setCurrency(isTr ? "TRY" : "USD");
    setInfAmount(isTr ? 100000 : 10000);
    setInfRate(isTr ? 28 : 3.2);
    setInfYears(10);
    setVatAmount(isTr ? 100000 : 5000);
    setVatRate(20);
    setVatMode("exclusive");
    setTevkifat(0);
    setTargetNet(isTr ? 1200000 : 90000);
    setExpenses(isTr ? 180000 : 8000);
    setTaxRate(28);
    setWeeks(46);
    setHoursPerWeek(30);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100/80 p-1 dark:border-slate-700 dark:bg-slate-800/80">
            <button
              type="button"
              onClick={() => setTab("inflation")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                tab === "inflation"
                  ? "bg-[#0B1F3A] text-white dark:bg-emerald-600"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {isTr ? "Enflasyon & Alım Gücü" : "Inflation Decay"}
            </button>
            <button
              type="button"
              onClick={() => setTab("vat")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                tab === "vat"
                  ? "bg-[#0B1F3A] text-white dark:bg-emerald-600"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {isTr ? "KDV & Tevkifat" : "VAT / Sales Tax"}
            </button>
            <button
              type="button"
              onClick={() => setTab("freelance")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                tab === "freelance"
                  ? "bg-[#0B1F3A] text-white dark:bg-emerald-600"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {isTr ? "Freelance Saatlik Ücret" : "Freelance Rate"}
            </button>
          </div>
          <CurrencySelector value={currency} onChange={setCurrency} locale={locale} />
        </div>
        <CalcActionBar locale={locale} onReset={handleReset} />
      </div>

      {tab === "inflation" ? (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
            <NumberField
              label={isTr ? "Bugünkü Para Tutarı" : "Amount in Today's Money"}
              value={infAmount}
              onChange={setInfAmount}
              min={100}
              max={currency === "TRY" ? 10000000 : 1000000}
              step={currency === "TRY" ? 5000 : 500}
              prefix={sym}
              slider
            />
            <NumberField
              label={isTr ? "Yıllık Ortalama Enflasyon (%)" : "Average Annual Inflation (%)"}
              value={infRate}
              onChange={setInfRate}
              min={0.5}
              max={100}
              step={0.5}
              suffix="%"
              slider
            />
            <NumberField
              label={isTr ? "Süre (Yıl)" : "Time Horizon (Years)"}
              value={infYears}
              onChange={setInfYears}
              min={1}
              max={35}
              suffix={isTr ? "yıl" : "yrs"}
              slider
            />
          </div>

          <div className="space-y-5 lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              <StatCard
                highlight
                label={isTr ? `${infYears} Yıl Sonra Gereken Tutar` : `Needed in ${infYears} Years`}
                value={formatCurrency(infRes.equivalentFutureCost, currency, 0)}
                sublabel={`${isTr ? "Kümülatif Enflasyon" : "Cumulative Inflation"}: +${formatPercent(infRes.cumulativeInflationPct, locale, 1)}`}
              />
              <StatCard
                label={isTr ? "Nakit Tutulan Paranın Reel Değeri" : "Real Value of Idle Cash"}
                value={formatCurrency(infRes.purchasingPowerOfCash, currency, 0)}
                sublabel={`−${formatPercent(infRes.purchasingPowerLossPct, locale, 1)} ${isTr ? "alım gücü kaybı" : "purchasing power lost"}`}
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
                {isTr ? "Nakit Paranın Alım Gücü Erime Eğrisi" : "Cash Purchasing Power Decay Curve"}
              </h3>
              <AreaLineChart
                labels={infRes.points.map((p) => `${isTr ? "Yıl" : "Yr"} ${p.year}`)}
                series={[
                  {
                    id: "power",
                    label: isTr ? "Bugünkü Alım Gücü Karşılığı" : "Real Purchasing Power",
                    color: "#ef4444",
                    values: infRes.points.map((p) => p.purchasingPowerOfCash),
                    fillOpacity: 0.14,
                  },
                ]}
                formatY={(v) => formatCurrency(v, currency, 0)}
              />
            </div>
          </div>
        </div>
      ) : tab === "vat" ? (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setVatMode("exclusive")}
                className={`rounded-xl border px-3 py-2 text-xs font-bold ${
                  vatMode === "exclusive"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                    : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                }`}
              >
                {isTr ? "KDV Hariç → Dahil" : "Add Tax (Exclusive)"}
              </button>
              <button
                type="button"
                onClick={() => setVatMode("inclusive")}
                className={`rounded-xl border px-3 py-2 text-xs font-bold ${
                  vatMode === "inclusive"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                    : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                }`}
              >
                {isTr ? "KDV Dahil → Hariç" : "Extract Tax (Inclusive)"}
              </button>
            </div>

            <NumberField
              label={
                vatMode === "exclusive"
                  ? isTr
                    ? "KDV Hariç Tutar (Matrah)"
                    : "Net Base Amount"
                  : isTr
                  ? "KDV Dahil Toplam Tutar"
                  : "Tax-Inclusive Total"
              }
              value={vatAmount}
              onChange={setVatAmount}
              min={0}
              prefix={sym}
            />

            <div className="space-y-2">
              <NumberField
                label={isTr ? "KDV Oranı (%)" : "VAT / Sales Tax Rate (%)"}
                value={vatRate}
                onChange={setVatRate}
                min={0}
                max={50}
                step={0.5}
                suffix="%"
              />
              <div className="flex flex-wrap gap-1.5">
                {[1, 5, 10, 18, 20].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setVatRate(r)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                      vatRate === r
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                    }`}
                  >
                    %{r}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {isTr ? "KDV Tevkifat Oranı (Opsiyonel)" : "VAT Withholding / Tevkifat"}
              </label>
              <select
                value={tevkifat}
                onChange={(e) => setTevkifat(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value={0}>{isTr ? "Tevkifat Yok (0/10)" : "No Withholding (0/10)"}</option>
                <option value={0.2}>2/10 (%20)</option>
                <option value={0.3}>3/10 (%30)</option>
                <option value={0.4}>4/10 (%40)</option>
                <option value={0.5}>5/10 (%50)</option>
                <option value={0.7}>7/10 (%70)</option>
                <option value={0.9}>9/10 (%90)</option>
              </select>
            </div>
          </div>

          <div className="grid gap-3 self-start sm:grid-cols-2 lg:col-span-7">
            <StatCard
              highlight
              label={isTr ? "Fatura Ödenecek Toplam" : "Invoice Payable Total"}
              value={formatCurrency(vatRes.invoicePayableTotal, currency)}
              sublabel={
                tevkifat > 0
                  ? `${isTr ? "Tevkifatsız Brüt" : "Full Gross"}: ${formatCurrency(vatRes.grossTotal, currency)}`
                  : undefined
              }
            />
            <StatCard
              label={isTr ? "KDV Hariç Matrah" : "Net Base Amount"}
              value={formatCurrency(vatRes.netBase, currency)}
            />
            <StatCard
              label={isTr ? `Hesaplanan KDV (%${vatRate})` : `Total Tax (${vatRate}%)`}
              value={formatCurrency(vatRes.totalVat, currency)}
              sublabel={
                tevkifat > 0
                  ? `${isTr ? "Satıcıya Ödenecek KDV" : "Seller VAT"}: ${formatCurrency(vatRes.sellerPayableVat, currency)}`
                  : undefined
              }
            />
            <StatCard
              label={isTr ? "Tevkif Edilen KDV (Alıcı Öder)" : "Withheld Tax (Buyer Pays)"}
              value={formatCurrency(vatRes.withheldVat, currency)}
            />
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
            <NumberField
              label={isTr ? "Hedef Yıllık Net Gelir" : "Target Annual Net Income"}
              value={targetNet}
              onChange={setTargetNet}
              min={10000}
              prefix={sym}
            />
            <NumberField
              label={isTr ? "Yıllık İşletme Giderleri (Muhasebe/Yazılım/Bağ-Kur)" : "Annual Business Overhead"}
              value={expenses}
              onChange={setExpenses}
              min={0}
              prefix={sym}
            />
            <NumberField
              label={isTr ? "Tahmini Efektif Vergi Oranı (%)" : "Estimated Effective Tax Rate (%)"}
              value={taxRate}
              onChange={setTaxRate}
              min={0}
              max={60}
              suffix="%"
              slider
            />
            <div className="grid grid-cols-2 gap-3">
              <NumberField
                label={isTr ? "Yıllık Çalışma Haftası" : "Billable Weeks/Yr"}
                value={weeks}
                onChange={setWeeks}
                min={10}
                max={52}
              />
              <NumberField
                label={isTr ? "Haftalık Fatura Saati" : "Billable Hrs/Wk"}
                value={hoursPerWeek}
                onChange={setHoursPerWeek}
                min={5}
                max={60}
              />
            </div>
          </div>

          <div className="grid gap-3 self-start sm:grid-cols-2 lg:col-span-7">
            <StatCard
              highlight
              label={isTr ? "Minimum Saatlik Fatura Ücreti" : "Required Hourly Billing Rate"}
              value={formatCurrency(flRes.hourlyRate, currency)}
              sublabel={`${flRes.totalBillableHours} ${isTr ? "faturalanabilir saat/yıl" : "billable hours/yr"}`}
            />
            <StatCard
              label={isTr ? "Günlük Ücret (8 Saat)" : "Daily Rate (8 Hours)"}
              value={formatCurrency(flRes.dailyRate, currency, 0)}
            />
            <StatCard
              label={isTr ? "Gereken Aylık Ciro (KDV Hariç)" : "Required Monthly Revenue"}
              value={formatCurrency(flRes.monthlyBilling, currency, 0)}
              sublabel={`${isTr ? "Yıllık Ciro" : "Annual Revenue"}: ${formatCurrency(flRes.requiredAnnualGross, currency, 0)}`}
            />
            <StatCard
              label={isTr ? "Yıllık Tahmini Vergi Yükü" : "Estimated Annual Taxes"}
              value={formatCurrency(flRes.estimatedAnnualTaxes, currency, 0)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

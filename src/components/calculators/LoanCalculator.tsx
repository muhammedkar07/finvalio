"use client";

import { useMemo, useState } from "react";
import {
  CalcActionBar,
  CurrencySelector,
  NumberField,
  StatCard,
} from "@/components/calculators/CalcPrimitives";
import { AreaLineChart } from "@/components/charts/AreaLineChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { calculateLoan } from "@/lib/calculators";
import { downloadCsv } from "@/lib/export";
import {
  CURRENCY_META,
  formatCurrency,
  formatPercent,
  type CurrencyCode,
  type Locale,
} from "@/lib/i18n";

export function LoanCalculator({ locale }: { locale: Locale }) {
  const isTr = locale === "tr";
  const [currency, setCurrency] = useState<CurrencyCode>(isTr ? "TRY" : "USD");
  const [principal, setPrincipal] = useState<number>(isTr ? 250000 : 350000);
  const [ratePeriod, setRatePeriod] = useState<"annual" | "monthly">(isTr ? "monthly" : "annual");
  const [ratePct, setRatePct] = useState<number>(isTr ? 3.49 : 6.5);
  const [termMonths, setTermMonths] = useState<number>(isTr ? 24 : 360);
  const [kkdfPct, setKkdfPct] = useState<number>(isTr ? 15 : 0);
  const [bsmvPct, setBsmvPct] = useState<number>(isTr ? 15 : 0);
  const [extraPayment, setExtraPayment] = useState<number>(isTr ? 0 : 250);
  const [escrow, setEscrow] = useState<number>(0);
  const [showFullSchedule, setShowFullSchedule] = useState<boolean>(false);

  const result = useMemo(
    () =>
      calculateLoan({
        principal,
        ratePct,
        ratePeriod,
        termMonths,
        kkdfPct,
        bsmvPct,
        extraMonthlyPayment: extraPayment,
        monthlyEscrow: escrow,
      }),
    [principal, ratePct, ratePeriod, termMonths, kkdfPct, bsmvPct, extraPayment, escrow]
  );

  const sym = CURRENCY_META[currency].symbol;

  const applyPreset = (preset: "tr-ihtiyac" | "tr-konut" | "us-mortgage" | "auto") => {
    if (preset === "tr-ihtiyac") {
      setCurrency("TRY");
      setPrincipal(250000);
      setRatePeriod("monthly");
      setRatePct(3.49);
      setTermMonths(24);
      setKkdfPct(15);
      setBsmvPct(15);
      setExtraPayment(0);
      setEscrow(0);
    } else if (preset === "tr-konut") {
      setCurrency("TRY");
      setPrincipal(2500000);
      setRatePeriod("monthly");
      setRatePct(2.89);
      setTermMonths(120);
      setKkdfPct(0);
      setBsmvPct(0);
      setExtraPayment(0);
      setEscrow(0);
    } else if (preset === "us-mortgage") {
      setCurrency("USD");
      setPrincipal(350000);
      setRatePeriod("annual");
      setRatePct(6.5);
      setTermMonths(360);
      setKkdfPct(0);
      setBsmvPct(0);
      setExtraPayment(250);
      setEscrow(420);
    } else {
      setCurrency(isTr ? "TRY" : "USD");
      setPrincipal(isTr ? 600000 : 35000);
      setRatePeriod(isTr ? "monthly" : "annual");
      setRatePct(isTr ? 3.25 : 7.2);
      setTermMonths(isTr ? 36 : 60);
      setKkdfPct(isTr ? 15 : 0);
      setBsmvPct(isTr ? 15 : 0);
      setExtraPayment(0);
      setEscrow(0);
    }
  };

  const handleExportCsv = () => {
    downloadCsv(
      "finvalio-loan-schedule.csv",
      [
        isTr ? "Taksit" : "Month",
        isTr ? "Ödeme" : "Payment",
        isTr ? "Anapara" : "Principal",
        isTr ? "Faiz" : "Interest",
        isTr ? "KKDF+BSMV" : "Tax",
        isTr ? "Kalan Bakiye" : "Remaining Balance",
      ],
      result.schedule.map((r) => [
        r.month,
        r.payment.toFixed(2),
        r.principalPaid.toFixed(2),
        r.interestPaid.toFixed(2),
        r.taxOnInterest.toFixed(2),
        r.remainingBalance.toFixed(2),
      ])
    );
  };

  const visibleRows = showFullSchedule ? result.schedule : result.schedule.slice(0, 12);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <CurrencySelector value={currency} onChange={setCurrency} locale={locale} />
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => applyPreset("tr-ihtiyac")}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              {isTr ? "İhtiyaç Kredisi" : "TR Personal"}
            </button>
            <button
              type="button"
              onClick={() => applyPreset("tr-konut")}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              {isTr ? "Konut Kredisi" : "TR Mortgage"}
            </button>
            <button
              type="button"
              onClick={() => applyPreset("us-mortgage")}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              {isTr ? "ABD 30 Yıl Mortgage" : "US 30-Yr Mortgage"}
            </button>
          </div>
        </div>
        <CalcActionBar
          locale={locale}
          onReset={() => applyPreset(isTr ? "tr-ihtiyac" : "us-mortgage")}
          onExportCsv={handleExportCsv}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
          <NumberField
            label={isTr ? "Kredi Tutarı" : "Loan Principal"}
            value={principal}
            onChange={setPrincipal}
            min={5000}
            max={currency === "TRY" ? 15000000 : 2000000}
            step={currency === "TRY" ? 10000 : 5000}
            prefix={sym}
            slider
          />

          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label={
                ratePeriod === "monthly"
                  ? isTr
                    ? "Aylık Faiz (%)"
                    : "Monthly Rate (%)"
                  : isTr
                  ? "Yıllık Faiz (APR %)"
                  : "Annual Rate (APR %)"
              }
              value={ratePct}
              onChange={setRatePct}
              min={0}
              max={ratePeriod === "monthly" ? 12 : 60}
              step={0.05}
              suffix="%"
            />
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {isTr ? "Oran Tipi" : "Rate Period"}
              </label>
              <select
                value={ratePeriod}
                onChange={(e) => setRatePeriod(e.target.value as "annual" | "monthly")}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value="monthly">{isTr ? "Aylık % (TR Banka)" : "Monthly %"}</option>
                <option value="annual">{isTr ? "Yıllık % (Global)" : "Annual APR %"}</option>
              </select>
            </div>
          </div>

          <NumberField
            label={isTr ? "Vade (Ay)" : "Loan Term (Months)"}
            value={termMonths}
            onChange={setTermMonths}
            min={3}
            max={360}
            step={1}
            suffix={isTr ? "ay" : "mo"}
            hint={`${(termMonths / 12).toFixed(1)} ${isTr ? "yıl" : "yrs"}`}
            slider
          />

          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label="KKDF (%)"
              value={kkdfPct}
              onChange={setKkdfPct}
              min={0}
              max={30}
              step={1}
              suffix="%"
              hint={isTr ? "Konut: 0" : "TR Personal: 15"}
            />
            <NumberField
              label="BSMV (%)"
              value={bsmvPct}
              onChange={setBsmvPct}
              min={0}
              max={30}
              step={1}
              suffix="%"
              hint={isTr ? "Konut: 0" : "TR Personal: 15"}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 dark:border-slate-800">
            <NumberField
              label={isTr ? "Ekstra Aylık Ödeme" : "Extra Monthly Payment"}
              value={extraPayment}
              onChange={setExtraPayment}
              min={0}
              step={100}
              prefix={sym}
            />
            <NumberField
              label={isTr ? "Aylık Sigorta / Vergi" : "Tax + Ins. + PMI / mo"}
              value={escrow}
              onChange={setEscrow}
              min={0}
              step={50}
              prefix={sym}
            />
          </div>
        </div>

        <div className="space-y-5 lg:col-span-7">
          <div className="grid gap-3 sm:grid-cols-2">
            <StatCard
              highlight
              label={isTr ? "Aylık Taksit (Anapara + Faiz)" : "Monthly Principal & Interest"}
              value={formatCurrency(result.monthlyPrincipalInterest, currency)}
              sublabel={
                extraPayment > 0 || escrow > 0
                  ? `${isTr ? "Toplam Aylık Çıkış" : "Total Monthly Outflow"}: ${formatCurrency(result.monthlyTotalOutflow, currency)}`
                  : `${isTr ? "Efektif Aylık Oran" : "Effective Monthly Rate"}: ${formatPercent(result.effectiveMonthlyRatePct, locale, 3)}`
              }
            />
            <StatCard
              label={isTr ? "Toplam Geri Ödeme" : "Total Repayment"}
              value={formatCurrency(result.totalPayment, currency, 0)}
              sublabel={`${isTr ? "Efektif Yıllık Maliyet" : "Effective APR"}: ${formatPercent(result.effectiveAnnualAprPct, locale)}`}
            />
            <StatCard
              label={isTr ? "Toplam Faiz ve Vergi Maliyeti" : "Total Interest & Taxes"}
              value={formatCurrency(result.totalInterestAndTax, currency, 0)}
              sublabel={
                result.totalTaxOnInterest > 0
                  ? `KKDF+BSMV: ${formatCurrency(result.totalTaxOnInterest, currency, 0)}`
                  : `${result.actualMonths} ${isTr ? "ayda kapanır" : "months to payoff"}`
              }
            />
            <StatCard
              label={isTr ? "Ekstra Ödeme Tasarrufu" : "Extra Payment Savings"}
              value={formatCurrency(result.interestSaved, currency, 0)}
              sublabel={
                result.monthsSaved > 0
                  ? `${result.monthsSaved} ${isTr ? "ay erken kapanış!" : "months shaved off!"}`
                  : isTr
                  ? "Ekstra ödeme girerek tasarrufu görün"
                  : "Add extra monthly payment to see savings"
              }
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <DonutChart
              centerLabel={isTr ? "Toplam Ödeme" : "Total Paid"}
              centerValue={formatCurrency(result.totalPayment, currency, 0)}
              slices={[
                {
                  label: isTr ? "Anapara" : "Principal",
                  value: principal,
                  color: "#059669",
                  formattedValue: formatCurrency(principal, currency, 0),
                },
                {
                  label: isTr ? "Banka Faizi" : "Interest",
                  value: Math.max(0, result.totalInterestAndTax - result.totalTaxOnInterest),
                  color: "#f59e0b",
                  formattedValue: formatCurrency(
                    Math.max(0, result.totalInterestAndTax - result.totalTaxOnInterest),
                    currency,
                    0
                  ),
                },
                ...(result.totalTaxOnInterest > 0
                  ? [
                      {
                        label: "KKDF + BSMV",
                        value: result.totalTaxOnInterest,
                        color: "#ef4444",
                        formattedValue: formatCurrency(result.totalTaxOnInterest, currency, 0),
                      },
                    ]
                  : []),
              ]}
            />
          </div>
        </div>

        {/* Balance Curve */}
        {result.yearly.length >= 2 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-12 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
              {isTr ? "Yıllara Göre Kalan Borç Grafiği" : "Remaining Loan Balance Over Time"}
            </h3>
            <AreaLineChart
              labels={result.yearly.map((y) => `${isTr ? "Yıl" : "Yr"} ${y.year}`)}
              series={[
                {
                  id: "bal",
                  label: isTr ? "Kalan Anapara" : "Remaining Balance",
                  color: "#0284c7",
                  values: result.yearly.map((y) => y.remainingBalance),
                  fillOpacity: 0.14,
                },
              ]}
              formatY={(v) => formatCurrency(v, currency, 0)}
            />
          </div>
        ) : null}

        {/* Amortization Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white lg:col-span-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {isTr ? "Taksit Ödeme Planı" : "Amortization Schedule"} ({result.schedule.length}{" "}
              {isTr ? "taksit" : "payments"})
            </h3>
            {result.schedule.length > 12 ? (
              <button
                type="button"
                onClick={() => setShowFullSchedule(!showFullSchedule)}
                className="text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
              >
                {showFullSchedule
                  ? isTr
                    ? "İlk 12 Ayı Göster"
                    : "Show First 12 Months"
                  : isTr
                  ? `Tümünü Göster (${result.schedule.length})`
                  : `Show All ${result.schedule.length} Months`}
              </button>
            ) : null}
          </div>
          <div className="max-h-96 overflow-auto">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">#</th>
                  <th className="px-4 py-2.5 text-right font-semibold">{isTr ? "Taksit" : "Payment"}</th>
                  <th className="px-4 py-2.5 text-right font-semibold">{isTr ? "Anapara" : "Principal"}</th>
                  <th className="px-4 py-2.5 text-right font-semibold">{isTr ? "Faiz" : "Interest"}</th>
                  <th className="px-4 py-2.5 text-right font-semibold">KKDF+BSMV</th>
                  <th className="px-4 py-2.5 text-right font-semibold">{isTr ? "Kalan Borç" : "Balance"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 tabular-nums dark:divide-slate-800">
                {visibleRows.map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
                    <td className="px-4 py-2 font-semibold">{row.month}</td>
                    <td className="px-4 py-2 text-right font-semibold">
                      {formatCurrency(row.payment, currency)}
                    </td>
                    <td className="px-4 py-2 text-right text-emerald-700 dark:text-emerald-400">
                      {formatCurrency(row.principalPaid, currency)}
                    </td>
                    <td className="px-4 py-2 text-right text-amber-700 dark:text-amber-400">
                      {formatCurrency(row.interestPaid, currency)}
                    </td>
                    <td className="px-4 py-2 text-right text-slate-500">
                      {formatCurrency(row.taxOnInterest, currency)}
                    </td>
                    <td className="px-4 py-2 text-right font-medium">
                      {formatCurrency(row.remainingBalance, currency)}
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

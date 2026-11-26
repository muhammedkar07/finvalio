"use client";

import { useMemo, useState } from "react";
import {
  CalcActionBar,
  CurrencySelector,
  NumberField,
  StatCard,
} from "@/components/calculators/CalcPrimitives";
import { AreaLineChart } from "@/components/charts/AreaLineChart";
import { calculateFire } from "@/lib/calculators";
import {
  CURRENCY_META,
  formatCurrency,
  formatPercent,
  type CurrencyCode,
  type Locale,
} from "@/lib/i18n";

export function FireCalculator({ locale }: { locale: Locale }) {
  const isTr = locale === "tr";
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [age, setAge] = useState<number>(32);
  const [savings, setSavings] = useState<number>(80000);
  const [monthlySave, setMonthlySave] = useState<number>(2000);
  const [annualExpenses, setAnnualExpenses] = useState<number>(52000);
  const [expectedReturn, setExpectedReturn] = useState<number>(8);
  const [inflation, setInflation] = useState<number>(2.5);
  const [swr, setSwr] = useState<number>(4);

  const result = useMemo(
    () =>
      calculateFire({
        currentAge: age,
        currentSavings: savings,
        monthlyContribution: monthlySave,
        annualRetirementExpenses: annualExpenses,
        expectedReturnPct: expectedReturn,
        inflationPct: inflation,
        safeWithdrawalRatePct: swr,
      }),
    [age, savings, monthlySave, annualExpenses, expectedReturn, inflation, swr]
  );

  const sym = CURRENCY_META[currency].symbol;

  const handleReset = () => {
    setCurrency("USD");
    setAge(32);
    setSavings(80000);
    setMonthlySave(2000);
    setAnnualExpenses(52000);
    setExpectedReturn(8);
    setInflation(2.5);
    setSwr(4);
  };

  const chartPoints = result.points.slice(0, 36);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CurrencySelector value={currency} onChange={setCurrency} locale={locale} />
        <CalcActionBar locale={locale} onReset={handleReset} />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label={isTr ? "Mevcut Yaşınız" : "Current Age"}
              value={age}
              onChange={setAge}
              min={18}
              max={70}
            />
            <NumberField
              label={isTr ? "Güvenli Çekim (SWR %)" : "Safe Withdrawal (%)"}
              value={swr}
              onChange={setSwr}
              min={2.5}
              max={6}
              step={0.25}
              suffix="%"
            />
          </div>

          <NumberField
            label={isTr ? "Mevcut Yatırım Portföyü" : "Current Invested Portfolio"}
            value={savings}
            onChange={setSavings}
            min={0}
            max={2000000}
            step={5000}
            prefix={sym}
            slider
          />

          <NumberField
            label={isTr ? "Aylık Yatırım Katkısı" : "Monthly Investment Savings"}
            value={monthlySave}
            onChange={setMonthlySave}
            min={0}
            max={20000}
            step={100}
            prefix={sym}
            slider
          />

          <NumberField
            label={isTr ? "Emeklilikte Yıllık Yaşam Gideri" : "Annual Retirement Spending"}
            value={annualExpenses}
            onChange={setAnnualExpenses}
            min={6000}
            max={300000}
            step={1000}
            prefix={sym}
            hint={`${formatCurrency(annualExpenses / 12, currency, 0)}/${isTr ? "ay" : "mo"}`}
            slider
          />

          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label={isTr ? "Nominal Getiri (%)" : "Nominal Return (%)"}
              value={expectedReturn}
              onChange={setExpectedReturn}
              min={1}
              max={25}
              step={0.25}
              suffix="%"
            />
            <NumberField
              label={isTr ? "Yıllık Enflasyon (%)" : "Annual Inflation (%)"}
              value={inflation}
              onChange={setInflation}
              min={0}
              max={15}
              step={0.25}
              suffix="%"
            />
          </div>
        </div>

        <div className="space-y-5 lg:col-span-7">
          <div className="grid gap-3 sm:grid-cols-2">
            <StatCard
              highlight
              label={isTr ? "Hedef FIRE Portföyü (Bugünkü Değer)" : "Your FIRE Number (Today's Money)"}
              value={formatCurrency(result.fireNumberToday, currency, 0)}
              sublabel={`${(100 / Math.max(0.5, swr)).toFixed(1)}× ${isTr ? "yıllık gider" : "annual spending"}`}
            />
            <StatCard
              highlight
              label={isTr ? "Finansal Özgürlük Yaşı" : "Projected FIRE Age"}
              value={
                result.fireAge !== null
                  ? `${result.fireAge} ${isTr ? "Yaş" : "Years Old"}`
                  : isTr
                  ? "75+ (Katkıyı Artırın)"
                  : "75+ (Boost Savings)"
              }
              sublabel={
                result.yearsToFire !== null
                  ? `${result.yearsToFire} ${isTr ? "yıl içinde hedefe ulaşılır" : "years from today"}`
                  : isTr
                  ? "Mevcut parametrelerle süre 35+ yıl"
                  : "Exceeds projection horizon"
              }
            />
            <StatCard
              label={isTr ? "Coast FIRE Eşiği (65 Yaş İçin)" : "Coast FIRE Number (Age 65)"}
              value={formatCurrency(result.coastFireNumberAt65, currency, 0)}
              sublabel={
                savings >= result.coastFireNumberAt65
                  ? isTr
                    ? "Tebrikler! Coast FIRE eşiğini geçtiniz"
                    : "Reached! You are already Coast FIRE"
                  : isTr
                  ? "Ek yatırım yapmadan 65'te emeklilik eşiği"
                  : "Invested today to retire at 65 without adding more"
              }
            />
            <StatCard
              label={isTr ? "Aylık Reel Pasif Gelir" : "Monthly Real Passive Income"}
              value={formatCurrency(result.monthlyPassiveIncomeAtFire, currency, 0)}
              sublabel={`${isTr ? "Yıllık Reel Getiri" : "Real Return"}: ${formatPercent(result.realReturnPct, locale)}`}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
              {isTr
                ? "Reel Portföy Büyümesi vs. FIRE Hedef Çizgisi"
                : "Inflation-Adjusted Portfolio vs. FIRE Target"}
            </h3>
            <AreaLineChart
              labels={chartPoints.map((p) => `${isTr ? "Yaş" : "Age"} ${p.age}`)}
              series={[
                {
                  id: "real",
                  label: isTr ? "Reel Portföy Değeri" : "Real Portfolio Value",
                  color: "#059669",
                  values: chartPoints.map((p) => p.realPortfolio),
                  fillOpacity: 0.14,
                },
                {
                  id: "target",
                  label: isTr ? "FIRE Hedefi" : "FIRE Target",
                  color: "#f59e0b",
                  values: chartPoints.map((p) => p.fireTargetReal),
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

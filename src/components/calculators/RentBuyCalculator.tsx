"use client";

import { useMemo, useState } from "react";
import {
  CalcActionBar,
  CurrencySelector,
  NumberField,
  StatCard,
} from "@/components/calculators/CalcPrimitives";
import { AreaLineChart } from "@/components/charts/AreaLineChart";
import { calculateRentIncrease, calculateRentVsBuy } from "@/lib/calculators";
import { CURRENCY_META, formatCurrency, type CurrencyCode, type Locale } from "@/lib/i18n";

export function RentBuyCalculator({ locale }: { locale: Locale }) {
  const isTr = locale === "tr";
  const [tab, setTab] = useState<"rent-vs-buy" | "increase">(isTr ? "increase" : "rent-vs-buy");
  const [currency, setCurrency] = useState<CurrencyCode>(isTr ? "TRY" : "USD");

  // Rent Increase state
  const [currentRent, setCurrentRent] = useState<number>(isTr ? 25000 : 2200);
  const [tufePct, setTufePct] = useState<number>(isTr ? 42.5 : 4.0);

  // Rent vs Buy state
  const [homePrice, setHomePrice] = useState<number>(isTr ? 4500000 : 420000);
  const [downPct, setDownPct] = useState<number>(20);
  const [mortgageRate, setMortgageRate] = useState<number>(isTr ? 32 : 6.5);
  const [loanYears, setLoanYears] = useState<number>(isTr ? 10 : 30);
  const [monthlyRent, setMonthlyRent] = useState<number>(isTr ? 25000 : 2200);
  const [rentGrowth, setRentGrowth] = useState<number>(isTr ? 28 : 3.5);
  const [homeApprec, setHomeApprec] = useState<number>(isTr ? 28 : 3.5);
  const [investReturn, setInvestReturn] = useState<number>(isTr ? 34 : 7.5);
  const [horizon, setHorizon] = useState<number>(10);

  const incRes = useMemo(
    () => calculateRentIncrease({ currentMonthlyRent: currentRent, increaseRatePct: tufePct }),
    [currentRent, tufePct]
  );

  const rvbRes = useMemo(
    () =>
      calculateRentVsBuy({
        homePrice,
        downPaymentPct: downPct,
        mortgageAnnualRatePct: mortgageRate,
        loanYears,
        monthlyRent,
        annualRentGrowthPct: rentGrowth,
        homeAppreciationPct: homeApprec,
        investmentReturnPct: investReturn,
        annualOwnershipCostPct: 1.5,
        horizonYears: horizon,
      }),
    [homePrice, downPct, mortgageRate, loanYears, monthlyRent, rentGrowth, homeApprec, investReturn, horizon]
  );

  const sym = CURRENCY_META[currency].symbol;
  const priceToRentRatio = monthlyRent > 0 ? homePrice / (monthlyRent * 12) : 0;

  const handleReset = () => {
    setCurrency(isTr ? "TRY" : "USD");
    setCurrentRent(isTr ? 25000 : 2200);
    setTufePct(isTr ? 42.5 : 4.0);
    setHomePrice(isTr ? 4500000 : 420000);
    setDownPct(20);
    setMortgageRate(isTr ? 32 : 6.5);
    setLoanYears(isTr ? 10 : 30);
    setMonthlyRent(isTr ? 25000 : 2200);
    setRentGrowth(isTr ? 28 : 3.5);
    setHomeApprec(isTr ? 28 : 3.5);
    setInvestReturn(isTr ? 34 : 7.5);
    setHorizon(10);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100/80 p-1 dark:border-slate-700 dark:bg-slate-800/80">
            <button
              type="button"
              onClick={() => setTab("increase")}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                tab === "increase"
                  ? "bg-[#0B1F3A] text-white dark:bg-emerald-600"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {isTr ? "Kira Artış Oranı (TÜFE)" : "Rent Increase (CPI / TÜFE)"}
            </button>
            <button
              type="button"
              onClick={() => setTab("rent-vs-buy")}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                tab === "rent-vs-buy"
                  ? "bg-[#0B1F3A] text-white dark:bg-emerald-600"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {isTr ? "Ev Almak mı Kiralamak mı?" : "Rent vs. Buy Simulator"}
            </button>
          </div>
          <CurrencySelector value={currency} onChange={setCurrency} locale={locale} />
        </div>
        <CalcActionBar locale={locale} onReset={handleReset} />
      </div>

      {tab === "increase" ? (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
            <NumberField
              label={isTr ? "Mevcut Aylık Kira Bedeli" : "Current Monthly Rent"}
              value={currentRent}
              onChange={setCurrentRent}
              min={500}
              max={currency === "TRY" ? 250000 : 15000}
              step={currency === "TRY" ? 500 : 50}
              prefix={sym}
              slider
            />
            <NumberField
              label={isTr ? "TÜFE 12 Aylık Ortalama / Zam Oranı (%)" : "Annual Rent Increase Rate (%)"}
              value={tufePct}
              onChange={setTufePct}
              min={0}
              max={100}
              step={0.1}
              suffix="%"
              slider
            />
          </div>

          <div className="grid gap-3 self-start sm:grid-cols-2 lg:col-span-7">
            <StatCard
              highlight
              label={isTr ? "Yeni Aylık Kira Bedeli" : "New Monthly Rent"}
              value={formatCurrency(incRes.newMonthlyRent, currency)}
              sublabel={`+${formatCurrency(incRes.monthlyIncrease, currency)} / ${isTr ? "ay artış" : "mo increase"}`}
            />
            <StatCard
              label={isTr ? "Aylık Artış Tutarı" : "Monthly Increase Amount"}
              value={formatCurrency(incRes.monthlyIncrease, currency)}
            />
            <StatCard
              label={isTr ? "Yeni Yıllık Toplam Kira" : "New Annual Total Rent"}
              value={formatCurrency(incRes.newAnnualRent, currency, 0)}
              sublabel={`${isTr ? "Eski Yıllık" : "Previous Annual"}: ${formatCurrency(incRes.currentAnnualRent, currency, 0)}`}
            />
            <StatCard
              label={isTr ? "12 Aylık Ek Maliyet Farkı" : "12-Month Increase Total"}
              value={formatCurrency(incRes.annualIncrease, currency, 0)}
            />
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
            <NumberField
              label={isTr ? "Konut Satış Fiyatı" : "Home Purchase Price"}
              value={homePrice}
              onChange={setHomePrice}
              min={50000}
              max={currency === "TRY" ? 30000000 : 3000000}
              step={currency === "TRY" ? 100000 : 10000}
              prefix={sym}
              hint={`${isTr ? "Amortisman" : "P/R"}: ${priceToRentRatio.toFixed(1)} ${isTr ? "yıl" : "yrs"}`}
            />
            <div className="grid grid-cols-2 gap-3">
              <NumberField
                label={isTr ? "Peşinat (%)" : "Down Payment (%)"}
                value={downPct}
                onChange={setDownPct}
                min={5}
                max={90}
                suffix="%"
              />
              <NumberField
                label={isTr ? "Yıllık Kredi Faizi (%)" : "Mortgage APR (%)"}
                value={mortgageRate}
                onChange={setMortgageRate}
                min={0}
                max={60}
                step={0.25}
                suffix="%"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <NumberField
                label={isTr ? "Kredi Vadesi (Yıl)" : "Loan Term (Yrs)"}
                value={loanYears}
                onChange={setLoanYears}
                min={1}
                max={30}
              />
              <NumberField
                label={isTr ? "Emsal Aylık Kira" : "Comparable Monthly Rent"}
                value={monthlyRent}
                onChange={setMonthlyRent}
                min={100}
                prefix={sym}
              />
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              <NumberField
                label={isTr ? "Kira Artış %" : "Rent Growth"}
                value={rentGrowth}
                onChange={setRentGrowth}
                min={0}
                max={80}
                step={0.5}
                suffix="%"
              />
              <NumberField
                label={isTr ? "Ev Değer Art. %" : "Home Growth"}
                value={homeApprec}
                onChange={setHomeApprec}
                min={-5}
                max={80}
                step={0.5}
                suffix="%"
              />
              <NumberField
                label={isTr ? "Yatırım Get. %" : "Invest Return"}
                value={investReturn}
                onChange={setInvestReturn}
                min={0}
                max={80}
                step={0.5}
                suffix="%"
              />
            </div>
            <NumberField
              label={isTr ? "Karşılaştırma Süresi (Yıl)" : "Holding Horizon (Years)"}
              value={horizon}
              onChange={setHorizon}
              min={3}
              max={30}
              suffix={isTr ? "yıl" : "yrs"}
              slider
            />
          </div>

          <div className="space-y-5 lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              <StatCard
                highlight
                label={isTr ? `${horizon} Yıl Sonunda Kazanan` : `${horizon}-Year Wealth Winner`}
                value={
                  rvbRes.winner === "buy"
                    ? isTr
                      ? "Satın Almak Avantajlı"
                      : "Buying Wins"
                    : isTr
                    ? "Kiralamak Avantajlı"
                    : "Renting + Investing Wins"
                }
                sublabel={`+${formatCurrency(rvbRes.advantageAmount, currency, 0)} ${isTr ? "net servet farkı" : "ahead in net worth"}`}
              />
              <StatCard
                label={isTr ? "Başabaş Süresi (Ev Lehine)" : "Buy Breakeven Year"}
                value={
                  rvbRes.breakevenYear
                    ? `${rvbRes.breakevenYear}. ${isTr ? "Yıl" : "Year"}`
                    : isTr
                    ? `${horizon} yıl içinde geçmedi`
                    : `Not within ${horizon} yrs`
                }
                sublabel={`${isTr ? "Aylık Kredi" : "Monthly Mortgage"}: ${formatCurrency(rvbRes.monthlyMortgage, currency, 0)}`}
              />
              <StatCard
                label={isTr ? "Ev Sahibi Net Serveti" : "Buyer Net Equity"}
                value={formatCurrency(rvbRes.finalBuyerNetWorth, currency, 0)}
                sublabel={isTr ? "%4 satış maliyeti düşülmüştür" : "Net of 4% selling costs"}
              />
              <StatCard
                label={isTr ? "Kiracı Yatırım Portföyü" : "Renter Investment Portfolio"}
                value={formatCurrency(rvbRes.finalRenterNetWorth, currency, 0)}
                sublabel={`${isTr ? "Peşinat" : "Down Payment"}: ${formatCurrency(rvbRes.downPayment, currency, 0)}`}
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
                {isTr
                  ? "Ev Sahibi vs. Kiracı Net Servet Karşılaştırması"
                  : "Buyer Equity vs. Renter Portfolio Net Worth"}
              </h3>
              <AreaLineChart
                labels={rvbRes.points.map((p) => `${isTr ? "Yıl" : "Yr"} ${p.year}`)}
                series={[
                  {
                    id: "buy",
                    label: isTr ? "Ev Sahibi Net Servet" : "Buyer Net Worth",
                    color: "#059669",
                    values: rvbRes.points.map((p) => p.buyerNetWorth),
                    fillOpacity: 0.1,
                  },
                  {
                    id: "rent",
                    label: isTr ? "Kiracı Yatırım Portföyü" : "Renter Portfolio",
                    color: "#0284c7",
                    values: rvbRes.points.map((p) => p.renterNetWorth),
                  },
                ]}
                formatY={(v) => formatCurrency(v, currency, 0)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

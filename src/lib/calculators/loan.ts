export interface LoanInput {
  principal: number;
  ratePct: number;
  ratePeriod: "annual" | "monthly";
  termMonths: number;
  kkdfPct?: number; // TR Personal loan: 15%, Mortgage: 0%
  bsmvPct?: number; // TR Personal loan: 15%, Mortgage: 0%
  extraMonthlyPayment?: number;
  monthlyEscrow?: number; // Optional property tax + insurance + PMI
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  taxOnInterest: number;
  extraPaid: number;
  remainingBalance: number;
}

export interface YearlyAmortization {
  year: number;
  principalPaid: number;
  interestAndTaxPaid: number;
  remainingBalance: number;
}

export interface LoanResult {
  monthlyPrincipalInterest: number;
  monthlyTotalOutflow: number;
  effectiveMonthlyRatePct: number;
  effectiveAnnualAprPct: number;
  totalPayment: number;
  totalInterestAndTax: number;
  totalTaxOnInterest: number;
  actualMonths: number;
  monthsSaved: number;
  interestSaved: number;
  schedule: AmortizationRow[];
  yearly: YearlyAmortization[];
}

function runAmortization(
  principal: number,
  baseMonthlyRate: number,
  taxMultiplier: number,
  termMonths: number,
  extraPayment: number
) {
  const effectiveMonthlyRate = baseMonthlyRate * (1 + taxMultiplier);
  let basePayment = 0;

  if (effectiveMonthlyRate <= 0) {
    basePayment = principal / termMonths;
  } else {
    const pow = Math.pow(1 + effectiveMonthlyRate, termMonths);
    basePayment = (principal * effectiveMonthlyRate * pow) / (pow - 1);
  }

  const schedule: AmortizationRow[] = [];
  let balance = principal;
  let totalInterestAndTax = 0;
  let totalTaxOnInterest = 0;
  let totalPayment = 0;

  for (let m = 1; m <= termMonths && balance > 0.005; m++) {
    const rawInterest = balance * baseMonthlyRate;
    const taxOnInterest = rawInterest * taxMultiplier;
    const combinedInterest = rawInterest + taxOnInterest;

    let scheduledPrincipal = basePayment - combinedInterest;
    if (scheduledPrincipal < 0) scheduledPrincipal = 0;

    let extraPaid = extraPayment;
    if (scheduledPrincipal + extraPaid > balance) {
      if (scheduledPrincipal >= balance) {
        scheduledPrincipal = balance;
        extraPaid = 0;
      } else {
        extraPaid = balance - scheduledPrincipal;
      }
    }

    const totalPrincipalPaid = scheduledPrincipal + extraPaid;
    const payment = totalPrincipalPaid + combinedInterest;
    balance = Math.max(0, balance - totalPrincipalPaid);

    totalInterestAndTax += combinedInterest;
    totalTaxOnInterest += taxOnInterest;
    totalPayment += payment;

    schedule.push({
      month: m,
      payment,
      principalPaid: totalPrincipalPaid,
      interestPaid: rawInterest,
      taxOnInterest,
      extraPaid,
      remainingBalance: balance,
    });
  }

  return { basePayment, effectiveMonthlyRate, schedule, totalPayment, totalInterestAndTax, totalTaxOnInterest };
}

export function calculateLoan(input: LoanInput): LoanResult {
  const principal = Math.max(1, input.principal);
  const termMonths = Math.max(1, Math.min(600, Math.round(input.termMonths)));
  const ratePct = Math.max(0, input.ratePct);
  const baseMonthlyRate = input.ratePeriod === "monthly" ? ratePct / 100 : ratePct / 100 / 12;
  const taxMultiplier = (Math.max(0, input.kkdfPct || 0) + Math.max(0, input.bsmvPct || 0)) / 100;
  const extraPayment = Math.max(0, input.extraMonthlyPayment || 0);
  const monthlyEscrow = Math.max(0, input.monthlyEscrow || 0);

  const baseline = runAmortization(principal, baseMonthlyRate, taxMultiplier, termMonths, 0);
  const actual =
    extraPayment > 0
      ? runAmortization(principal, baseMonthlyRate, taxMultiplier, termMonths, extraPayment)
      : baseline;

  const yearlyMap = new Map<number, YearlyAmortization>();
  for (const row of actual.schedule) {
    const year = Math.ceil(row.month / 12);
    const existing = yearlyMap.get(year) || {
      year,
      principalPaid: 0,
      interestAndTaxPaid: 0,
      remainingBalance: row.remainingBalance,
    };
    existing.principalPaid += row.principalPaid;
    existing.interestAndTaxPaid += row.interestPaid + row.taxOnInterest;
    existing.remainingBalance = row.remainingBalance;
    yearlyMap.set(year, existing);
  }

  const effectiveAnnualAprPct = (Math.pow(1 + actual.effectiveMonthlyRate, 12) - 1) * 100;

  return {
    monthlyPrincipalInterest: actual.basePayment,
    monthlyTotalOutflow: actual.basePayment + extraPayment + monthlyEscrow,
    effectiveMonthlyRatePct: actual.effectiveMonthlyRate * 100,
    effectiveAnnualAprPct,
    totalPayment: actual.totalPayment,
    totalInterestAndTax: actual.totalInterestAndTax,
    totalTaxOnInterest: actual.totalTaxOnInterest,
    actualMonths: actual.schedule.length,
    monthsSaved: Math.max(0, baseline.schedule.length - actual.schedule.length),
    interestSaved: Math.max(0, baseline.totalInterestAndTax - actual.totalInterestAndTax),
    schedule: actual.schedule,
    yearly: Array.from(yearlyMap.values()),
  };
}

export type CompoundFrequency = "monthly" | "quarterly" | "semiannual" | "annual";

export interface CompoundInput {
  initialPrincipal: number;
  monthlyContribution: number;
  annualRatePct: number;
  years: number;
  frequency: CompoundFrequency;
  annualInflationPct?: number;
}

export interface CompoundYearRow {
  year: number;
  totalContributions: number;
  totalInterest: number;
  nominalBalance: number;
  realBalance: number;
}

export interface CompoundResult {
  finalNominalBalance: number;
  finalRealBalance: number;
  totalContributions: number;
  totalInterestEarned: number;
  totalReturnPct: number;
  yearly: CompoundYearRow[];
}

const FREQ_PER_YEAR: Record<CompoundFrequency, number> = {
  monthly: 12,
  quarterly: 4,
  semiannual: 2,
  annual: 1,
};

export function calculateCompound(input: CompoundInput): CompoundResult {
  const initial = Math.max(0, input.initialPrincipal);
  const monthly = Math.max(0, input.monthlyContribution);
  const annualRate = Math.max(0, input.annualRatePct) / 100;
  const years = Math.max(1, Math.min(60, Math.round(input.years)));
  const inflation = Math.max(0, input.annualInflationPct || 0) / 100;
  const periodsPerYear = FREQ_PER_YEAR[input.frequency];
  const monthsPerPeriod = 12 / periodsPerYear;
  const periodRate = annualRate / periodsPerYear;

  let balance = initial;
  let totalContributions = initial;
  const yearly: CompoundYearRow[] = [];

  for (let y = 1; y <= years; y++) {
    let accruedInPeriod = 0;
    for (let m = 1; m <= 12; m++) {
      balance += monthly;
      totalContributions += monthly;
      accruedInPeriod += 1;
      if (accruedInPeriod >= monthsPerPeriod) {
        balance *= 1 + periodRate;
        accruedInPeriod = 0;
      }
    }
    const realBalance = inflation > 0 ? balance / Math.pow(1 + inflation, y) : balance;
    yearly.push({
      year: y,
      totalContributions,
      totalInterest: Math.max(0, balance - totalContributions),
      nominalBalance: balance,
      realBalance,
    });
  }

  const last = yearly[yearly.length - 1];
  return {
    finalNominalBalance: last.nominalBalance,
    finalRealBalance: last.realBalance,
    totalContributions: last.totalContributions,
    totalInterestEarned: last.totalInterest,
    totalReturnPct:
      last.totalContributions > 0 ? (last.totalInterest / last.totalContributions) * 100 : 0,
    yearly,
  };
}

export interface FireInput {
  currentAge: number;
  currentSavings: number;
  monthlyContribution: number;
  annualRetirementExpenses: number;
  expectedReturnPct: number;
  inflationPct: number;
  safeWithdrawalRatePct: number; // e.g., 4%
}

export interface FireYearPoint {
  age: number;
  year: number;
  nominalPortfolio: number;
  realPortfolio: number;
  fireTargetReal: number;
}

export interface FireResult {
  fireNumberToday: number;
  realReturnPct: number;
  yearsToFire: number | null;
  fireAge: number | null;
  coastFireNumberAt65: number;
  monthlyPassiveIncomeAtFire: number;
  points: FireYearPoint[];
}

export function calculateFire(input: FireInput): FireResult {
  const currentAge = Math.max(18, Math.min(75, Math.round(input.currentAge)));
  const currentSavings = Math.max(0, input.currentSavings);
  const monthlyContribution = Math.max(0, input.monthlyContribution);
  const annualExpenses = Math.max(1, input.annualRetirementExpenses);
  const nominalRate = Math.max(0, input.expectedReturnPct) / 100;
  const inflationRate = Math.max(0, input.inflationPct) / 100;
  const swr = Math.max(1, Math.min(10, input.safeWithdrawalRatePct)) / 100;

  const fireNumberToday = annualExpenses / swr;
  const realReturn = (1 + nominalRate) / (1 + inflationRate) - 1;
  const realMonthlyRate = Math.pow(1 + realReturn, 1 / 12) - 1;
  const nominalMonthlyRate = Math.pow(1 + nominalRate, 1 / 12) - 1;

  const yearsTo65 = Math.max(0, 65 - currentAge);
  const coastFireNumberAt65 =
    realReturn > 0 ? fireNumberToday / Math.pow(1 + realReturn, yearsTo65) : fireNumberToday;

  const maxYears = Math.max(35, 75 - currentAge);
  let realBalance = currentSavings;
  let nominalBalance = currentSavings;
  let yearsToFire: number | null = realBalance >= fireNumberToday ? 0 : null;

  const points: FireYearPoint[] = [
    {
      age: currentAge,
      year: 0,
      nominalPortfolio: currentSavings,
      realPortfolio: currentSavings,
      fireTargetReal: fireNumberToday,
    },
  ];

  for (let y = 1; y <= maxYears; y++) {
    for (let m = 0; m < 12; m++) {
      realBalance = realBalance * (1 + realMonthlyRate) + monthlyContribution;
      nominalBalance =
        nominalBalance * (1 + nominalMonthlyRate) +
        monthlyContribution * Math.pow(1 + inflationRate, y - 1);
    }

    if (yearsToFire === null && realBalance >= fireNumberToday) {
      yearsToFire = y;
    }

    points.push({
      age: currentAge + y,
      year: y,
      nominalPortfolio: nominalBalance,
      realPortfolio: realBalance,
      fireTargetReal: fireNumberToday,
    });
  }

  return {
    fireNumberToday,
    realReturnPct: realReturn * 100,
    yearsToFire,
    fireAge: yearsToFire !== null ? currentAge + yearsToFire : null,
    coastFireNumberAt65,
    monthlyPassiveIncomeAtFire: (fireNumberToday * swr) / 12,
    points,
  };
}

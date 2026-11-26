import { TR_2026_CONSTANTS } from "@/config/site";

export interface TrMonthlyRow {
  month: number;
  gross: number;
  sgkEmployee: number;
  unemploymentEmployee: number;
  incomeTaxBase: number;
  cumulativeTaxBase: number;
  rawIncomeTax: number;
  incomeTaxExemption: number;
  payableIncomeTax: number;
  stampTax: number;
  stampTaxExemption: number;
  payableStampTax: number;
  net: number;
  employerCost: number;
  marginalRate: number;
}

export interface TrSalaryResult {
  months: TrMonthlyRow[];
  annualGross: number;
  annualNet: number;
  averageMonthlyNet: number;
  averageMonthlyGross: number;
  annualSgkEmployee: number;
  annualIncomeTax: number;
  annualStampTax: number;
  annualEmployerCost: number;
  effectiveDeductionRate: number;
}

function calcProgressiveTax(prevCum: number, nextCum: number): { tax: number; topRate: number } {
  let tax = 0;
  let topRate: number = TR_2026_CONSTANTS.incomeTaxBrackets[0].rate;
  let lower = 0;

  for (const bracket of TR_2026_CONSTANTS.incomeTaxBrackets) {
    const upper = bracket.limit;
    const overlapStart = Math.max(prevCum, lower);
    const overlapEnd = Math.min(nextCum, upper);
    if (overlapEnd > overlapStart) {
      tax += (overlapEnd - overlapStart) * bracket.rate;
      topRate = bracket.rate;
    }
    lower = upper;
    if (nextCum <= upper) break;
  }

  return { tax, topRate };
}

function getMinWageMonthlyExemption(monthIndex: number): {
  incomeTaxExemption: number;
  stampTaxExemption: number;
} {
  const minBase =
    TR_2026_CONSTANTS.minWageGross *
    (1 - TR_2026_CONSTANTS.sgkEmployeeRate - TR_2026_CONSTANTS.unemploymentEmployeeRate);
  const prevMinCum = minBase * monthIndex;
  const nextMinCum = prevMinCum + minBase;
  const { tax } = calcProgressiveTax(prevMinCum, nextMinCum);
  const stampTaxExemption = TR_2026_CONSTANTS.minWageGross * TR_2026_CONSTANTS.stampTaxRate;
  return { incomeTaxExemption: tax, stampTaxExemption };
}

function computeSingleMonthFromGross(
  gross: number,
  monthIndex: number,
  prevCumBase: number,
  applyMinWageExemption: boolean,
  applyEmployerIncentive: boolean
): TrMonthlyRow {
  const sgkBase = Math.min(gross, TR_2026_CONSTANTS.sgkUpperCapMonthly);
  const sgkEmployee = sgkBase * TR_2026_CONSTANTS.sgkEmployeeRate;
  const unemploymentEmployee = sgkBase * TR_2026_CONSTANTS.unemploymentEmployeeRate;
  const incomeTaxBase = Math.max(0, gross - sgkEmployee - unemploymentEmployee);
  const cumulativeTaxBase = prevCumBase + incomeTaxBase;

  const { tax: rawIncomeTax, topRate } = calcProgressiveTax(prevCumBase, cumulativeTaxBase);
  const stampTax = gross * TR_2026_CONSTANTS.stampTaxRate;

  let incomeTaxExemption = 0;
  let stampTaxExemption = 0;

  if (applyMinWageExemption) {
    const ex = getMinWageMonthlyExemption(monthIndex);
    incomeTaxExemption = Math.min(rawIncomeTax, ex.incomeTaxExemption);
    stampTaxExemption = Math.min(stampTax, ex.stampTaxExemption);
  }

  const payableIncomeTax = Math.max(0, rawIncomeTax - incomeTaxExemption);
  const payableStampTax = Math.max(0, stampTax - stampTaxExemption);
  const net = gross - sgkEmployee - unemploymentEmployee - payableIncomeTax - payableStampTax;

  const employerSgkRate = applyEmployerIncentive
    ? TR_2026_CONSTANTS.sgkEmployerIncentiveRate
    : TR_2026_CONSTANTS.sgkEmployerRate;
  const employerCost =
    gross + sgkBase * (employerSgkRate + TR_2026_CONSTANTS.unemploymentEmployerRate);

  return {
    month: monthIndex + 1,
    gross,
    sgkEmployee,
    unemploymentEmployee,
    incomeTaxBase,
    cumulativeTaxBase,
    rawIncomeTax,
    incomeTaxExemption,
    payableIncomeTax,
    stampTax,
    stampTaxExemption,
    payableStampTax,
    net,
    employerCost,
    marginalRate: topRate * 100,
  };
}

export function calculateTrSalary(options: {
  mode: "gross-to-net" | "net-to-gross";
  monthlyAmount: number;
  applyMinWageExemption?: boolean;
  applyEmployerIncentive?: boolean;
}): TrSalaryResult {
  const {
    mode,
    monthlyAmount,
    applyMinWageExemption = true,
    applyEmployerIncentive = true,
  } = options;
  const safeAmount = Math.max(0, monthlyAmount);
  const months: TrMonthlyRow[] = [];
  let cumBase = 0;

  for (let m = 0; m < 12; m++) {
    let row: TrMonthlyRow;
    if (mode === "gross-to-net") {
      row = computeSingleMonthFromGross(
        safeAmount,
        m,
        cumBase,
        applyMinWageExemption,
        applyEmployerIncentive
      );
    } else {
      // Binary search gross for target monthly net
      let low = safeAmount;
      let high = Math.max(safeAmount * 2.5, 1000);
      while (
        computeSingleMonthFromGross(high, m, cumBase, applyMinWageExemption, applyEmployerIncentive)
          .net < safeAmount
      ) {
        high *= 1.5;
        if (high > 1e9) break;
      }
      for (let i = 0; i < 48; i++) {
        const mid = (low + high) / 2;
        const guess = computeSingleMonthFromGross(
          mid,
          m,
          cumBase,
          applyMinWageExemption,
          applyEmployerIncentive
        );
        if (guess.net < safeAmount) {
          low = mid;
        } else {
          high = mid;
        }
      }
      row = computeSingleMonthFromGross(
        (low + high) / 2,
        m,
        cumBase,
        applyMinWageExemption,
        applyEmployerIncentive
      );
    }
    cumBase = row.cumulativeTaxBase;
    months.push(row);
  }

  const annualGross = months.reduce((s, r) => s + r.gross, 0);
  const annualNet = months.reduce((s, r) => s + r.net, 0);
  const annualSgkEmployee = months.reduce((s, r) => s + r.sgkEmployee + r.unemploymentEmployee, 0);
  const annualIncomeTax = months.reduce((s, r) => s + r.payableIncomeTax, 0);
  const annualStampTax = months.reduce((s, r) => s + r.payableStampTax, 0);
  const annualEmployerCost = months.reduce((s, r) => s + r.employerCost, 0);

  return {
    months,
    annualGross,
    annualNet,
    averageMonthlyNet: annualNet / 12,
    averageMonthlyGross: annualGross / 12,
    annualSgkEmployee,
    annualIncomeTax,
    annualStampTax,
    annualEmployerCost,
    effectiveDeductionRate: annualGross > 0 ? ((annualGross - annualNet) / annualGross) * 100 : 0,
  };
}

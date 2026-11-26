export interface InflationInput {
  amount: number;
  annualInflationPct: number;
  years: number;
}

export interface InflationYearPoint {
  year: number;
  equivalentFutureCost: number;
  purchasingPowerOfCash: number;
}

export interface InflationResult {
  equivalentFutureCost: number;
  purchasingPowerOfCash: number;
  cumulativeInflationPct: number;
  purchasingPowerLossPct: number;
  points: InflationYearPoint[];
}

export function calculateInflation(input: InflationInput): InflationResult {
  const amount = Math.max(0, input.amount);
  const rate = Math.max(0, input.annualInflationPct) / 100;
  const years = Math.max(1, Math.min(50, Math.round(input.years)));

  const points: InflationYearPoint[] = [];
  for (let y = 0; y <= years; y++) {
    const factor = Math.pow(1 + rate, y);
    points.push({
      year: y,
      equivalentFutureCost: amount * factor,
      purchasingPowerOfCash: factor > 0 ? amount / factor : amount,
    });
  }

  const last = points[points.length - 1];
  const cumulativeInflationPct = (Math.pow(1 + rate, years) - 1) * 100;
  const purchasingPowerLossPct =
    amount > 0 ? ((amount - last.purchasingPowerOfCash) / amount) * 100 : 0;

  return {
    equivalentFutureCost: last.equivalentFutureCost,
    purchasingPowerOfCash: last.purchasingPowerOfCash,
    cumulativeInflationPct,
    purchasingPowerLossPct,
    points,
  };
}

export interface VatInput {
  amount: number;
  vatRatePct: number;
  mode: "exclusive" | "inclusive";
  tevkifatRatio: number; // 0 to 1 (e.g., 0, 0.2, 0.5, 0.7, 0.9)
}

export interface VatResult {
  netBase: number;
  totalVat: number;
  grossTotal: number;
  withheldVat: number;
  sellerPayableVat: number;
  invoicePayableTotal: number;
}

export function calculateVat(input: VatInput): VatResult {
  const amount = Math.max(0, input.amount);
  const rate = Math.max(0, input.vatRatePct) / 100;
  const tevkifat = Math.max(0, Math.min(1, input.tevkifatRatio));

  const netBase = input.mode === "exclusive" ? amount : amount / (1 + rate);
  const totalVat = netBase * rate;
  const grossTotal = netBase + totalVat;
  const withheldVat = totalVat * tevkifat;
  const sellerPayableVat = totalVat - withheldVat;
  const invoicePayableTotal = netBase + sellerPayableVat;

  return {
    netBase,
    totalVat,
    grossTotal,
    withheldVat,
    sellerPayableVat,
    invoicePayableTotal,
  };
}

export interface FreelanceInput {
  targetAnnualNet: number;
  annualExpenses: number;
  effectiveTaxRatePct: number;
  billableWeeksPerYear: number;
  billableHoursPerWeek: number;
}

export interface FreelanceResult {
  requiredAnnualGross: number;
  estimatedAnnualTaxes: number;
  totalBillableHours: number;
  hourlyRate: number;
  dailyRate: number;
  monthlyBilling: number;
}

export function calculateFreelanceRate(input: FreelanceInput): FreelanceResult {
  const targetNet = Math.max(0, input.targetAnnualNet);
  const expenses = Math.max(0, input.annualExpenses);
  const taxRate = Math.max(0, Math.min(75, input.effectiveTaxRatePct)) / 100;
  const weeks = Math.max(1, Math.min(52, input.billableWeeksPerYear));
  const hoursPerWeek = Math.max(1, Math.min(80, input.billableHoursPerWeek));

  const preTaxProfitNeeded = targetNet / (1 - taxRate);
  const requiredAnnualGross = preTaxProfitNeeded + expenses;
  const estimatedAnnualTaxes = preTaxProfitNeeded - targetNet;
  const totalBillableHours = weeks * hoursPerWeek;
  const hourlyRate = requiredAnnualGross / totalBillableHours;

  return {
    requiredAnnualGross,
    estimatedAnnualTaxes,
    totalBillableHours,
    hourlyRate,
    dailyRate: hourlyRate * 8,
    monthlyBilling: requiredAnnualGross / 12,
  };
}

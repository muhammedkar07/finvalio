import { US_2026_CONSTANTS } from "@/config/site";

export type UsFilingStatus = "single" | "married" | "hoh";

export interface UsSalaryInput {
  annualGross: number;
  filingStatus: UsFilingStatus;
  retirement401kPct: number;
  healthInsuranceAnnual: number;
  stateTaxRatePct: number;
}

export interface UsSalaryResult {
  annualGross: number;
  preTax401k: number;
  preTaxHealth: number;
  standardDeduction: number;
  federalTaxableIncome: number;
  federalTax: number;
  marginalFederalRate: number;
  effectiveFederalRate: number;
  socialSecurityTax: number;
  medicareTax: number;
  stateTax: number;
  totalTaxes: number;
  annualNet: number;
  monthlyNet: number;
  biweeklyNet: number;
  weeklyNet: number;
  hourlyNet: number;
  effectiveTotalTaxRate: number;
}

export function calculateUsSalary(input: UsSalaryInput): UsSalaryResult {
  const gross = Math.max(0, input.annualGross);
  const preTax401k = Math.min(gross, gross * (Math.max(0, Math.min(100, input.retirement401kPct)) / 100));
  const preTaxHealth = Math.min(Math.max(0, gross - preTax401k), Math.max(0, input.healthInsuranceAnnual));
  const standardDeduction = US_2026_CONSTANTS.standardDeduction[input.filingStatus];

  const federalTaxableIncome = Math.max(0, gross - preTax401k - preTaxHealth - standardDeduction);

  const brackets = US_2026_CONSTANTS.brackets[input.filingStatus];
  let federalTax = 0;
  let lower = 0;
  let marginalRate: number = brackets[0].rate;

  for (const b of brackets) {
    if (federalTaxableIncome > lower) {
      const taxableInBracket = Math.min(federalTaxableIncome, b.limit) - lower;
      federalTax += taxableInBracket * b.rate;
      marginalRate = b.rate;
    }
    lower = b.limit;
    if (federalTaxableIncome <= b.limit) break;
  }

  // FICA (401k is subject to FICA; Sec. 125 health premiums are exempt)
  const ficaWages = Math.max(0, gross - preTaxHealth);
  const socialSecurityTax =
    Math.min(ficaWages, US_2026_CONSTANTS.socialSecurityWageBase) *
    US_2026_CONSTANTS.socialSecurityRate;

  const addMedThreshold = US_2026_CONSTANTS.additionalMedicareThreshold[input.filingStatus];
  const medicareTax =
    ficaWages * US_2026_CONSTANTS.medicareRate +
    Math.max(0, ficaWages - addMedThreshold) * US_2026_CONSTANTS.additionalMedicareRate;

  const stateTaxable = Math.max(0, gross - preTax401k - preTaxHealth);
  const stateTax = stateTaxable * (Math.max(0, Math.min(20, input.stateTaxRatePct)) / 100);

  const totalTaxes = federalTax + socialSecurityTax + medicareTax + stateTax;
  const annualNet = Math.max(0, gross - preTax401k - preTaxHealth - totalTaxes);

  return {
    annualGross: gross,
    preTax401k,
    preTaxHealth,
    standardDeduction,
    federalTaxableIncome,
    federalTax,
    marginalFederalRate: marginalRate * 100,
    effectiveFederalRate: gross > 0 ? (federalTax / gross) * 100 : 0,
    socialSecurityTax,
    medicareTax,
    stateTax,
    totalTaxes,
    annualNet,
    monthlyNet: annualNet / 12,
    biweeklyNet: annualNet / 26,
    weeklyNet: annualNet / 52,
    hourlyNet: annualNet / 2080,
    effectiveTotalTaxRate: gross > 0 ? (totalTaxes / gross) * 100 : 0,
  };
}

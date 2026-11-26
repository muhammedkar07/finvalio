import { TR_2026_CONSTANTS } from "@/config/site";

export interface TrSeveranceInput {
  years: number;
  months: number;
  days: number;
  monthlyGrossSalary: number;
  monthlyExtras: number; // Yol, yemek, düzenli ikramiye aylık karşılığı
  severanceCap?: number; // Default: 2026 H2 73,729.87 TL
  noticeTaxBracketPct: number; // 15, 20, 27, 35, 40
}

export interface TrSeveranceResult {
  totalDays: number;
  totalYearsDecimal: number;
  dressedGross: number;
  appliedCap: number;
  isCapApplied: boolean;
  eligibleForSeverance: boolean;
  grossSeverance: number;
  severanceStampTax: number;
  netSeverance: number;
  noticeWeeks: number;
  noticeDays: number;
  grossNotice: number;
  noticeIncomeTax: number;
  noticeStampTax: number;
  netNotice: number;
  totalNetPayout: number;
}

export function calculateTrSeverance(input: TrSeveranceInput): TrSeveranceResult {
  const totalDays = Math.max(
    0,
    Math.round(input.years) * 365 + Math.round(input.months) * 30 + Math.round(input.days)
  );
  const totalYearsDecimal = totalDays / 365;
  const dressedGross = Math.max(0, input.monthlyGrossSalary) + Math.max(0, input.monthlyExtras);
  const appliedCap = input.severanceCap || TR_2026_CONSTANTS.defaultSeveranceCap;
  const eligibleForSeverance = totalDays >= 365;

  const severanceBase = Math.min(dressedGross, appliedCap);
  const isCapApplied = dressedGross > appliedCap;

  const grossSeverance = eligibleForSeverance ? severanceBase * (totalDays / 365) : 0;
  const severanceStampTax = grossSeverance * TR_2026_CONSTANTS.stampTaxRate;
  const netSeverance = grossSeverance - severanceStampTax;

  // İş Kanunu Md. 17 İhbar Süreleri
  let noticeWeeks = 2;
  if (totalDays >= 3 * 365) {
    noticeWeeks = 8;
  } else if (totalDays >= 540) {
    // 1.5 yıl (18 ay)
    noticeWeeks = 6;
  } else if (totalDays >= 180) {
    // 6 ay
    noticeWeeks = 4;
  }
  const noticeDays = noticeWeeks * 7;
  const grossNotice = (dressedGross / 30) * noticeDays;
  const noticeIncomeTax = grossNotice * (Math.max(0, Math.min(45, input.noticeTaxBracketPct)) / 100);
  const noticeStampTax = grossNotice * TR_2026_CONSTANTS.stampTaxRate;
  const netNotice = Math.max(0, grossNotice - noticeIncomeTax - noticeStampTax);

  return {
    totalDays,
    totalYearsDecimal,
    dressedGross,
    appliedCap,
    isCapApplied,
    eligibleForSeverance,
    grossSeverance,
    severanceStampTax,
    netSeverance,
    noticeWeeks,
    noticeDays,
    grossNotice,
    noticeIncomeTax,
    noticeStampTax,
    netNotice,
    totalNetPayout: netSeverance + netNotice,
  };
}

export interface GlobalSeveranceInput {
  annualSalary: number;
  yearsOfService: number;
  weeksPerYear: number;
  unusedPtoDays: number;
  taxWithholdingPct: number;
}

export interface GlobalSeveranceResult {
  weeklyPay: number;
  severanceWeeks: number;
  grossSeverance: number;
  ptoPayout: number;
  totalGrossPackage: number;
  estimatedTaxes: number;
  totalNetPackage: number;
}

export function calculateGlobalSeverance(input: GlobalSeveranceInput): GlobalSeveranceResult {
  const annual = Math.max(0, input.annualSalary);
  const weeklyPay = annual / 52;
  const dailyPay = annual / 260;
  const severanceWeeks = Math.max(0, input.yearsOfService) * Math.max(0, input.weeksPerYear);
  const grossSeverance = weeklyPay * severanceWeeks;
  const ptoPayout = dailyPay * Math.max(0, input.unusedPtoDays);
  const totalGrossPackage = grossSeverance + ptoPayout;
  const estimatedTaxes =
    totalGrossPackage * (Math.max(0, Math.min(60, input.taxWithholdingPct)) / 100);
  const totalNetPackage = Math.max(0, totalGrossPackage - estimatedTaxes);

  return {
    weeklyPay,
    severanceWeeks,
    grossSeverance,
    ptoPayout,
    totalGrossPackage,
    estimatedTaxes,
    totalNetPackage,
  };
}

import assert from "node:assert/strict";
import {
  calculateTrSalary,
  calculateUsSalary,
  calculateLoan,
  calculateCompound,
  calculateDeposit,
  calculateTrSeverance,
  calculateGlobalSeverance,
  calculateFire,
  calculateRentIncrease,
  calculateRentVsBuy,
  calculateInflation,
  calculateVat,
  calculateFreelanceRate,
} from "../src/lib/calculators";

function approx(actual: number, expected: number, tol = 0.05, label = "") {
  assert.ok(
    Math.abs(actual - expected) <= tol,
    `${label}: expected ~${expected}, got ${actual} (diff ${Math.abs(actual - expected)})`
  );
}

// 1. TR 2026 Minimum Wage exact match across all 12 months
const trMinWage = calculateTrSalary({ mode: "gross-to-net", monthlyAmount: 33030 });
for (const row of trMinWage.months) {
  approx(row.net, 28075.5, 0.02, `TR 2026 Min Wage Month ${row.month}`);
  approx(row.payableIncomeTax, 0, 0.01, `TR 2026 Min Wage Tax Month ${row.month}`);
  approx(row.payableStampTax, 0, 0.01, `TR 2026 Min Wage Stamp Month ${row.month}`);
}

// 2. TR Net-to-Gross solver exact round-trip accuracy
const trNetTarget = calculateTrSalary({ mode: "net-to-gross", monthlyAmount: 65000 });
for (const row of trNetTarget.months) {
  approx(row.net, 65000, 0.05, `TR Net-to-Gross Month ${row.month}`);
}

// 3. US 2026 Federal Salary + FICA check
const us = calculateUsSalary({
  annualGross: 95000,
  filingStatus: "single",
  retirement401kPct: 6,
  healthInsuranceAnnual: 0,
  stateTaxRatePct: 5,
});
approx(us.federalTaxableIncome, 73200, 0.01, "US 2026 Taxable Income");
approx(us.federalTax, 10816, 0.05, "US 2026 Federal Tax");
approx(us.socialSecurityTax, 5890, 0.05, "US 2026 SS Tax");
approx(us.medicareTax, 1377.5, 0.05, "US 2026 Medicare Tax");

// 4. US 2026 SS Cap check ($250k gross -> SS capped at $184,500 * 6.2% = $11,439)
const usHigh = calculateUsSalary({
  annualGross: 250000,
  filingStatus: "single",
  retirement401kPct: 0,
  healthInsuranceAnnual: 0,
  stateTaxRatePct: 0,
});
approx(usHigh.socialSecurityTax, 11439, 0.01, "US 2026 SS Cap");

// 5. Loan amortization & extra payment savings
const loan = calculateLoan({
  principal: 350000,
  ratePct: 6.5,
  ratePeriod: "annual",
  termMonths: 360,
  extraMonthlyPayment: 250,
});
approx(loan.monthlyPrincipalInterest, 2212.24, 0.1, "30yr Mortgage P&I");
assert.ok(loan.monthsSaved >= 80 && loan.interestSaved > 120000, "Extra payment savings");

// 6. TR Consumer Loan with 15% KKDF + 15% BSMV
const trLoan = calculateLoan({
  principal: 250000,
  ratePct: 3.49,
  ratePeriod: "monthly",
  termMonths: 24,
  kkdfPct: 15,
  bsmvPct: 15,
});
approx(trLoan.effectiveMonthlyRatePct, 4.537, 0.001, "TR Effective Monthly Rate");
assert.ok(trLoan.totalTaxOnInterest > 35000, "TR KKDF+BSMV Tax");

// 7. Compound Interest & Real Value
const comp = calculateCompound({
  initialPrincipal: 10000,
  monthlyContribution: 500,
  annualRatePct: 8,
  years: 20,
  frequency: "monthly",
  annualInflationPct: 2.5,
});
assert.ok(comp.finalNominalBalance > 340000 && comp.finalRealBalance < comp.finalNominalBalance);

// 8. TR Deposit 32-day net interest
const dep = calculateDeposit({
  principal: 500000,
  annualRatePct: 42,
  termDays: 32,
  withholdingTaxPct: 15,
  renewalCycles: 1,
});
approx(dep.firstTermGrossInterest, 18410.96, 0.05, "TR 32d Gross Deposit");
approx(dep.firstTermNetInterest, 15649.32, 0.05, "TR 32d Net Deposit");

// 9. TR 2026 Severance Cap check
const sev = calculateTrSeverance({
  years: 5,
  months: 0,
  days: 0,
  monthlyGrossSalary: 120000, // exceeds H2 2026 cap 73,729.87
  monthlyExtras: 0,
  noticeTaxBracketPct: 27,
});
assert.equal(sev.isCapApplied, true);
approx(sev.grossSeverance, 73729.87 * 5, 0.05, "TR 2026 Severance Cap");
assert.equal(sev.noticeWeeks, 8);

// 10. Global Severance + FIRE + Rent/Buy + Inflation/VAT/Freelance
const gSev = calculateGlobalSeverance({
  annualSalary: 110000,
  yearsOfService: 6,
  weeksPerYear: 2,
  unusedPtoDays: 10,
  taxWithholdingPct: 28,
});
assert.ok(gSev.totalNetPackage > 20000);

const fire = calculateFire({
  currentAge: 32,
  currentSavings: 80000,
  monthlyContribution: 2000,
  annualRetirementExpenses: 52000,
  expectedReturnPct: 8,
  inflationPct: 2.5,
  safeWithdrawalRatePct: 4,
});
approx(fire.fireNumberToday, 1300000, 1, "FIRE Number");
assert.ok(fire.fireAge !== null && fire.fireAge < 60);

const rentInc = calculateRentIncrease({ currentMonthlyRent: 25000, increaseRatePct: 45 });
approx(rentInc.newMonthlyRent, 36250, 0.01, "Rent Increase");

const rvb = calculateRentVsBuy({
  homePrice: 420000,
  downPaymentPct: 20,
  mortgageAnnualRatePct: 6.5,
  loanYears: 30,
  monthlyRent: 2200,
  annualRentGrowthPct: 3.5,
  homeAppreciationPct: 3.5,
  investmentReturnPct: 7.5,
  annualOwnershipCostPct: 1.5,
  horizonYears: 10,
});
assert.equal(rvb.points.length, 10);

const inf = calculateInflation({ amount: 100000, annualInflationPct: 25, years: 5 });
assert.ok(inf.purchasingPowerOfCash < 35000);

const vat = calculateVat({ amount: 100000, vatRatePct: 20, mode: "exclusive", tevkifatRatio: 0.5 });
approx(vat.invoicePayableTotal, 110000, 0.01, "VAT 5/10 Tevkifat");

const fl = calculateFreelanceRate({
  targetAnnualNet: 90000,
  annualExpenses: 8000,
  effectiveTaxRatePct: 28,
  billableWeeksPerYear: 46,
  billableHoursPerWeek: 30,
});
approx(fl.hourlyRate, 96.38, 0.05, "Freelance Hourly Rate");

console.log("ALL 2026 FINANCIAL ENGINE ASSERTIONS PASSED!");

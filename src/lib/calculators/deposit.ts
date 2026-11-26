export interface DepositInput {
  principal: number;
  annualRatePct: number;
  termDays: number;
  withholdingTaxPct: number; // e.g., TR stopaj (10%, 12.5%, 15%, 17.5%) or US marginal tax
  renewalCycles: number; // 1 = single term, >1 = auto-compound net interest
}

export interface DepositCycleRow {
  cycle: number;
  startBalance: number;
  grossInterest: number;
  taxPaid: number;
  netInterest: number;
  endBalance: number;
}

export interface DepositResult {
  firstTermGrossInterest: number;
  firstTermTax: number;
  firstTermNetInterest: number;
  finalBalance: number;
  totalNetInterest: number;
  totalTaxPaid: number;
  effectiveAnnualNetYieldPct: number;
  cycles: DepositCycleRow[];
}

export function calculateDeposit(input: DepositInput): DepositResult {
  const principal = Math.max(0, input.principal);
  const annualRate = Math.max(0, input.annualRatePct) / 100;
  const termDays = Math.max(1, Math.min(1825, Math.round(input.termDays)));
  const taxRate = Math.max(0, Math.min(60, input.withholdingTaxPct)) / 100;
  const renewalCycles = Math.max(1, Math.min(36, Math.round(input.renewalCycles)));

  let balance = principal;
  let totalNetInterest = 0;
  let totalTaxPaid = 0;
  const cycles: DepositCycleRow[] = [];

  for (let c = 1; c <= renewalCycles; c++) {
    const startBalance = balance;
    const grossInterest = startBalance * annualRate * (termDays / 365);
    const taxPaid = grossInterest * taxRate;
    const netInterest = grossInterest - taxPaid;
    balance = startBalance + netInterest;

    totalNetInterest += netInterest;
    totalTaxPaid += taxPaid;

    cycles.push({
      cycle: c,
      startBalance,
      grossInterest,
      taxPaid,
      netInterest,
      endBalance: balance,
    });
  }

  const first = cycles[0];
  const singleTermNetRate = principal > 0 ? first.netInterest / principal : 0;
  const effectiveAnnualNetYieldPct =
    (Math.pow(1 + singleTermNetRate, 365 / termDays) - 1) * 100;

  return {
    firstTermGrossInterest: first.grossInterest,
    firstTermTax: first.taxPaid,
    firstTermNetInterest: first.netInterest,
    finalBalance: balance,
    totalNetInterest,
    totalTaxPaid,
    effectiveAnnualNetYieldPct,
    cycles,
  };
}

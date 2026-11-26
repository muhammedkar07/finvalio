export interface RentIncreaseInput {
  currentMonthlyRent: number;
  increaseRatePct: number;
}

export interface RentIncreaseResult {
  monthlyIncrease: number;
  newMonthlyRent: number;
  currentAnnualRent: number;
  newAnnualRent: number;
  annualIncrease: number;
}

export function calculateRentIncrease(input: RentIncreaseInput): RentIncreaseResult {
  const current = Math.max(0, input.currentMonthlyRent);
  const rate = Math.max(0, input.increaseRatePct) / 100;
  const monthlyIncrease = current * rate;
  const newMonthlyRent = current + monthlyIncrease;
  return {
    monthlyIncrease,
    newMonthlyRent,
    currentAnnualRent: current * 12,
    newAnnualRent: newMonthlyRent * 12,
    annualIncrease: monthlyIncrease * 12,
  };
}

export interface RentVsBuyInput {
  homePrice: number;
  downPaymentPct: number;
  mortgageAnnualRatePct: number;
  loanYears: number;
  monthlyRent: number;
  annualRentGrowthPct: number;
  homeAppreciationPct: number;
  investmentReturnPct: number;
  annualOwnershipCostPct: number; // Maintenance + property tax + insurance (% of home value)
  horizonYears: number;
}

export interface RentVsBuyPoint {
  year: number;
  buyerNetWorth: number;
  renterNetWorth: number;
  homeValue: number;
  mortgageBalance: number;
}

export interface RentVsBuyResult {
  downPayment: number;
  monthlyMortgage: number;
  finalBuyerNetWorth: number;
  finalRenterNetWorth: number;
  advantageAmount: number;
  winner: "buy" | "rent";
  breakevenYear: number | null;
  points: RentVsBuyPoint[];
}

export function calculateRentVsBuy(input: RentVsBuyInput): RentVsBuyResult {
  const homePrice = Math.max(1000, input.homePrice);
  const downPayment = homePrice * (Math.max(0, Math.min(100, input.downPaymentPct)) / 100);
  const loanPrincipal = Math.max(0, homePrice - downPayment);
  const monthlyMortgageRate = Math.max(0, input.mortgageAnnualRatePct) / 100 / 12;
  const loanMonths = Math.max(1, Math.round(input.loanYears) * 12);
  const horizonYears = Math.max(1, Math.min(30, Math.round(input.horizonYears)));

  let monthlyMortgage = 0;
  if (loanPrincipal > 0) {
    if (monthlyMortgageRate <= 0) {
      monthlyMortgage = loanPrincipal / loanMonths;
    } else {
      const pow = Math.pow(1 + monthlyMortgageRate, loanMonths);
      monthlyMortgage = (loanPrincipal * monthlyMortgageRate * pow) / (pow - 1);
    }
  }

  const sellingCostRate = 0.04; // 4% closing/agent friction on sale
  let homeValue = homePrice;
  let mortgageBalance = loanPrincipal;
  let renterPortfolio = downPayment; // Renter invests the down payment
  let currentRent = Math.max(0, input.monthlyRent);

  const investMonthly = Math.pow(1 + Math.max(0, input.investmentReturnPct) / 100, 1 / 12) - 1;
  const appRate = Math.max(-10, input.homeAppreciationPct) / 100;
  const rentGrowth = Math.max(0, input.annualRentGrowthPct) / 100;
  const ownershipPct = Math.max(0, input.annualOwnershipCostPct) / 100;

  let breakevenYear: number | null = null;
  const points: RentVsBuyPoint[] = [];

  for (let y = 1; y <= horizonYears; y++) {
    const monthlyOwnershipExtra = (homeValue * ownershipPct) / 12;

    for (let m = 1; m <= 12; m++) {
      const totalMonthsElapsed = (y - 1) * 12 + m;
      let actualMortgageOutflow = 0;
      if (totalMonthsElapsed <= loanMonths && mortgageBalance > 0) {
        const interest = mortgageBalance * monthlyMortgageRate;
        const principalPaid = Math.min(mortgageBalance, monthlyMortgage - interest);
        mortgageBalance = Math.max(0, mortgageBalance - principalPaid);
        actualMortgageOutflow = monthlyMortgage;
      }

      const buyerMonthlyOutflow = actualMortgageOutflow + monthlyOwnershipExtra;
      const monthlySavingsForRenter = buyerMonthlyOutflow - currentRent;

      renterPortfolio = renterPortfolio * (1 + investMonthly) + monthlySavingsForRenter;
    }

    homeValue *= 1 + appRate;
    currentRent *= 1 + rentGrowth;

    const buyerNetWorth = homeValue * (1 - sellingCostRate) - mortgageBalance;
    if (breakevenYear === null && buyerNetWorth >= renterPortfolio) {
      breakevenYear = y;
    }

    points.push({
      year: y,
      buyerNetWorth,
      renterNetWorth: renterPortfolio,
      homeValue,
      mortgageBalance,
    });
  }

  const last = points[points.length - 1];
  const winner = last.buyerNetWorth >= last.renterNetWorth ? "buy" : "rent";

  return {
    downPayment,
    monthlyMortgage,
    finalBuyerNetWorth: last.buyerNetWorth,
    finalRenterNetWorth: last.renterNetWorth,
    advantageAmount: Math.abs(last.buyerNetWorth - last.renterNetWorth),
    winner,
    breakevenYear,
    points,
  };
}

"use client";

import { CompoundCalculator } from "@/components/calculators/CompoundCalculator";
import { DepositCalculator } from "@/components/calculators/DepositCalculator";
import { FireCalculator } from "@/components/calculators/FireCalculator";
import { InflationVatCalculator } from "@/components/calculators/InflationVatCalculator";
import { LoanCalculator } from "@/components/calculators/LoanCalculator";
import { RentBuyCalculator } from "@/components/calculators/RentBuyCalculator";
import { SalaryCalculator } from "@/components/calculators/SalaryCalculator";
import { SeveranceCalculator } from "@/components/calculators/SeveranceCalculator";
import type { CalculatorId } from "@/lib/calculators/registry";
import type { Locale } from "@/lib/i18n";

export function CalculatorRenderer({ id, locale }: { id: CalculatorId; locale: Locale }) {
  switch (id) {
    case "salary":
      return <SalaryCalculator locale={locale} />;
    case "loan":
      return <LoanCalculator locale={locale} />;
    case "compound":
      return <CompoundCalculator locale={locale} />;
    case "deposit":
      return <DepositCalculator locale={locale} />;
    case "severance":
      return <SeveranceCalculator locale={locale} />;
    case "fire":
      return <FireCalculator locale={locale} />;
    case "rent-buy":
      return <RentBuyCalculator locale={locale} />;
    case "inflation-vat":
      return <InflationVatCalculator locale={locale} />;
  }
}

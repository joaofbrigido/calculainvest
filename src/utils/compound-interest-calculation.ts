type CompoundInterestCalculationProps = {
  initialAmount: number;
  interestRate: number;
  selectInterestRate: "annual" | "monthly";
  period: number;
  selectPeriod: "years" | "months";
  SelectInvestmentInflation: "annual" | "monthly";
  monthlyInvestment?: number | undefined;
  investmentInflation?: number | undefined;
};

export function compoundInterestCalculation({
  initialAmount,
  interestRate,
  selectInterestRate,
  period,
  selectPeriod,
  SelectInvestmentInflation,
  monthlyInvestment,
  investmentInflation,
}: CompoundInterestCalculationProps) {
  console.log(
    initialAmount,
    interestRate,
    selectInterestRate,
    period,
    selectPeriod,
    SelectInvestmentInflation,
    monthlyInvestment,
    investmentInflation
  );
  // retornar json do resultado
}

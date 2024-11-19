import { DialogFormInvestmentPrice } from "@/components/preco-aporte/dialog-form-investment-price";
import { InvestmentPriceResult } from "@/components/preco-aporte/investment-price-result";
import { NavCalculators } from "@/components/shared/nav-calculators";

export default async function PrecoAportePage() {
  return (
    <div className="mt-5">
      <div className="flex justify-between gap-3 flex-wrap mb-3">
        <NavCalculators active="preco-aporte" />
        <DialogFormInvestmentPrice />
      </div>

      <InvestmentPriceResult />
    </div>
  );
}

import { DialogInvestmentPrice } from "@/components/preco-aporte/dialog-investment-price";
import { InvestmentPriceResult } from "@/components/preco-aporte/investment-price-result";
import { NavCalculators } from "@/components/shared/nav-calculators";

export default function PrecoAportePage() {
  return (
    <div className="mt-5">
      <div className="flex justify-between gap-3 flex-wrap mb-3">
        <NavCalculators active="preco-aporte" />
        <DialogInvestmentPrice />
      </div>

      <InvestmentPriceResult />
    </div>
  );
}

import { NavCalculators } from "@/components/nav-calculators";
import BgCard from "@/components/bg-card";
import { CompoundInterestForm } from "./compound-interest-form";
import CompoundInterestResult from "./compound-interest-result";

export default function JurosCompostosPage() {
  return (
    <div className="mt-5 space-y-8">
      <NavCalculators active="juros-compostos" />
      <BgCard className="mt-3">
        <CompoundInterestForm />
      </BgCard>

      <BgCard className="h-36">Anúncio</BgCard>

      <CompoundInterestResult />

      <BgCard className="h-36">Anúncio</BgCard>
      <BgCard className="h-36">Explicação da calc</BgCard>
      <BgCard className="h-36">Anúncio</BgCard>
    </div>
  );
}

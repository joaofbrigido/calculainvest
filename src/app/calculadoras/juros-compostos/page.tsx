import { NavCalculators } from "@/components/shared/nav-calculators";
import { CompoundInterestForm } from "../../../components/juros-compostos/compound-interest-form";
import CompoundInterestResult from "../../../components/juros-compostos/compound-interest-result";
import BgCard from "@/components/shared/bg-card";

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

import { NavCalculators } from "@/components/shared/nav-calculators";
import { CompoundInterestForm } from "../../../components/juros-compostos/compound-interest-form";
import BgCard from "@/components/shared/bg-card";
import CompoundInterestResult from "@/components/juros-compostos/compound-interest-result";
import { CompoundInterestResultProvider } from "@/context/compound-interest-result-context";

export default async function JurosCompostosPage() {
  return (
    <main className="mt-5">
      <NavCalculators active="juros-compostos" />

      <CompoundInterestResultProvider>
        <div className="space-y-8">
          <BgCard className="mt-3">
            <CompoundInterestForm />
          </BgCard>

          <BgCard className="h-36">Anúncio</BgCard>

          <CompoundInterestResult />

          <BgCard className="h-36">Anúncio</BgCard>
          <BgCard className="h-36">Explicação da calc</BgCard>
          <BgCard className="h-36">Anúncio</BgCard>
        </div>
      </CompoundInterestResultProvider>
    </main>
  );
}

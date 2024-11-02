import { NavCalculators } from "@/components/shared/nav-calculators";
import { CompoundInterestForm } from "../../../components/juros-compostos/compound-interest-form";
import BgCard from "@/components/shared/bg-card";
import { cookies } from "next/headers";
import CompoundInterestResult, {
  CompoundInterestResultProps,
} from "@/components/juros-compostos/compound-interest-result";

export default async function JurosCompostosPage() {
  const cookieStore = await cookies();
  const responseCookieCompoundInterestResult = cookieStore.get(
    "compoundInterestResult"
  );
  const compoundInterestResult: CompoundInterestResultProps =
    responseCookieCompoundInterestResult
      ? JSON.parse(responseCookieCompoundInterestResult.value)
      : null;

  return (
    <main className="mt-5">
      <NavCalculators active="juros-compostos" />

      <div className="space-y-8">
        <BgCard className="mt-3">
          <CompoundInterestForm />
        </BgCard>

        <BgCard className="h-36">Anúncio</BgCard>

        <CompoundInterestResult {...compoundInterestResult} />

        <BgCard className="h-36">Anúncio</BgCard>
        <BgCard className="h-36">Explicação da calc</BgCard>
        <BgCard className="h-36">Anúncio</BgCard>
      </div>
    </main>
  );
}

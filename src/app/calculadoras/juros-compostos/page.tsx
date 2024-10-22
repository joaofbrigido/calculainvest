import { NavCalculators } from "@/components/nav-calculators";
import WhiteCard from "@/components/bg-card";
import { CompoundInterestForm } from "./compound-interest-form";

export default function JurosCompostosPage() {
  return (
    <div className="mt-5">
      <NavCalculators active="juros-compostos" />
      <WhiteCard className="mt-3">
        <CompoundInterestForm />
      </WhiteCard>
    </div>
  );
}

import { DialogPrecoAporte } from "@/components/preco-aporte/dialog-preco-aporte";
import { NavCalculators } from "@/components/shared/nav-calculators";

export default function PrecoAportePage() {
  return (
    <div className="mt-5">
      <div className="flex justify-between gap-3 flex-wrap">
        <NavCalculators active="preco-aporte" />
        <DialogPrecoAporte />
      </div>
    </div>
  );
}

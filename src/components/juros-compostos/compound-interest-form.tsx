import { InputLabel } from "@/components/shared/input-label";
import MainButton from "@/components/shared/main-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CompoundInterestForm = () => {
  return (
    <form className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
      <InputLabel
        label="Valor Inicial"
        id="initial-amount"
        name="initial-amount"
        placeholder="R$ 0,00"
      />

      <div className="flex gap-1 items-end">
        <InputLabel
          label="Taxa de Juros"
          id="interestRate"
          name="interestRate"
          placeholder="% 0,00"
        />
        <Select defaultValue="annual" name="SelectInterestRate">
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Selecione um Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="annual">Anual</SelectItem>
            <SelectItem value="monthly">Mensal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-1 items-end">
        <InputLabel
          label="Período"
          type="number"
          id="period"
          name="period"
          placeholder="0"
          min={0}
        />
        <Select defaultValue="years" name="selectPeriod">
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Selecione um Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="years">Anos</SelectItem>
            <SelectItem value="months">Meses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <InputLabel
        label="Investimento Mensal"
        id="monthlyInvestment"
        name="monthlyInvestment"
        placeholder="R$ 0,00"
        containerClassName="col-span-2 max-lg:col-span-1"
      />

      <div className="flex gap-1 items-end">
        <InputLabel
          label="Inflação do Investimento"
          id="investmentInflation"
          name="investmentInflation"
          placeholder="% 0,00"
        />
        <Select defaultValue="annual" name="SelectInvestmentInflation">
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Selecione um Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="annual">Anual</SelectItem>
            <SelectItem value="monthly">Mensal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-x-2 col-span-full place-self-end">
        <MainButton variant={"secondary"}>Limpar</MainButton>
        <MainButton>Calcular</MainButton>
      </div>
    </form>
  );
};

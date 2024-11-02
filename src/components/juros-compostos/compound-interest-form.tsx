"use client";

import { calculateCompoundInterestAction } from "@/actions/juros-compostos";
import { InputLabel } from "@/components/shared/input-label";
import MainButton from "@/components/shared/main-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@/hooks/use-form";

export const CompoundInterestForm = () => {
  const [{ errors, success }, handleSubmit, isPending] = useForm(
    calculateCompoundInterestAction
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1"
    >
      <InputLabel
        label="Valor Inicial"
        type="number"
        id="initialAmount"
        name="initialAmount"
        placeholder="R$ 0,00"
        error={errors?.initialAmount && errors?.initialAmount[0]}
      />

      <div
        className={`flex gap-1 items-end ${
          errors?.interestRate ? "items-center" : ""
        }`}
      >
        <InputLabel
          label="Taxa de Juros"
          id="interestRate"
          name="interestRate"
          placeholder="% 0,00"
          type="number"
          min={0}
          error={errors?.interestRate && errors?.interestRate[0]}
        />
        <Select defaultValue="annual" name="selectInterestRate">
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Selecione um Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="annual">Anual</SelectItem>
            <SelectItem value="monthly">Mensal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div
        className={`flex gap-1 items-end ${
          errors?.period ? "items-center" : ""
        }`}
      >
        <InputLabel
          label="Período"
          type="number"
          id="period"
          name="period"
          placeholder="0"
          min={0}
          error={errors?.period && errors?.period[0]}
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
        type="number"
        id="monthlyInvestment"
        name="monthlyInvestment"
        placeholder="R$ 0,00"
        containerClassName="col-span-2 max-lg:col-span-1"
        error={errors?.monthlyInvestment && errors?.monthlyInvestment[0]}
      />

      <div
        className={`flex gap-1 items-end ${
          errors?.investmentInflation ? "items-center" : ""
        }`}
      >
        <InputLabel
          label="Inflação do Investimento"
          id="investmentInflation"
          name="investmentInflation"
          placeholder="% 0,00"
          type="number"
          error={errors?.investmentInflation && errors?.investmentInflation[0]}
        />
        <Select defaultValue="annual" name="selectInvestmentInflation">
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
        <MainButton variant={"secondary"} type="reset" isLoading={isPending}>
          Limpar
        </MainButton>
        <MainButton isLoading={isPending}>Calcular</MainButton>
        {success && <p className="text-green-500">{success}</p>}
      </div>
    </form>
  );
};

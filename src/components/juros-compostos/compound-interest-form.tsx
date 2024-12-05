"use client";

import { InputLabel } from "@/components/shared/input-label";
import MainButton from "@/components/shared/main-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCompoundInterestResult } from "@/context/compound-interest-result-context";
import { compoundInterestCalculation } from "@/utils/compound-interest-calculation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const compoundInterestSchema = z.object({
  initialAmount: z
    .string()
    .refine(
      (value) => !value || /^(R\$\s?)?\d{1,3}(\.\d{3})*(,\d{2})?$/.test(value),
      {
        message: "Valor inválido, insira um valor monetário válido",
      }
    )
    .transform((value) => {
      if (!value) return 0;
      const numericValue = value.replace(/[R$\s.]/g, "").replace(",", ".");
      return parseFloat(numericValue);
    }),

  interestRate: z
    .number()
    .or(
      z
        .string()
        .transform((val) =>
          val ? parseFloat(val.replace("% ", "").replace(",", ".")) : 0
        )
    )
    .refine((val) => val >= 0, { message: "Taxa inválida" }),

  selectInterestRate: z
    .enum(["annual", "monthly"], {
      required_error: "Período da Taxa de Juros é obrigatório",
    })
    .transform((val) => (val === undefined ? "annual" : val)), // Define um valor padrão

  period: z
    .number({ required_error: "Período é obrigatório" })
    .int()
    .nonnegative()
    .or(z.string().transform((val) => parseInt(val, 10)))
    .refine((val) => !isNaN(val), { message: "Período inválido" }),

  selectPeriod: z
    .enum(["years", "months"], {
      required_error: "Unidade do Período é obrigatória",
    })
    .transform((val) => (val === undefined ? "years" : val)), // Define um valor padrão

  monthlyInvestment: z
    .string()
    .refine(
      (value) => !value || /^(R\$\s?)?\d{1,3}(\.\d{3})*(,\d{2})?$/.test(value),
      {
        message: "Valor inválido, insira um valor monetário válido",
      }
    )
    .transform((value) => {
      if (!value) return 0;
      const numericValue = value.replace(/[R$\s.]/g, "").replace(",", ".");
      return parseFloat(numericValue);
    }),

  investmentInflation: z
    .number()
    .or(
      z
        .string()
        .transform((val) =>
          val ? parseFloat(val.replace("% ", "").replace(",", ".")) : 0
        )
    )
    .refine((val) => val >= 0, { message: "Taxa inválida" }),

  selectInvestmentInflation: z
    .enum(["annual", "monthly"], {
      required_error: "Período da Inflação é obrigatório",
    })
    .transform((val) => (val === undefined ? "annual" : val)), // Define um valor padrão
});

export type CompoundInterest = z.infer<typeof compoundInterestSchema>;

type FieldErrorsProps = {
  initialAmount?: string[] | undefined;
  interestRate?: string[] | undefined;
  selectInterestRate?: string[] | undefined;
  period?: string[] | undefined;
  selectPeriod?: string[] | undefined;
  monthlyInvestment?: string[] | undefined;
  investmentInflation?: string[] | undefined;
  selectInvestmentInflation?: string[] | undefined;
};

export const CompoundInterestForm = () => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrorsProps>({});
  const { setCompoundInterestResult } = useCompoundInterestResult();

  async function clearForm() {
    if (typeof window !== "undefined") window.location.reload();
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const form = compoundInterestSchema.safeParse(Object.fromEntries(data));

    if (!form.success) {
      const errors = form.error.flatten().fieldErrors;
      setFieldErrors(errors);
      return;
    }

    try {
      const result = compoundInterestCalculation(form.data);
      setCompoundInterestResult(result);
    } catch (err) {
      if (err instanceof Error) {
        const { message } = err;
        toast.error(message);
        return;
      }

      toast.error("Erro inesperado. Tente novamente mais tarde.");
    }

    window.scrollTo({ top: 500, behavior: "smooth" });
    toast.success("Calculo realizado com sucesso.");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1"
    >
      <InputLabel
        label="Valor Inicial"
        id="initialAmount"
        name="initialAmount"
        placeholder="R$ 0,00"
        isCurrency
        error={fieldErrors?.initialAmount && fieldErrors?.initialAmount[0]}
      />

      <div
        className={`flex gap-1 ${
          fieldErrors?.interestRate ? "items-center" : ""
        }`}
      >
        <InputLabel
          label="Taxa de Juros"
          id="interestRate"
          name="interestRate"
          placeholder="% 0,00"
          isNumber
          min={0}
          error={fieldErrors?.interestRate && fieldErrors?.interestRate[0]}
        />
        <Select defaultValue="annual" name="selectInterestRate">
          <SelectTrigger
            className={`w-[100px] self-end ${
              fieldErrors?.period && "self-center"
            }`}
          >
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
          fieldErrors?.period ? "items-center" : ""
        }`}
      >
        <InputLabel
          label="Período"
          type="number"
          id="period"
          name="period"
          placeholder="0"
          min={0}
          error={fieldErrors?.period && fieldErrors?.period[0]}
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
        isCurrency
        containerClassName="col-span-2 max-lg:col-span-1"
        error={
          fieldErrors?.monthlyInvestment && fieldErrors?.monthlyInvestment[0]
        }
      />

      <div
        className={`flex gap-1 items-end ${
          fieldErrors?.investmentInflation ? "items-center" : ""
        }`}
      >
        <InputLabel
          label="Inflação do Investimento"
          id="investmentInflation"
          name="investmentInflation"
          placeholder="% 0,00"
          isNumber
          error={
            fieldErrors?.investmentInflation &&
            fieldErrors?.investmentInflation[0]
          }
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
        <MainButton variant={"secondary"} type="button" onClick={clearForm}>
          Limpar
        </MainButton>
        <MainButton>Calcular</MainButton>
      </div>
    </form>
  );
};

"use server";

import { compoundInterestCalculation } from "@/utils/compound-interest-calculation";
import { cookies } from "next/headers";
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

export async function calculateCompoundInterestAction(data: FormData) {
  const form = compoundInterestSchema.safeParse(Object.fromEntries(data));

  if (!form.success) {
    const errors = form.error.flatten().fieldErrors;
    return { success: false, message: null, errors };
  }

  try {
    const result = compoundInterestCalculation(form.data);
    const cookieStore = cookies();
    cookieStore.set("compoundInterestResult", JSON.stringify(result));
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      return { success: false, message, errors: null };
    }

    return {
      success: false,
      message: "Erro inesperado. Tente novamente mais tarde.",
      errors: null,
    };
  }

  return {
    success: true,
    message: "Cálculo realizado com sucesso.",
    errors: null,
  };
}

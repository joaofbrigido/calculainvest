"use server";

import { compoundInterestCalculation } from "@/utils/compound-interest-calculation";
import { z } from "zod";

const compoundInterestSchema = z.object({
  initialAmount: z
    .number({ required_error: "Valor Inicial é obrigatório" })
    .nonnegative()
    .or(
      z
        .string()
        .transform((val) =>
          parseFloat(val.replace("R$ ", "").replace(",", "."))
        )
    )
    .refine((val) => !isNaN(val), { message: "Valor inválido" }),

  interestRate: z
    .number({ required_error: "Taxa de Juros é obrigatória" })
    .nonnegative()
    .or(
      z
        .string()
        .transform((val) => parseFloat(val.replace("% ", "").replace(",", ".")))
    )
    .refine((val) => !isNaN(val), { message: "Taxa inválida" }),

  selectInterestRate: z.enum(["annual", "monthly"], {
    required_error: "Período da Taxa de Juros é obrigatório",
  }),

  period: z
    .number({ required_error: "Período é obrigatório" })
    .int()
    .nonnegative()
    .or(z.string().transform((val) => parseInt(val, 10)))
    .refine((val) => !isNaN(val), { message: "Período inválido" }),

  selectPeriod: z.enum(["years", "months"], {
    required_error: "Unidade do Período é obrigatória",
  }),

  monthlyInvestment: z
    .number()
    .nonnegative()
    .or(
      z
        .string()
        .transform((val) =>
          parseFloat(val.replace("R$ ", "").replace(",", "."))
        )
    )
    .optional(),

  investmentInflation: z
    .number()
    .or(
      z
        .string()
        .transform((val) => parseFloat(val.replace("% ", "").replace(",", ".")))
    )
    .optional(),

  SelectInvestmentInflation: z.enum(["annual", "monthly"], {
    required_error: "Período da Inflação é obrigatório",
  }),
});

export type CompoundInterest = z.infer<typeof compoundInterestSchema>;

export async function calculateCompoundInterestAction(data: FormData) {
  const result = compoundInterestSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, message: null, errors };
  }

  try {
    // retornar o json do resultado
    compoundInterestCalculation(result.data);
    // armazenar no cookies
  } catch (err) {
    if (err instanceof Error) {
      const { message } = await err;
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

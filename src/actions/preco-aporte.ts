"use server";

import { calculateInvestmentPrice } from "@/utils/investment-price-calculations";
import { cookies } from "next/headers";
import { z } from "zod";

export type investmentPriceData = {
  id: string;
  ticker: string;
  tickerPrice: number;
  quantity: number;
  total: number;
  logo: string;
  automaticPrice: boolean;
};

const newInvestmentSchema = z
  .object({
    quantity: z
      .string()
      .min(1, { message: "Quantidade Obrigatória" })
      .transform((val) => Number(val)),
    automaticPrice: z
      .string()
      .optional()
      .transform((val) => val === "on"),
    tickerPrice: z
      .string()
      .optional()
      .refine(
        (value) =>
          !value || /^(R\$\s?)?\d{1,3}(\.\d{3})*(,\d{2})?$/.test(value),
        {
          message: "Valor inválido, insira um valor monetário válido",
        }
      )
      .transform((value) => {
        if (!value) return 0;
        const numericValue = value.replace(/[R$\s.]/g, "").replace(",", ".");
        return parseFloat(numericValue);
      }),
  })
  .superRefine((data, ctx) => {
    if (!data.automaticPrice && data.tickerPrice <= 0) {
      ctx.addIssue({
        code: "custom",
        path: ["tickerPrice"],
        message: "Preço deve ser maior que zero",
      });
    }
  });

export type NewInvestment = z.infer<typeof newInvestmentSchema>;
export async function newInvestmentAction(data: FormData, ticker: string) {
  const form = newInvestmentSchema.safeParse(Object.fromEntries(data));

  if (!ticker)
    return { success: false, message: "Ticker Obrigatorio", errors: null };

  if (!form.success) {
    const errors = form.error.flatten().fieldErrors;
    return {
      success: false,
      message: null,
      errors,
    };
  }

  try {
    const calculateData = await calculateInvestmentPrice({
      ...form.data,
      ticker,
    });

    if (calculateData.error)
      return {
        success: false,
        message: calculateData.message,
        errors: null,
      };

    const cookieStore = cookies();
    const investmentPriceCookie = cookieStore.get("investmentPrice");
    let investmentPriceList = [];

    if (investmentPriceCookie) {
      investmentPriceList = JSON.parse(investmentPriceCookie.value);
    }

    const investmentPriceData = {
      id: `${ticker}-${Date.now()}`,
      ticker: ticker,
      tickerPrice: calculateData.tickerPrice,
      quantity: calculateData.quantity,
      total: calculateData.total,
      logo: calculateData.logo,
      automaticPrice: form.data.automaticPrice,
    };

    investmentPriceList.push(investmentPriceData);
    cookieStore.set("investmentPrice", JSON.stringify(investmentPriceList));

    return {
      success: true,
      message: "Aporte realizado com sucesso.",
      errors: null,
    };
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
}

export async function updateInvestmentAction(
  data: FormData,
  ticker: string,
  id: string
) {
  const form = newInvestmentSchema.safeParse(Object.fromEntries(data));

  if (!ticker)
    return { success: false, message: "Ticker Obrigatorio", errors: null };

  if (!form.success) {
    const errors = form.error.flatten().fieldErrors;
    return {
      success: false,
      message: null,
      errors,
    };
  }

  try {
    const calculateData = await calculateInvestmentPrice({
      ...form.data,
      ticker,
    });

    if (calculateData.error)
      return {
        success: false,
        message: calculateData.message,
        errors: null,
      };

    const cookieStore = cookies();
    const investmentPriceCookie = cookieStore.get("investmentPrice");

    if (!investmentPriceCookie)
      return {
        success: false,
        message: "Nenhum aporte encontrado, atualize a pagina.",
        errors: null,
      };

    const investmentPriceList = JSON.parse(investmentPriceCookie.value);

    const investmentPriceData = {
      id: id,
      ticker: ticker,
      tickerPrice: calculateData.tickerPrice,
      quantity: calculateData.quantity,
      total: calculateData.total,
      logo: calculateData.logo,
      automaticPrice: form.data.automaticPrice,
    };

    const index = investmentPriceList.findIndex(
      (item: investmentPriceData) => item.id === id
    );

    if (index !== -1) {
      investmentPriceList[index] = investmentPriceData;
    }

    cookieStore.set("investmentPrice", JSON.stringify(investmentPriceList));

    return {
      success: true,
      message: "Aporte salvo com sucesso.",
      errors: null,
    };
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
}

export async function getInvestment(id: string) {
  const cookieStore = cookies();
  const investmentPriceCookie = cookieStore.get("investmentPrice");
  let investmentPriceList = [];

  if (investmentPriceCookie) {
    investmentPriceList = JSON.parse(investmentPriceCookie.value);
  }

  return investmentPriceList.find(
    (item: investmentPriceData) => item.id === id
  );
}

export async function deleteInvestmentAction(id: string) {
  try {
    const cookieStore = cookies();
    const investmentPriceCookie = cookieStore.get("investmentPrice");

    if (!investmentPriceCookie)
      return {
        success: false,
        message: "Nenhum aporte encontrado, atualize a pagina.",
        errors: null,
      };

    const investmentPriceList: investmentPriceData[] = JSON.parse(
      investmentPriceCookie.value
    );

    const filteredList = investmentPriceList.filter((item) => item.id !== id);
    cookieStore.set("investmentPrice", JSON.stringify(filteredList));

    return {
      success: true,
      message: "Aporte deletado com sucesso",
      errors: null,
    };
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
}

export type AvailableTickersResponse = {
  indexes: string[];
  stocks: string[];
  error?: boolean;
  message?: string;
};

export async function getAllAvailable() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BRAPI_URL}/available?token=${process.env.NEXT_PUBLIC_BRAPI_TOKEN}`,
      { next: { revalidate: 60 * 60 * 24 } } // 1x ao dia
    );
    const data = (await response.json()) as AvailableTickersResponse;
    const filteredFractionStocks = data?.stocks.filter(
      (stock) => !stock.toLowerCase().endsWith("f")
    );

    return {
      indexes: data.indexes,
      stocks: filteredFractionStocks,
      error: false,
      message: null,
    };
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      return { indexes: [], stocks: [], error: true, message };
    }

    return {
      indexes: [],
      stocks: [],
      error: true,
      message: "Erro inesperado. Tente novamente mais tarde.",
    };
  }
}

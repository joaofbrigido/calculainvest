export type AvailableTickersResponse = {
  indexes: string[];
  stocks: string[];
  error?: boolean;
  message?: string;
};

export type InfoByTickerResponse = {
  stocks: [
    {
      stock: string;
      name: string;
      close: number;
      logo: string;
    }
  ];
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

export async function getInfoByTicker(ticker: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BRAPI_URL}/quote/list?search=${ticker}&token=${process.env.NEXT_PUBLIC_BRAPI_TOKEN}`,
      { next: { revalidate: 60 * 30 } } // a cada 30 minutos
    );
    const data = (await response.json()) as InfoByTickerResponse;

    if (data?.error) {
      return {
        stock: null,
        error: true,
        message: data.message,
      };
    }

    return {
      stock: data.stocks[0],
      error: false,
      message: null,
    };
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      return { stocks: null, error: true, message };
    }

    return {
      stocks: null,
      error: true,
      message: "Erro inesperado. Tente novamente mais tarde.",
    };
  }
}

// export async function getInfoMyTickers(myTickers: Ticker[]) {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BRAPI_URL}/quote/list?token=${process.env.NEXT_PUBLIC_BRAPI_TOKEN}`,
//       { next: { revalidate: 60 * 30 } } // a cada 30 minutos
//     );
//     const data = (await response.json()) as BrapiResponseTickers;

//     if (data?.error) {
//       return {
//         ok: false,
//         error: data.message,
//         data: null,
//       };
//     }

//     const infoMyTickers = data?.stocks.filter((stock) =>
//       myTickers.find((ticker) => ticker.ticker === stock.stock)
//     );
//     return {
//       ok: true,
//       error: null,
//       data: infoMyTickers,
//     };
//   } catch (error) {
//     apiError(error);
//   }
// }

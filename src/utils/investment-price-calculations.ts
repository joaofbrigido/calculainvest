import { NewInvestment } from "@/actions/preco-aporte";
import { getInfoByTicker } from "@/services/brapi";

type CalculateInvestmentPriceProps = NewInvestment & {
  ticker: string;
};

export async function calculateInvestmentPrice({
  ticker,
  quantity,
  automaticPrice,
  tickerPrice,
}: CalculateInvestmentPriceProps) {
  const tickerData = await getInfoByTicker(ticker);

  if (tickerData.error) {
    return {
      error: true,
      message: tickerData.message,
      tickerPrice: null,
      quantity: null,
      total: null,
      logo: null,
    };
  }

  const currentPrice = automaticPrice ? tickerData.stock!.close : tickerPrice;
  const total = currentPrice * quantity;

  return {
    error: false,
    message: null,
    tickerPrice: currentPrice,
    quantity,
    total,
    logo: tickerData.stock?.logo,
  };
}

// function calculateInvestmentPriceManual(quantity: number, tickerPrice: number) {
//   return tickerPrice * quantity;
// }

// function calculateInvestmentPriceAutomatic(ticker: string, quantity: number) {
//   // consultar api, pegar valor atual do ticker e multiplicar pela quantidade
//   console.log(ticker, quantity);
//   return 0;
// }

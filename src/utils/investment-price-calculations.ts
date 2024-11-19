export function calculateInvestmentPriceManual(
  quantity: number,
  tickerPrice: number
) {
  return tickerPrice * quantity;
}

export function calculateInvestmentPriceAutomatic(
  ticker: string,
  quantity: number
) {
  // consultar api, pegar valor atual do ticker e multiplicar pela quantidade
  console.log(ticker, quantity);
  return 0;
}

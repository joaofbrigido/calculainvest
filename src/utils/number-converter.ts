export function stringToNumber(str: string) {
  return Number(str.replace(",", "."));
}

export function numberToString(num: number) {
  return num.toLocaleString("pt-BR");
}

export function numberToCurrency(num: number) {
  return num.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function currencyToNumber(str: string) {
  return Number(str.replace("R$", "").replace(",", ".").replace(".", ""));
}

export function percentToNumber(str: string) {
  return Number(str.replace("%", "").replace(",", "."));
}

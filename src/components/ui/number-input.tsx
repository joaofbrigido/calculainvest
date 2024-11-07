import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

const moneyFormatter = Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberFormatter = Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

type NumberMaskInputProps = {
  className?: string;
  initialValue?: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  onCallback?: Function;
  numberType: "number" | "currency";
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  NumberMaskInputProps;

const NumberMaskInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, initialValue = "", onCallback, numberType, ...props }, ref) => {
    const [value, setValue] = React.useReducer((_: unknown, next: string) => {
      const digits = next.replace(/\D/g, "");

      if (numberType === "currency") {
        return moneyFormatter.format(Number(digits) / 100);
      }

      return numberFormatter.format(Number(digits) / 100);
    }, initialValue);

    function handleChange(formattedValue: string) {
      const digits = formattedValue.replace(/\D/g, "");
      const realValue = Number(digits) / 100;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onCallback && onCallback(realValue);
    }

    return (
      <Input
        ref={ref}
        className={cn("w-full", className)}
        {...props}
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
          handleChange(ev.target.value);
        }}
      />
    );
  }
);

NumberMaskInput.displayName = "NumberMaskInput";

export { NumberMaskInput };

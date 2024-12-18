"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { NumberMaskInput } from "../ui/number-input";

type InputLabelProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
  containerClassName?: string;
  isCurrency?: boolean;
  isNumber?: boolean;
};

export const InputLabel = ({
  label,
  error,
  containerClassName,
  isCurrency,
  isNumber,
  ...props
}: InputLabelProps) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      <Label htmlFor={props.name} className="block mb-2 text-md">
        {label}
      </Label>

      {isCurrency ? (
        <NumberMaskInput
          numberType="currency"
          className={`${
            error ? "border-red-400 dark:border-red-400" : props.className
          }`}
          {...props}
        />
      ) : isNumber ? (
        <NumberMaskInput
          numberType="number"
          className={`${
            error ? "border-red-400 dark:border-red-400" : props.className
          }`}
          {...props}
        />
      ) : (
        <Input
          className={`${
            error ? "border-red-400 dark:border-red-400" : props.className
          }`}
          {...props}
        />
      )}

      {error && <p className="text-red-400 mt-1">{error}</p>}
    </div>
  );
};

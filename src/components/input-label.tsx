import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type InputLabelProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
  containerClassName?: string;
};

export const InputLabel = ({
  label,
  error,
  containerClassName,
  ...props
}: InputLabelProps) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      <Label htmlFor={props.name} className="block mb-2 text-md">
        {label}
      </Label>

      <Input
        className={`${error ? "border-red-400" : props.className}`}
        {...props}
      />

      {error && <p className="text-red-400 mt-1">{error}</p>}
    </div>
  );
};

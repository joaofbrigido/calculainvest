"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type SelectTickerProps = {
  label: string;
  name: string;
  placeholder: string;
  value?: string;
  setValue: (value: string) => void;
  options: Option[];
};

export type Option = {
  value: string;
  label: string;
};

export function SelectTicker({
  setValue,
  value,
  label,
  name,
  placeholder,
  options,
}: SelectTickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <label htmlFor={name} className="block mb-2 font-medium">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full"
            variant={"outline"}
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 border-border">
          <Command>
            <CommandInput placeholder="Buscar Código da Ação ou Fiis..." />
            <CommandList>
              <CommandEmpty>Nenhum ativo encontrado</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

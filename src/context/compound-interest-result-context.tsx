"use client";

import { CompoundInterestResultProps } from "@/components/juros-compostos/compound-interest-result";
import { ReactNode, createContext, useContext, useState } from "react";

interface CompoundInterestResultContextType {
  compoundInterestResult: CompoundInterestResultProps;
  setCompoundInterestResult: React.Dispatch<
    React.SetStateAction<CompoundInterestResultProps>
  >;
}

const compoundInterestResultContext = createContext(
  {} as CompoundInterestResultContextType
);

export function CompoundInterestResultProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [compoundInterestResult, setCompoundInterestResult] =
    useState<CompoundInterestResultProps>({} as CompoundInterestResultProps);

  return (
    <compoundInterestResultContext.Provider
      value={{ compoundInterestResult, setCompoundInterestResult }}
    >
      {children}
    </compoundInterestResultContext.Provider>
  );
}

export const useCompoundInterestResult = () =>
  useContext(compoundInterestResultContext);

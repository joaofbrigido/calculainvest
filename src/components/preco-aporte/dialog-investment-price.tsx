"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import MainButton from "../shared/main-button";
import { Plus } from "lucide-react";
import { InputLabel } from "../shared/input-label";
import { Button } from "../ui/button";
import { SelectTicker } from "../shared/select-ticker";
import { useState } from "react";
import { SwitchAutomaticPrice } from "../shared/switch-automatic-price";

export const DialogInvestmentPrice = () => {
  const [ticker, setTicker] = useState("");
  const [automaticPrice, setAutomaticPrice] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="max-sm:w-full">
          <Plus />
          Novo Aporte
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:border-border min-w-[780px] max-lg:min-w-[90%] max-lg:max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Novo Aporte</DialogTitle>
        </DialogHeader>

        <form>
          <div className="grid gap-4 grid-cols-2 max-sm:grid-cols-1">
            <SelectTicker
              name="ticker"
              label="Ativo"
              options={[
                { label: "AAPL", value: "AAPL" },
                { label: "MSFT", value: "MSFT" },
              ]}
              placeholder="Selecione um ativo"
              setValue={setTicker}
              value={ticker}
            />
            <InputLabel
              label="Quantidade"
              id="quantity"
              name="quantity"
              placeholder="0"
              type="number"
              min={0}
              className="bg-transparent dark:bg-transparent"
            />
            <div>
              <SwitchAutomaticPrice
                label="Preço Automático"
                description="Preço atual do ativo a mercado"
                name="price"
                id="price"
                checked={automaticPrice}
                onCheckedChange={setAutomaticPrice}
              />
              <InputLabel
                label=""
                disabled={automaticPrice}
                containerClassName="mt-2"
                id="tickerPrice"
                name="tickerPrice"
                placeholder="R$ 0,00"
                className="bg-transparent dark:bg-transparent"
                isCurrency
              />
            </div>
          </div>

          <DialogFooter className="max-sm:gap-3 mt-5">
            <DialogClose asChild>
              <MainButton variant="outline">Cancelar</MainButton>
            </DialogClose>
            <MainButton>Adicionar</MainButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

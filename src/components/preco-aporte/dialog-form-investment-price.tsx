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
import { Loader, Plus } from "lucide-react";
import { InputLabel } from "../shared/input-label";
import { Button } from "../ui/button";
import { SelectTicker } from "../shared/select-ticker";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { SwitchAutomaticPrice } from "../shared/switch-automatic-price";
import { getAllAvailable } from "@/services/brapi";
import { toast } from "sonner";
import {
  getInvestment,
  investmentPriceData,
  newInvestmentAction,
  updateInvestmentAction,
} from "@/actions/preco-aporte";

type TickerOptionProps = {
  label: string;
  value: string;
};

type InputErrorsProps = null | {
  quantity?: string[] | undefined;
  automaticPrice?: string[] | undefined;
  tickerPrice?: string[] | undefined;
};

type DialogFormInvestmentPriceProps = {
  id?: string;
  openDialog?: boolean;
  setOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>;
  needDialogTrigger?: boolean;
};

export const DialogFormInvestmentPrice = ({
  id,
  openDialog,
  setOpenDialog,
  needDialogTrigger = true,
}: DialogFormInvestmentPriceProps) => {
  const [ticker, setTicker] = useState("");
  const [automaticPrice, setAutomaticPrice] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [inputErrors, setInputErrors] = useState<InputErrorsProps>({});

  const [tickerOptions, setTickerOptions] = useState<TickerOptionProps[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function getTickerOptions() {
    setLoadingOptions(true);
    const response = await getAllAvailable();

    if (response.error) {
      toast.error(response.message);
      setLoadingOptions(false);
      return [];
    }

    setLoadingOptions(false);
    const options = response.stocks.map((ticker) => ({
      label: ticker,
      value: ticker,
    }));
    setTickerOptions(options);
  }

  function onChangeAutomaticPrice() {
    setAutomaticPrice(!automaticPrice);
    setInputErrors({ ...inputErrors, tickerPrice: undefined });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      let response;

      if (id) {
        response = await updateInvestmentAction(data, ticker, id);
      } else {
        response = await newInvestmentAction(data, ticker);
      }

      if (!response.success) {
        if (response.message) toast.error(response.message);
        setInputErrors(response.errors);
        return;
      }

      clearInputs();
      if (setOpenDialog) setOpenDialog(false);
      const successMessage = id
        ? "Aporte atualizado com sucesso."
        : "Aporte realizado com sucesso.";
      toast.success(successMessage);
    });
  }

  async function setInputValuesInEditing() {
    if (id) {
      const investment = (await getInvestment(id)) as investmentPriceData;

      if (!investment) {
        toast.error("Aporte nao encontrado");
        return;
      }

      setTicker(investment.ticker);
      setQuantity(investment.quantity.toString());
      setAutomaticPrice(investment.automaticPrice);
    }
  }

  function clearInputs() {
    setTicker("");
    setQuantity("");
    setAutomaticPrice(false);
    setInputErrors(null);
  }

  useEffect(() => {
    getTickerOptions();
  }, []);

  useEffect(() => {
    setInputValuesInEditing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      {needDialogTrigger && (
        <DialogTrigger asChild>
          <Button className="max-sm:w-full">
            <Plus />
            Novo Aporte
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="dark:border-border min-w-[780px] max-lg:min-w-[90%] max-lg:max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Novo Aporte</DialogTitle>
        </DialogHeader>

        {loadingOptions ? (
          <div>
            <Loader className="animate-spin mr-3" />
            carregando...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 grid-cols-2 max-sm:grid-cols-1">
              <SelectTicker
                name="ticker"
                label="Ativo"
                options={tickerOptions}
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
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                className="bg-transparent dark:bg-transparent"
                error={inputErrors?.quantity && inputErrors?.quantity[0]}
              />
              <div>
                <SwitchAutomaticPrice
                  label="Preço Automático"
                  description="Preço atual do ativo a mercado"
                  name="automaticPrice"
                  id="automaticPrice"
                  checked={automaticPrice}
                  onCheckedChange={onChangeAutomaticPrice}
                />
                <InputLabel
                  isCurrency
                  label=""
                  disabled={automaticPrice}
                  containerClassName="mt-2"
                  id="tickerPrice"
                  name="tickerPrice"
                  placeholder="Preço do ativo (R$ 0,00)"
                  className={`bg-transparent dark:bg-transparent ${
                    automaticPrice ? "hidden" : ""
                  }`}
                  error={
                    inputErrors?.tickerPrice && inputErrors?.tickerPrice[0]
                  }
                />
              </div>
            </div>

            <DialogFooter className="max-sm:gap-3 mt-5">
              <DialogClose asChild>
                <MainButton variant="outline">Cancelar</MainButton>
              </DialogClose>
              <MainButton isLoading={isPending}>Salvar</MainButton>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

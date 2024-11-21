"use client";

import { DollarSign, FileMinus2 } from "lucide-react";
import BgCard from "../shared/bg-card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Pie, PieChart } from "recharts";
import { DropdownMenuEdit } from "./dropdown-menu-edit";
import { DialogFormInvestmentPrice } from "./dialog-form-investment-price";
import { useState } from "react";
import Image from "next/image";
import { numberToCurrency } from "@/utils/number-converter";

export type InvestmentPriceResultProps = {
  investmentPriceList: [
    {
      ticker: string;
      tickerPrice: number;
      quantity: number;
      total: number;
      logo: string;
    }
  ];
};

export const InvestmentPriceResult = ({
  investmentPriceList,
}: InvestmentPriceResultProps) => {
  const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
  ];
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const [openDialog, setOpenDialog] = useState(false);

  function totalAmountInvested() {
    const total = investmentPriceList.reduce(
      (acc, item) => acc + item.total,
      0
    );
    return total;
  }

  return (
    <>
      {!investmentPriceList ? (
        <BgCard>
          <div className="flex flex-col items-center justify-center gap-5 h-full">
            <FileMinus2 size={64} className="text-stone-400" />
            <p className="max-w-[570px] text-center text-foreground/50 text-xl">
              Nenhum aporte realizado, adicione pelo menos um aporte para
              controlar o preço do seu investimento
            </p>
            <DialogFormInvestmentPrice
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
            />
          </div>
        </BgCard>
      ) : (
        <section className="grid gap-5 grid-cols-[1fr_0.5fr] max-lg:grid-cols-1">
          <BgCard>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Ativo</TableHead>
                  <TableHead>Qtd</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investmentPriceList.map((item, idx) => (
                  <TableRow key={`aporte-${item.ticker}-${idx}`}>
                    <TableCell>
                      <Image
                        src={item.logo}
                        alt={item.ticker}
                        width={40}
                        height={40}
                        className="rounded-lg size-8"
                      />
                    </TableCell>
                    <TableCell>{item.ticker}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{numberToCurrency(item.tickerPrice)}</TableCell>
                    <TableCell className="text-right">
                      {numberToCurrency(item.total)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenuEdit />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="dark:border-foreground/20 dark:bg-stone-900">
                <TableRow>
                  <TableCell colSpan={4}>Total</TableCell>
                  <TableCell className="text-right">
                    {numberToCurrency(totalAmountInvested())}
                  </TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </BgCard>

          <div className="space-y-5">
            <BgCard>
              <div className="flex gap-3 items-center justify-between mb-8">
                <h2>Total do Aporte</h2>
                <DollarSign className="text-primary size-5" />
              </div>
              <h3 className="text-4xl font-bold">
                {numberToCurrency(totalAmountInvested())}
              </h3>
            </BgCard>

            <BgCard className="px-2 py-2">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[320px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
              >
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={chartData}
                    dataKey="visitors"
                    label
                    nameKey="browser"
                  />
                </PieChart>
              </ChartContainer>
            </BgCard>
          </div>
        </section>
      )}

      <section className="mt-5 space-y-5">
        <BgCard>Anúncio</BgCard>
        <BgCard>Explicação da Calculadora</BgCard>
        <BgCard>Anúncio</BgCard>
      </section>
    </>
  );
};

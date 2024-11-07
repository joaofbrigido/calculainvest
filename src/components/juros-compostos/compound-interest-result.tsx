"use client";

import BgCard from "@/components/shared/bg-card";
import BorderCard from "@/components/shared/border-card";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Percent, PiggyBank } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Pie,
  PieChart,
  XAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { numberToCurrency } from "@/utils/number-converter";

export type CompoundInterestResultProps = {
  finalTotalValue: number;
  totalAmountInvested: number;
  totalAmountInterest: number;
  valuesPerMonth: {
    month: number;
    fees: number;
    totalInvested: number;
    totalInterest: number;
    accumulated: number;
  }[];
};

const CompoundInterestResult = ({
  finalTotalValue,
  totalAmountInterest,
  totalAmountInvested,
  valuesPerMonth,
}: CompoundInterestResultProps) => {
  if (!valuesPerMonth) {
    return null;
  }

  const pieChartData = [
    {
      valueInvested: "totalInvested",
      amout: totalAmountInvested,
      fill: "#F1B61D",
    },
    {
      valueInvested: "totalInterest",
      amout: totalAmountInterest,
      fill: "#f59e0b",
    },
  ];
  const pieChartConfig = {
    amout: {
      label: "Total R$",
    },
    totalInvested: {
      label: "Total Investido",
      color: "hsl(var(--chart-1))",
    },
    totalInterest: {
      label: "Total em Juros",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const barChartData = valuesPerMonth.map((item) => ({
    date: String(item.month + 1).padStart(2, "0"),
    totalInvested: item.totalInvested,
    totalInterest: item.totalInterest,
  }));

  const barChartConfig = {
    totalValue: {
      label: "Total R$",
    },
    totalInvested: {
      label: "Total Investido",
      color: "#F1B61D",
    },
    totalInterest: {
      label: "Total em Juros",
      color: "#f59e0b",
    },
  } satisfies ChartConfig;

  return (
    <BgCard>
      <BorderCard className="flex gap-4 justify-between max-lg:flex-col max-lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-primary p-2 rounded-lg">
              <DollarSign className="h-5 w-5 text-primary-foreground" />
            </span>
            <h2 className="text-lg font-medium">Valor Total Final</h2>
          </div>
          <h3 className="text-2xl font-bold ml-[48px] mt-2">
            {numberToCurrency(finalTotalValue)}
          </h3>
        </div>

        <Separator
          orientation="vertical"
          className="h-[76px] max-lg:hidden dark:bg-foreground/10"
        />
        <Separator
          orientation="horizontal"
          className="hidden max-lg:block dark:bg-foreground/10"
        />

        <div>
          <div className="flex items-center gap-3">
            <span className="bg-primary p-2 rounded-lg">
              <PiggyBank className="h-5 w-5 text-primary-foreground" />
            </span>
            <h2 className="text-lg font-medium">Valor Total Investido</h2>
          </div>
          <h3 className="text-2xl font-bold ml-[48px] mt-2">
            {numberToCurrency(totalAmountInvested)}
          </h3>
        </div>

        <Separator
          orientation="vertical"
          className="h-[76px] max-lg:hidden dark:bg-foreground/10"
        />
        <Separator
          orientation="horizontal"
          className="hidden max-lg:block dark:bg-foreground/10"
        />

        <div>
          <div className="flex items-center gap-3">
            <span className="bg-primary p-2 rounded-lg">
              <Percent className="h-5 w-5 text-primary-foreground" />
            </span>
            <h2 className="text-lg font-medium">Valor Total Em Juros</h2>
          </div>
          <h3 className="text-2xl font-bold ml-[48px] mt-2">
            {numberToCurrency(totalAmountInterest)}
          </h3>
        </div>
      </BorderCard>

      <section className="mt-5 grid grid-cols-[0.4fr_1fr] gap-5 max-lg:grid-cols-1">
        <BorderCard className="p-0">
          <ChartContainer
            config={pieChartConfig}
            className="mx-auto aspect-square max-h-[300px] [&_.recharts-text]:fill-background"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="amout" hideLabel />}
              />
              <Pie data={pieChartData} dataKey="amout" innerRadius={40}>
                <LabelList
                  dataKey="valueInvested"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof pieChartConfig) =>
                    pieChartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </BorderCard>

        <BorderCard className="p-0 pb-3">
          <ChartContainer
            config={barChartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={barChartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="totalValue"
                    labelFormatter={(value) => "Mês: " + value}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="totalInvested"
                stackId="a"
                fill="#F1B61D"
                radius={[0, 0, 2, 2]}
              />
              <Bar
                dataKey="totalInterest"
                stackId="a"
                fill="#f59e0b"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </BorderCard>

        <BorderCard className="col-span-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Meses</TableHead>
                <TableHead>Juros</TableHead>
                <TableHead>Total Investido</TableHead>
                <TableHead>Total Juros</TableHead>
                <TableHead>Acumulado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {valuesPerMonth.map((moth) => (
                <TableRow key={`juros-${moth.month}`}>
                  <TableCell>{moth.month}</TableCell>
                  <TableCell>{numberToCurrency(moth.fees)}</TableCell>
                  <TableCell>{numberToCurrency(moth.totalInvested)}</TableCell>
                  <TableCell>{numberToCurrency(moth.totalInterest)}</TableCell>
                  <TableCell>{numberToCurrency(moth.accumulated)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </BorderCard>
      </section>
    </BgCard>
  );
};

export default CompoundInterestResult;

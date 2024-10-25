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

const CompoundInterestResult = () => {
  const pieChartData = [
    { valueInvested: "totalInvested", amout: 275, fill: "#F1B61D" },
    { valueInvested: "totalInterest", amout: 200, fill: "#f59e0b" },
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

  const chartData = [
    { date: "01", totalInvested: 222, totalInterest: 150 },
    { date: "02", totalInvested: 97, totalInterest: 180 },
    { date: "03", totalInvested: 167, totalInterest: 120 },
    { date: "04", totalInvested: 242, totalInterest: 260 },
    { date: "05", totalInvested: 373, totalInterest: 290 },
    { date: "06", totalInvested: 301, totalInterest: 340 },
    { date: "07", totalInvested: 245, totalInterest: 180 },
    { date: "08", totalInvested: 409, totalInterest: 320 },
    { date: "09", totalInvested: 59, totalInterest: 110 },
    { date: "10", totalInvested: 261, totalInterest: 190 },
    { date: "11", totalInvested: 327, totalInterest: 350 },
    { date: "12", totalInvested: 292, totalInterest: 210 },
    { date: "13", totalInvested: 342, totalInterest: 380 },
    { date: "14", totalInvested: 137, totalInterest: 220 },
    { date: "15", totalInvested: 120, totalInterest: 170 },
    { date: "16", totalInvested: 138, totalInterest: 190 },
    { date: "17", totalInvested: 446, totalInterest: 360 },
    { date: "18", totalInvested: 364, totalInterest: 410 },
    { date: "19", totalInvested: 243, totalInterest: 180 },
    { date: "20", totalInvested: 89, totalInterest: 150 },
    { date: "21", totalInvested: 137, totalInterest: 200 },
    { date: "22", totalInvested: 224, totalInterest: 170 },
    { date: "23", totalInvested: 138, totalInterest: 230 },
    { date: "24", totalInvested: 387, totalInterest: 290 },
    { date: "25", totalInvested: 215, totalInterest: 250 },
    { date: "26", totalInvested: 75, totalInterest: 130 },
    { date: "27", totalInvested: 383, totalInterest: 420 },
    { date: "28", totalInvested: 122, totalInterest: 180 },
    { date: "29", totalInvested: 315, totalInterest: 240 },
    { date: "30", totalInvested: 454, totalInterest: 380 },
    { date: "31", totalInvested: 165, totalInterest: 220 },
    { date: "32", totalInvested: 293, totalInterest: 310 },
    { date: "33", totalInvested: 247, totalInterest: 190 },
    { date: "34", totalInvested: 385, totalInterest: 420 },
    { date: "35", totalInvested: 481, totalInterest: 390 },
    { date: "36", totalInvested: 498, totalInterest: 520 },
    { date: "37", totalInvested: 388, totalInterest: 300 },
    { date: "38", totalInvested: 149, totalInterest: 210 },
    { date: "39", totalInvested: 227, totalInterest: 180 },
    { date: "30", totalInvested: 293, totalInterest: 330 },
    { date: "31", totalInvested: 335, totalInterest: 270 },
    { date: "32", totalInvested: 197, totalInterest: 240 },
    { date: "33", totalInvested: 197, totalInterest: 160 },
    { date: "34", totalInvested: 448, totalInterest: 490 },
    { date: "35", totalInvested: 473, totalInterest: 380 },
    { date: "36", totalInvested: 338, totalInterest: 400 },
    { date: "37", totalInvested: 499, totalInterest: 420 },
    { date: "38", totalInvested: 315, totalInterest: 350 },
    { date: "39", totalInvested: 235, totalInterest: 180 },
    { date: "40", totalInvested: 177, totalInterest: 230 },
    { date: "41", totalInvested: 82, totalInterest: 140 },
    { date: "42", totalInvested: 81, totalInterest: 120 },
    { date: "43", totalInvested: 252, totalInterest: 290 },
    { date: "44", totalInvested: 294, totalInterest: 220 },
    { date: "45", totalInvested: 201, totalInterest: 250 },
    { date: "46", totalInvested: 213, totalInterest: 170 },
    { date: "47", totalInvested: 420, totalInterest: 460 },
    { date: "48", totalInvested: 233, totalInterest: 190 },
    { date: "49", totalInvested: 78, totalInterest: 130 },
    { date: "50", totalInvested: 340, totalInterest: 280 },
    { date: "51", totalInvested: 178, totalInterest: 230 },
  ];
  const chartConfig = {
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
      <BorderCard className="flex gap-4 justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-primary p-2 rounded-lg">
              <DollarSign className="h-5 w-5 text-primary-foreground" />
            </span>
            <h2 className="text-lg font-medium">Valor Total Final</h2>
          </div>
          <h3 className="text-2xl font-bold ml-[48px] mt-2">R$ 709.277,44</h3>
        </div>

        <Separator orientation="vertical" className="h-[76px]" />

        <div>
          <div className="flex items-center gap-3">
            <span className="bg-primary p-2 rounded-lg">
              <PiggyBank className="h-5 w-5 text-primary-foreground" />
            </span>
            <h2 className="text-lg font-medium">Valor Total Investido</h2>
          </div>
          <h3 className="text-2xl font-bold ml-[48px] mt-2">R$ 297.800,00</h3>
        </div>

        <Separator orientation="vertical" className="h-[76px]" />

        <div>
          <div className="flex items-center gap-3">
            <span className="bg-primary p-2 rounded-lg">
              <Percent className="h-5 w-5 text-primary-foreground" />
            </span>
            <h2 className="text-lg font-medium">Valor Total Em Juros</h2>
          </div>
          <h3 className="text-2xl font-bold ml-[48px] mt-2">R$ 411.477,44</h3>
        </div>
      </BorderCard>

      <section className="mt-5 grid grid-cols-[0.4fr_1fr] gap-5">
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
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
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
          Tabela com as colunas: meses ou ano juros R$ total investido R$ total
          juros R$ Acumulado R$
        </BorderCard>
      </section>
    </BgCard>
  );
};

export default CompoundInterestResult;

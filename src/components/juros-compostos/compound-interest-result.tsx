import BgCard from "@/components/shared/bg-card";
import BorderCard from "@/components/shared/border-card";
import { Separator } from "@/components/ui/separator";
import { DollarSign } from "lucide-react";

const CompoundInterestResult = () => {
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
              <DollarSign className="h-5 w-5 text-primary-foreground" />
            </span>
            <h2 className="text-lg font-medium">Valor total investido</h2>
          </div>
          <h3 className="text-2xl font-bold ml-[48px] mt-2">R$ 297.800,00</h3>
        </div>

        <Separator orientation="vertical" className="h-[76px]" />

        <div>
          <div className="flex items-center gap-3">
            <span className="bg-primary p-2 rounded-lg">
              <DollarSign className="h-5 w-5 text-primary-foreground" />
            </span>
            <h2 className="text-lg font-medium">Total em juros</h2>
          </div>
          <h3 className="text-2xl font-bold ml-[48px] mt-2">R$ 411.477,44</h3>
        </div>
      </BorderCard>

      <section className="mt-5 grid grid-cols-[0.4fr_1fr] gap-5">
        <BorderCard>pizza: juros x investido</BorderCard>
        <BorderCard>
          X: Bar Chart Stacked (juros e investido) Y: Meses ou ano (depende do
          tamanho do período)
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

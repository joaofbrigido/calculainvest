import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex  gap-4">
      <Button asChild>
        <Link href="/calculadoras/preco-teto">Preço Teto</Link>
      </Button>
      <Button asChild>
        <Link href="/calculadoras/juros-compostos">Juros Compostos</Link>
      </Button>
      <Button asChild>
        <Link href="/calculadoras/preco-aporte">Preço Aporte</Link>
      </Button>
    </div>
  );
}

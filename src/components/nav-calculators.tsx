import Link from "next/link";

type NavCalculatorsProps = {
  active: "juros-compostos" | "preco-teto" | "preco-aporte";
};

export const NavCalculators = ({ active }: NavCalculatorsProps) => {
  return (
    <nav className="bg-border flex gap-1 p-1 rounded-md max-w-fit">
      <Link
        href="/calculadoras/preco-teto"
        className={`${
          active === "preco-teto" &&
          "bg-white text-stone-950 font-bold opacity-100 dark:bg-stone-600 dark:text-stone-50"
        } px-3 py-1 rounded opacity-70`}
      >
        Preço Teto
      </Link>
      <Link
        href="/calculadoras/juros-compostos"
        className={`${
          active === "juros-compostos" &&
          "bg-white text-stone-950 font-bold opacity-100"
        } px-3 py-1 rounded opacity-70`}
      >
        Juros Compostos
      </Link>
      <Link
        href="/calculadoras/preco-aporte"
        className={`${
          active === "preco-aporte" &&
          "bg-white text-stone-950 font-bold opacity-100"
        } px-3 py-1 rounded opacity-70`}
      >
        Preço Aporte
      </Link>
    </nav>
  );
};

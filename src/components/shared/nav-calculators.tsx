import Link from "next/link";

type NavCalculatorsProps = {
  active: "juros-compostos" | "preco-teto" | "preco-aporte";
};

export const NavCalculators = ({ active }: NavCalculatorsProps) => {
  return (
    <nav className="bg-border flex gap-1 p-1 rounded-md max-w-fit max-sm:max-w-full w-full">
      <Link
        href="/calculadoras/preco-teto"
        className={`px-3 py-1 rounded max-sm:w-full max-sm:block max-sm:text-center ${
          active === "preco-teto"
            ? "bg-white text-stone-950 font-bold dark:bg-stone-600 dark:text-stone-50"
            : "opacity-70"
        }`}
      >
        Preço Teto
      </Link>
      <Link
        href="/calculadoras/juros-compostos"
        className={`px-3 py-1 rounded max-sm:w-full max-sm:block max-sm:text-center ${
          active === "juros-compostos"
            ? "bg-white text-stone-950 font-bold dark:bg-stone-600 dark:text-stone-50"
            : "opacity-70"
        }`}
      >
        Juros Compostos
      </Link>
      <Link
        href="/calculadoras/preco-aporte"
        className={`px-3 py-1 rounded max-sm:w-full max-sm:block max-sm:text-center ${
          active === "preco-aporte"
            ? "bg-white text-stone-950 font-bold dark:bg-stone-600 dark:text-stone-50"
            : "opacity-70"
        }`}
      >
        Preço Aporte
      </Link>
    </nav>
  );
};

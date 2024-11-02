"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  isLoggedIn: boolean;
};

export const Logo = ({ isLoggedIn }: LogoProps) => {
  const { theme } = useTheme();

  return (
    <Link href={isLoggedIn ? "/" : "/"}>
      <Image
        src={
          theme === "dark"
            ? "/logo-light-calculainvest.png"
            : "/logo-dark-calculainvest.png"
        }
        className="w-[147px] h-[32px]"
        alt="Logo CalculaInvest (ira para o início)"
        width={200}
        height={40}
        priority
      />
    </Link>
  );
};

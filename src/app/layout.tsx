import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Header } from "@/components/shared/header";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Calculo do Investidor",
  description: "Ferramentas Essenciais para Maximizar Seus Investimentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning={true}>
      <body
        className={`${dmSans.className} antialiased bg-stone-100 dark:bg-stone-900`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors />
          <NextTopLoader
            color="#FACC15"
            height={3}
            shadow="0 0 10px #FACC15,0 0 5px #FACC15"
          />
          <Header isLoggedIn={false} />
          <div className="container">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}

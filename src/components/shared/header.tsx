import { Logo } from "./logo";
import { ThemeDropdownToggle } from "./theme-dropdown-toggle";

type HeaderProps = {
  isLoggeredIn: boolean;
};

export const Header = ({ isLoggeredIn }: HeaderProps) => {
  return (
    <header className="border-b border-b-border p-4">
      <div className="container flex items-center justify-between gap-5">
        <Logo isLoggeredIn={isLoggeredIn} />
        <ThemeDropdownToggle />
      </div>
    </header>
  );
};

import { Logo } from "./logo";
import { ThemeDropdownToggle } from "./theme-dropdown-toggle";

type HeaderProps = {
  isLoggedIn: boolean;
};

export const Header = ({ isLoggedIn }: HeaderProps) => {
  return (
    <header className="border-b border-b-border p-4">
      <div className="container flex items-center justify-between gap-5">
        <Logo isLoggedIn={isLoggedIn} />
        <ThemeDropdownToggle />
      </div>
    </header>
  );
};

import { Loader } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";

type MainButtonProps = ButtonProps & {
  children: React.ReactNode;
  isLoading?: boolean;
};

const MainButton = ({ isLoading, children, ...props }: MainButtonProps) => {
  return (
    <>
      {isLoading ? (
        <Button {...props} disabled>
          <Loader className="animate-spin mr-3" />
          Carregando...
        </Button>
      ) : (
        <Button {...props}>{children}</Button>
      )}
    </>
  );
};

export default MainButton;

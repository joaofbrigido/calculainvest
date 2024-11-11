import { SwitchProps } from "@radix-ui/react-switch";
import { Switch } from "../ui/switch";

type SwitchAutomaticPriceProps = SwitchProps & {
  label: string;
  description?: string;
  className?: string;
};

export const SwitchAutomaticPrice = ({
  label,
  description,
  className,

  ...props
}: SwitchAutomaticPriceProps) => {
  return (
    <div>
      <div className={`flex items-center gap-3 ${className}`}>
        <Switch {...props} />
        <div>
          <label htmlFor={props.name} className="font-medium">
            {label}
          </label>
          {description && (
            <p className="text-sm text-stone-400">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

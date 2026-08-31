import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type NativeSelectProps = {
  label?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: ReadonlyArray<readonly [string, string]>;
  compact?: boolean;
  highlightWhenSet?: boolean;
  className?: string;
};

/**
 * Styled native select used on filter bars. Native is used (not the popup Select)
 * so filter rows stay compact like the Figma prototype.
 */
export function NativeSelect({
  label,
  name,
  value,
  defaultValue,
  onChange,
  options,
  compact = false,
  highlightWhenSet = false,
  className,
}: NativeSelectProps) {
  const isActive = highlightWhenSet && value !== undefined && value !== "all";

  return (
    <div className={cn("flex flex-col gap-1.5", compact && "flex-row items-center gap-1")}>
      {label ? (
        compact ? (
          <span className="text-xs font-medium text-muted-foreground">{label}:</span>
        ) : (
          <Label className="font-semibold text-foreground">{label}</Label>
        )
      ) : null}
      <select
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        className={cn(
          "rounded-[6px] border bg-white text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30",
          compact ? "px-2 py-1 text-xs" : "w-full px-3 py-2.5 text-sm",
          isActive ? "border-primary font-semibold text-primary" : "border-border",
          className,
        )}
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}

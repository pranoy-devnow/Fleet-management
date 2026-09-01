import { Search } from "lucide-react";

/**
 * Search row used by the header popover and the registration country list.
 * Icon plus an unstyled input, sitting on a hairline above the results.
 *
 * @param value - Current query
 * @param onChange - Receives the new query
 * @param placeholder - Hint text
 * @param label - Accessible name for the input
 * @param id - Optional id when a trigger needs `aria-controls`
 * @param inputRef - Optional ref so a parent can focus the field
 */
export function SearchInputRow({
  value,
  onChange,
  placeholder,
  label,
  id,
  inputRef,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label?: string;
  id?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-black/6 px-3.5 py-2">
      <Search size={15} aria-hidden="true" className="shrink-0 text-muted-foreground" />
      <input
        id={id}
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label ?? placeholder}
        className="h-8 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

import { Search } from "lucide-react";

/**
 * Rounded search field used above grouped lists.
 */
export function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="flex h-9 min-w-[14rem] flex-1 items-center gap-2 rounded-full bg-black/5 px-3.5 focus-within:bg-black/8">
      <Search size={15} className="shrink-0 text-muted-foreground" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
    </label>
  );
}

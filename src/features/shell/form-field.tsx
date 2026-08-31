import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
};

/**
 * Labeled text input used on auth and firmware forms.
 */
export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name} className="font-semibold text-foreground">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-auto rounded-[6px] bg-white px-3 py-2.5 placeholder:text-[#9CA3AF]"
      />
    </div>
  );
}

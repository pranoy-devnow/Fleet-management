import { AlertTriangle } from "lucide-react";

/**
 * Design-note callout from the prototype. These mark open product questions,
 * not production copy.
 */
export function AmberCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 rounded-[6px] border border-dashed border-amber-400 bg-amber-50 p-3">
      <AlertTriangle className="mt-0.5 shrink-0 text-amber-500" size={15} />
      <p className="text-xs leading-relaxed text-amber-800">{children}</p>
    </div>
  );
}

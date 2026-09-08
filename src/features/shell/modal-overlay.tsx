"use client";

import { useDismiss } from "@/features/shell/use-dismiss";
import { cn } from "@/lib/utils";

/**
 * Dimmed backdrop with a centered dialog, dismissible by Escape or an outside
 * press. It owns the scrim and the dialog semantics only — children bring their
 * own surface, since a form card and a detail card look nothing alike.
 *
 * @param labelledBy - Id of the element naming the dialog, usually its heading
 * @param onDismiss - Called on Escape or a press outside the dialog
 * @param className - Overrides the dialog width, which defaults to `max-w-md`
 * @param children - The dialog surface
 */
export function ModalOverlay({
  labelledBy,
  onDismiss,
  className,
  children,
}: {
  labelledBy: string;
  onDismiss: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  const dialogRef = useDismiss<HTMLDivElement>(true, onDismiss);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={cn("w-full max-w-md", className)}
      >
        {children}
      </div>
    </div>
  );
}

"use client";

import { useId } from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModalOverlay } from "@/features/shell/modal-overlay";
import { Panel } from "@/features/shell/panel";

/**
 * Asks the user to confirm an action that cannot be undone.
 *
 * Cancel comes first and is the safe default, so a stray Enter or a mistimed
 * click does not destroy anything.
 *
 * @param title - What is about to happen, naming the affected thing
 * @param description - The consequence, in one line
 * @param confirmLabel - Verb for the destructive button, e.g. "Remove device"
 * @param error - Message from a failed confirm, shown in place
 * @param onConfirm - Runs the action
 * @param onCancel - Closes the dialog, also from Escape or an outside press
 */
export function ConfirmDialog({
  title,
  description,
  confirmLabel,
  error,
  onConfirm,
  onCancel,
}: {
  title: string;
  description: string;
  confirmLabel: string;
  error?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const titleId = useId();

  return (
    <ModalOverlay labelledBy={titleId} onDismiss={onCancel} className="max-w-sm">
      <Panel className="p-6">
        <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle size={20} className="text-destructive" />
        </div>

        <h2 id={titleId} className="text-lg font-bold text-foreground">
          {title}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>

        {error ? (
          <p role="alert" className="mt-3 text-sm font-medium text-destructive">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="h-auto rounded-[6px] px-4 py-2.5"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            className="h-auto rounded-[6px] px-4 py-2.5"
          >
            {confirmLabel}
          </Button>
        </div>
      </Panel>
    </ModalOverlay>
  );
}

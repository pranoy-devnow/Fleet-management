"use client";

import { useEffect, useRef } from "react";

/**
 * Closes a popover on outside pointer press or Escape.
 *
 * @param open - Whether the popover is currently open; listeners only attach while true
 * @param onDismiss - Called once when the user presses outside the root or hits Escape
 * @returns Ref to attach to the element that wraps both the trigger and the popover
 */
export function useDismiss<T extends HTMLElement = HTMLDivElement>(
  open: boolean,
  onDismiss: () => void,
) {
  const rootRef = useRef<T>(null);
  // Read the latest callback through a ref so a caller passing an inline
  // closure does not detach and reattach the listeners on every render.
  const dismissRef = useRef(onDismiss);

  useEffect(() => {
    dismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) dismissRef.current();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") dismissRef.current();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return rootRef;
}

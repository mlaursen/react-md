import { type CreateToastOptions, addToast } from "@react-md/core";

const TOASTS = ["copied", "generating-icons"] as const;

// use set for faster lookup
const TOAST_IDS = new Set(TOASTS);

export type ToastId = (typeof TOASTS)[number];

export function assertKnownToast(toastId: string): asserts toastId is ToastId {
  if (!TOAST_IDS.has(toastId as ToastId)) {
    throw new Error(`Unsupported toastId: ${toastId}`);
  }
}

export function addAppToast(
  options: CreateToastOptions & { toastId: ToastId }
): void {
  addToast({
    ...options,
    visibleTime:
      options.toastId === "generating-icons" ? null : options.visibleTime,
  });
}

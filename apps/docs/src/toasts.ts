import { type CreateToastOptions, ToastManager } from "@react-md/core";

export const appToastManager = new ToastManager();

const TOASTS = ["copied"] as const;

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
  appToastManager.addToast(options);
}

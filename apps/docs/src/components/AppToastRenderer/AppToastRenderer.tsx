import type { CreateToastOptions, ToastRendererProps } from "@react-md/core";
import { DefaultToastRenderer, ToastContent, addToast } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { ReactElement, ReactNode } from "react";

import styles from "./AppToastRenderer.module.scss";

const TOASTS = ["copied", "generating-icons"] as const;

// use set for faster lookup
const TOAST_IDS = new Set(TOASTS);

export type ToastId = (typeof TOASTS)[number];

function assertKnownToast(toastId: string): asserts toastId is ToastId {
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

const TOAST_MESSAGES: Record<string, ReactNode> = {
  copied: "Copied to clipboard!",
};

export function AppToastRenderer(props: ToastRendererProps): ReactElement {
  const { toastId, className } = props;
  assertKnownToast(toastId);

  const isGenerating = toastId === "generating-icons";

  return (
    <DefaultToastRenderer
      {...props}
      closeButton
      disableToastContent
      className={cnb(className, isGenerating && styles.relative)}
    >
      <ToastContent>{TOAST_MESSAGES[toastId]}</ToastContent>
    </DefaultToastRenderer>
  );
}

import type { CreateToastOptions, ToastRendererProps } from "@react-md/core";
import {
  addToast,
  HideToastProvider,
  Toast,
  ToastContent,
  useToast,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import type { ReactElement, ReactNode } from "react";
import { lazy, Suspense } from "react";

import styles from "./AppToastRenderer.module.scss";

const GeneratingIconsToast = lazy(() => import("./GeneratingIconsToast"));

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
  addToast(options);
}

const TOAST_MESSAGES: Record<string, ReactNode> = {
  copied: "Copied to clipboard!",
};

export function AppToastRenderer(props: ToastRendererProps): ReactElement {
  const {
    toastId,
    updated,
    duplicates,
    visibleTime: propVisibleTime,
    toastDefaults,
    className,
    ...remaining
  } = props;
  assertKnownToast(toastId);

  const isGenerating = toastId === "generating-icons";
  const visibleTime = isGenerating ? null : propVisibleTime;

  const {
    visible,
    hideToast,
    removeToast,
    startExitTimeout,
    pauseExitTimeout,
    resumeExitTimeout,
  } = useToast({
    toastId,
    updated,
    duplicates,
    visibleTime,
  });

  return (
    <HideToastProvider value={hideToast}>
      <Toast
        {...toastDefaults}
        closeButton
        {...remaining}
        visible={visible}
        onEntered={startExitTimeout}
        onExited={removeToast}
        onMouseEnter={pauseExitTimeout}
        onMouseLeave={resumeExitTimeout}
        disableToastContent
        className={cnb(className, isGenerating && styles.relative)}
      >
        {isGenerating ? (
          <Suspense fallback={null}>
            <GeneratingIconsToast />
          </Suspense>
        ) : (
          <ToastContent>{TOAST_MESSAGES[toastId]}</ToastContent>
        )}
      </Toast>
    </HideToastProvider>
  );
}

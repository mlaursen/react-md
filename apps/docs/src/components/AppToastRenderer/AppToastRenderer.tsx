import { assertKnownToast } from "@/toasts.js";
import {
  DefaultToastRenderer,
  ToastContent,
  type ToastRendererProps,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode } from "react";
import styles from "./AppToastRenderer.module.scss";

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

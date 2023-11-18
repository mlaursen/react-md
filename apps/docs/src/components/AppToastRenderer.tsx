import { assertKnownToast } from "@/toasts.js";
import {
  DefaultToastRenderer,
  ToastContent,
  type ToastRendererProps,
} from "@react-md/core";
import { type ReactElement, type ReactNode } from "react";

const TOAST_MESSAGES: Record<string, ReactNode> = {
  copied: "Copied to clipboard!",
};

export function AppToastRenderer(props: ToastRendererProps): ReactElement {
  const { toastId } = props;
  assertKnownToast(toastId);

  return (
    <DefaultToastRenderer {...props} closeButton disableToastContent>
      <ToastContent>{TOAST_MESSAGES[toastId]}</ToastContent>
    </DefaultToastRenderer>
  );
}

"use client";
import { addAppToast } from "@/toasts.js";
import { Button, Tooltip, useTooltip, type ButtonProps } from "@react-md/core";
import ContentCopyOutlinedIcon from "@react-md/material-icons/ContentCopyOutlinedIcon";
import { type ReactElement } from "react";

export type CopyToClipboardProps = Omit<
  ButtonProps,
  "buttonType" | "onClick" | "children"
>;

export function CopyToClipboard(props: CopyToClipboardProps): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    hoverTime: 0,
    defaultPosition: "left",
  });
  return (
    <>
      <Button
        {...props}
        {...elementProps}
        aria-label="Copy"
        buttonType="icon"
        onClick={async (event) => {
          const codeEl =
            event.currentTarget.parentElement?.querySelector("pre");
          if (!(codeEl instanceof HTMLElement)) {
            return;
          }
          const code = codeEl.textContent || "";

          await navigator.clipboard.writeText(code.trim());
          addAppToast({ toastId: "copied" });
        }}
      >
        <ContentCopyOutlinedIcon />
      </Button>
      <Tooltip {...tooltipProps}>Copy code to clipboard</Tooltip>
    </>
  );
}

"use client";
import { LIGHT_BG_THEMES } from "@/prism-themes/themes.js";
import { usePrismThemeContext } from "@/providers/PrismThemeProvider.jsx";
import { addAppToast } from "@/toasts.js";
import { Button, Tooltip, useTooltip, type ButtonProps } from "@react-md/core";
import ContentCopyOutlinedIcon from "@react-md/material-icons/ContentCopyOutlinedIcon";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import styles from "./CopyToClipboard.module.scss";

export type CopyToClipboardProps = Omit<
  ButtonProps,
  "buttonType" | "onClick" | "children"
>;

export function CopyToClipboard(props: CopyToClipboardProps): ReactElement {
  const { className, ...remaining } = props;
  const { elementProps, tooltipProps } = useTooltip({
    hoverTimeout: 0,
    defaultPosition: "left",
  });
  const { prismTheme } = usePrismThemeContext();
  return (
    <>
      <Button
        {...remaining}
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
        className={cnb(
          LIGHT_BG_THEMES.has(prismTheme) ? styles.light : styles.dark,
          className
        )}
      >
        <ContentCopyOutlinedIcon />
      </Button>
      <Tooltip {...tooltipProps}>Copy code to clipboard</Tooltip>
    </>
  );
}

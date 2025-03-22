import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactElement } from "react";

import { InlineCode, type InlineCodeProps } from "./InlineCode.js";

const NBSP = "\u00A0";

export interface ColorPreviewProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
  codeProps?: InlineCodeProps;
  disableCode?: boolean;
}

/**
 * Creates an inline preview for a color. It will also add a tooltip while
 * hovered for a slightly larger preview.
 */
export function ColorPreview(props: ColorPreviewProps): ReactElement {
  const { color, className, codeProps, disableCode, ...remaining } = props;

  return (
    <span
      {...remaining}
      style={{ "--color": color }}
      className={cnb(
        "color-preview",
        disableCode && "color-preview--color-only",
        className
      )}
    >
      {disableCode ? NBSP : <InlineCode {...codeProps}>{color}</InlineCode>}
    </span>
  );
}

declare module "react" {
  interface CSSProperties {
    "--color"?: string;
    "--text-color"?: string;
  }
}

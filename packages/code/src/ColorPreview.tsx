import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactElement } from "react";
import { InlineCode, type InlineCodeProps } from "./InlineCode.js";

export interface ColorPreviewProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
  codeProps?: InlineCodeProps;
}

/**
 * Creates an inline preview for a color. It will also add a tooltip while
 * hovered for a slightly larger preview.
 */
export function ColorPreview(props: ColorPreviewProps): ReactElement {
  const { color, className, codeProps, ...remaining } = props;

  return (
    <span
      {...remaining}
      style={{ "--color": color }}
      className={cnb("color-preview", className)}
    >
      <InlineCode {...codeProps}>{color}</InlineCode>
    </span>
  );
}

declare module "react" {
  interface CSSProperties {
    "--color"?: string;
    "--text-color"?: string;
  }
}

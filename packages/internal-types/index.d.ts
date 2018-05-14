import * as React from "react";
export type FontWeights = "thin" | "light" | "regular" | "medium" | "bold" | "black" | null;
export type TextDecorations = "overline" | "underline" | "line-through" | "none" | "initial" | "inherit" | null;
export type TextAligns = "left" | "center" | "right" | "justify" | "initial" | "inherit" | null;

export interface IBaseStylingProps {
  style?: React.CSSProperties;
  className?: string;
}

export interface IBaseProps extends IBaseStylingProps {
  id?: string;
}

export type RenderContainer = HTMLElement | null;


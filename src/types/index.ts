import * as React from "react";
export type Id = string | number;
export type FontWeights = "light" | "regular" | "medium" | "semibold" | "bold" | null;
export type TextDecorations = "overline" | "underline" | "line-through" | "none" | "initial" | "inherit" | null;
export type TextAligns = "left" | "center" | "right" | "justify" | "initial" | "inherit" | null;

export interface IBaseStylingProps {
  style?: React.CSSProperties;
  className?: string;
}

export interface IBaseProps extends IBaseStylingProps {
  id?: Id;
}

export type RenderContainer = HTMLElement | null;

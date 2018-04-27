import * as React from 'react';
export type Id = string | number;
export type FontWeights = 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | null;
export type TextDecorations = 'overline' | 'underline' | 'line-through' | 'none' | 'initial' | 'inherit' | null;
export type TextAligns = 'left' | 'center' | 'right' | 'justify' | 'initial' | 'inherit' | null;

export interface BaseProps {
  id?: Id;
  style?: React.CSSProperties;
  className?: string;
}

export interface BaseStylingProps {
  style?: React.CSSProperties;
  className?: string;
}


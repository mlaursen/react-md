import * as React from 'react';
import { Props } from '../index';
import { InjectedTooltipProps, TooltippedComponent } from '../Tooltips';
import { InjectedInkProps } from '../Inks';

export type ButtonTypes = 'button' | 'submit' | 'reset';
type FixedPositions = 'tr' | 'tl' | 'br' | 'bl';

export interface ButtonProps extends Props, InjectedTooltipProps, InjectedInkProps {
  label?: React.ReactNode;
  iconBefore?: boolean;
  children?: React.ReactNode;
  iconClassName?: string;
  type?: ButtonTypes;
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  href?: string;
  component?: React.ReactType;
  fixed?: boolean;
  fixedPosition?: FixedPositions;
  mini?: boolean;
  flat?: boolean;
  raised?: boolean;
  icon?: boolean;
  floating?: boolean;
  forceIconSize?: boolean | number;
  forceIconFontSize?: boolean;
  noIcon?: boolean;
}

interface ButtonComponent extends React.ComponentClass<ButtonProps> {
  createInk(pageX?: number, pageY?: number): void;
  focus(): void;
  getComposedComponent(): TooltippedComponent;
}

declare const Button: ButtonComponent;
export default Button;

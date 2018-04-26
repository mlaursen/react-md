import * as React from 'react';
import { Props } from '../index';
import { InjectedTooltipProps, TooltippedComponent } from '../Tooltips';
import { InjectedInkProps } from '../Inks';

export type ButtonTypes = 'button' | 'submit' | 'reset';
type FixedPositions = 'tr' | 'tl' | 'br' | 'bl';

export interface SharedButtonProps {
  tabIndex?: number;
  iconBefore?: boolean;
  type?: ButtonTypes;
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  href?: string;
  mini?: boolean;
  flat?: boolean;
  raised?: boolean;
  icon?: boolean;
  floating?: boolean;
  iconClassName?: string;
  iconChildren?: React.ReactNode;
  iconEl?: React.ReactElement<any>;
  svg?: boolean;
  forceIconSize?: boolean | number;
  forceIconFontSize?: boolean;
  swapTheming?: boolean;

  /**
   * @deprecated
   */
  label?: React.ReactNode;
}

export interface ButtonProps extends Props, SharedButtonProps, InjectedTooltipProps, InjectedInkProps {
  // for the `component` prop until refactored out
  [key: string]: any;

  children?: React.ReactNode;
  component?: React.ReactType;
  fixed?: boolean;
  fixedPosition?: FixedPositions;
}

export interface ButtonComponent extends React.ComponentClass<ButtonProps> {
  createInk(pageX?: number, pageY?: number): void;
  focus(): void;
  getComposedComponent(): TooltippedComponent;
}

declare const Button: ButtonComponent;
export default Button;

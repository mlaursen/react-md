import * as React from 'react';
import { IdPropType } from '../index';
import { SharedDropdownMenuProps } from './DropdownMenu';
import { HorizontalAnchors, VerticalAnchors, LayoverPositions } from '../Helpers/Layover';
import { SharedButtonProps } from '../Buttons/Button';
import { InjectedInkProps } from '../Inks/injectInk';
import { InjectedTooltipProps } from '../Tooltips/injectTooltip';

export interface MenuButtonProps extends SharedDropdownMenuProps, SharedButtonProps, InjectedTooltipProps, InjectedInkProps {
  children?: React.ReactNode;
  simplifiedMenu?: boolean;
  onMenuClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuMouseDown?: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuMouseUp?: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuMouseMove?: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuTouchCancel?: (event: React.TouchEvent<HTMLElement>) => void;
  onMenuTouchEnd?: (event: React.TouchEvent<HTMLElement>) => void;
  onMenuTouchMove?: (event: React.TouchEvent<HTMLElement>) => void;
  onMenuTouchStart?: (event: React.TouchEvent<HTMLElement>) => void;
  onMenuFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onMenuBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  onMenuKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onMenuKeyUp?: (event: React.KeyboardEvent<HTMLElement>) => void;

  /**
   * @deprecated
   * */
  buttonChildren?: React.ReactNode;

  /**
   * @deprecated
   * */
  onMenuToggle?: Function;

  /**
   * @deprecated
   * */
  isOpen?: boolean;

  /**
   * @deprecated
   * */
  defaultOpen?: boolean;
}

export interface MenuButtonComponent extends React.ComponentClass<MenuButtonProps> {
  Positions: LayoverPositions;
  HorizontalAnchors: HorizontalAnchors;
  VerticalAnchors: VerticalAnchors;
}

declare const MenuButton: MenuButtonComponent;
export default MenuButton;

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

interface MenuButtonComponent extends React.ComponentClass<MenuButtonProps> {
  Positions: LayoverPositions;
  HorizontalAnchors: HorizontalAnchors;
  VerticalAnchors: VerticalAnchors;
}

declare const MenuButton: MenuButtonComponent;
export default MenuButton;

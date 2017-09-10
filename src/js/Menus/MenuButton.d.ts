import * as React from 'react';
import { IdPropType } from '../index';
import { SharedDropdownMenuProps } from './DropdownMenu';
import { HorizontalAnchors, VerticalAnchors, LayoverPositions } from '../Helpers/Layover';
import { SharedButtonProps } from '../Buttons/Button';

export interface MenuButtonProps extends SharedDropdownMenuProps, SharedButtonProps {
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

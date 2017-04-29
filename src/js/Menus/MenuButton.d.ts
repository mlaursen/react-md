import * as React from 'react';
import { IdPropType } from '../index';
import { DropdownMenuProps } from './DropdownMenu';
import { HorizontalAnchors, VerticalAnchors, LayoverPositions } from '../Helpers/Layover';

export interface MenuButtonProps extends DropdownMenuProps {
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

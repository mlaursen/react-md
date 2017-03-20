import * as React from 'react';
import { IdPropType } from '../index';
import {
  LayoverAnchor,
  SharedLayoverProps,
  HorizontalAnchors,
  HorizontalAnchorsEnum,
  VerticalAnchors,
  VerticalAnchorsEnum,
  LayoverPositions,
  LayoverPositionsEnum,
  toggleQueryFn,
} from '../Helpers';

export interface SharedMenuProps extends SharedLayoverProps {
  listId?: IdPropType;
  listProps?: {};
  listStyle?: React.CSSProperties;
  listClassName?: string;
  listInline?: boolean;
  listZDepth?: number;
  listHeightRestricted?: boolean;
}

interface MenuProps extends SharedMenuProps {
  component?: Function | string;
  visible: boolean;
  children?: React.ReactNode;
  cascading?: boolean;
  cascadingAnchor?: LayoverAnchor;
  cascadingZDepth?: number;
  onContextMenu?: (event: React.MouseEvent<HTMLElement>) => void;
  preventContextMenu?: boolean;
  toggleQuery?: string | {} | toggleQueryFn;
  position?: LayoverPositions | LayoverPositionsEnum;

  /**
   * @deprecated
   * */
  isOpen?: boolean;

  /**
   * @deprecated
   * */
  close?: Function;

  /**
   * @deprecated
   * */
  autoclose?: boolean;

  /**
   * @deprecated
   * */
  contained?: boolean;

  /**
   * @deprecated
   * */
  limitHeight?: boolean;

  /**
   * @deprecated
   * */
  expanderIconClassName?: string;

  /**
   * @deprecated
   * */
  expanderIconChildren?: React.ReactNode;
}

interface MenuButtonProps extends SharedMenuProps {
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean, e: React.MouseEvent<HTMLElement>) => void;
  cascading?: boolean;
  cascadingAnchor?: { x: HorizontalAnchors | HorizontalAnchorsEnum, y: VerticalAnchors | VerticalAnchorsEnum };
  cascadingZDepth?: number;
  menuItems?: number | string | {} | React.ReactNode | Array<number | string | {} | React.ReactNode>;
  children?: React.ReactNode;
  position?: LayoverPositions | LayoverPositionsEnum;

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

export default class Menu extends React.Component<MenuProps, {}> {
  static Positions: LayoverPositions | LayoverPositionsEnum;
  static HorizontalAnchors: HorizontalAnchors | HorizontalAnchorsEnum;
  static VerticalAnchors: VerticalAnchors | VerticalAnchorsEnum;
}
export { Menu };

export class MenuButton extends React.Component<MenuButtonProps, {}> {
  static Positions: LayoverPositions | LayoverPositionsEnum;
  static HorizontalAnchors: HorizontalAnchors | HorizontalAnchorsEnum;
  static VerticalAnchors: VerticalAnchors | VerticalAnchorsEnum;
}

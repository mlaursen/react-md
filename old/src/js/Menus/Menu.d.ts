import * as React from 'react';
import { IdPropType } from '../index';
import {
  toggleQueryFn,
  HorizontalAnchors,
  VerticalAnchors,
  LayoverPositions,
  LayoverAnchor,
  SharedLayoverProps,
} from '../Helpers/Layover';

export interface BaseMenuProps extends SharedLayoverProps {
  listId?: IdPropType;
  listProps?: {};
  listStyle?: React.CSSProperties;
  listClassName?: string;
  listInline?: boolean;
  listZDepth?: number;
  listHeightRestricted?: boolean;
}

export interface MenuProps extends BaseMenuProps {
  // for the `component` prop until refactored out
  [key: string]: any;

  component?: React.ReactType;
  visible: boolean;
  children?: React.ReactNode;
  cascading?: boolean;
  cascadingAnchor?: LayoverAnchor;
  cascadingZDepth?: number;
  onContextMenu?: (event: React.MouseEvent<HTMLElement>) => void;
  preventContextMenu?: boolean;
  toggleQuery?: string | {} | toggleQueryFn;
  position?: LayoverPositions;
  simplified?: boolean;

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

export interface MenuComponent extends React.ComponentClass<MenuProps> {
  Positions: {
    TOP_LEFT: 'tl',
    TOP_RIGHT: 'tr',
    BOTTOM_LEFT: 'bl',
    BOTTOM_RIGHT: 'br',
    BELOW: 'below'
  };
  VerticalAnchors: {
    TOP: 'top',
    CENTER: 'center',
    OVERLAP: 'overlap',
    BOTTOM: 'bottom'
  };
  HorizontalAnchors: {
    LEFT: 'left',
    INNER_LEFT: 'inner left',
    CENTER: 'center',
    RIGHT: 'right',
    INNER_RIGHT: 'inner right'
  };
}

declare const Menu: MenuComponent;
export default Menu;

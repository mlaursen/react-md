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
  component?: Function | string;
  visible: boolean;
  children?: React.ReactNode;
  cascading?: boolean;
  cascadingAnchor?: LayoverAnchor;
  cascadingZDepth?: number;
  onContextMenu?: (event: React.MouseEvent<HTMLElement>) => void;
  preventContextMenu?: boolean;
  toggleQuery?: string | {} | toggleQueryFn;
  position?: LayoverPositions;

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

interface MenuComponent extends React.ComponentClass<MenuProps> {
  Positions: LayoverPositions;
  HorizontalAnchors: HorizontalAnchors;
  VerticalAnchors: VerticalAnchors;
}

declare const Menu: MenuComponent;
export default MenuComponent;

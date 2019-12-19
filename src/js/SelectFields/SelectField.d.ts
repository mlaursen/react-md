import * as React from 'react';
import { IdPropType, Props } from '../index';
import { ListComponent } from '../Lists/List';
import { ListItemComponent } from '../Lists/ListItem';
import { SharedTextFieldProps } from '../TextFields';

import {
  LayoverPositions,
  HorizontalAnchors,
  VerticalAnchors,
} from '../Helpers/Layover';
import { BaseMenuProps } from '../Menus/Menu';

export type MenuItem = number | string | Object | React.ReactElement<any>;
export type MenuItemList = Array<MenuItem>;

export type ListValue = number | string;

export interface GetItemPropsParam {
  index: number;
  active: boolean;
  disabled: boolean;
  itemValue: any;
  value: ListValue;
  props: Object;
  item: number | string;
  field: SelectFieldComponent;
}

export interface GetActiveLabelParam {
  activeItem: MenuItem;
  activeIndex: number;
  activeLabel: string;
  activeValue: any;
  value: ListValue;
  menuItems: MenuItemList;
  field: SelectFieldComponent;
}

export interface ListScrollTopUpdateParam {
  listRef: ListComponent;
  listNode: HTMLElement;
  listScrollTop: number;
  newListScrollTop: number;
  listItems: ListItemComponent[];
  activeItemRef: ListItemComponent;
  activeItemNode: HTMLElement;
  activeIndex: number;
  field: SelectFieldComponent;
}

export interface FieldDataProps {
  id: string;
  name: string;
  value: ListValue;
}

export interface SharedSelectFieldProps extends BaseMenuProps, SharedTextFieldProps {
  id?: IdPropType;
  menuId?: IdPropType;
  listId?: IdPropType;
  listStyle?: React.CSSProperties;
  listClassName?: string;
  toggleStyle?: React.CSSProperties;
  toggleClassName?: string;
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean, event: React.MouseEvent<HTMLElement>) => void;
  menuItems?: MenuItemList;
  keyboardMatchingTimeout?: number;
  itemLabel?: string;
  itemValue?: string;
  itemProps?: string;
  name?: string;
  getItemProps?: (data: GetItemPropsParam) => Object;
  getActiveLabel?: (data: GetActiveLabelParam) => React.ReactNode;
  saveListScrollTop?: boolean;
  listScrollTopUpdate?: number | ((data: ListScrollTopUpdateParam) => number);
  defaultValue?: ListValue;
  value?: ListValue;
  onChange?: (value: ListValue, selectedIndex: number, event: React.MouseEvent<HTMLElement>, data: FieldDataProps) => void;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  dropdownIcon?: React.ReactElement<any>;
  toolbar?: boolean;
  stripActiveItem?: boolean;
  transitionName?: string;
  transitionTime?: number;
  menuTransitionName?: string;
  menuTransitionEnterTimeout?: number;
  menuTransitionLeaveTiemout?: number;
  deleteKeys?: number | string | Array<number | string>;
  simplifiedMenu?: boolean;
  position?: LayoverPositions;
}

export interface SelectFieldProps extends SharedSelectFieldProps {
  id: IdPropType;

  /**
   * @deprecated
   */
  isOpen?: boolean;

  /**
   * @deprecated
   */
  defaultOpen?: boolean;

  /**
   * @deprecated
   */
  initiallyOpen?: boolean;

  /**
   * @deprecated
   */
  onMenuToggle?: Function;

  /**
   * @deprecated
   */
  stretchList?: boolean;

  /**
   * @deprecated
   */
  menuStyle?: React.CSSProperties;

  /**
   * @deprecated
   */
  menuClassName?: string;

  /**
   * @deprecated
   */
  floatingLabel?: boolean;

  /**
   * @deprecated
   */
  noAutoAdjust?: boolean;

  /**
   * @deprecated
   */
  adjustMinWidth?: boolean;

  /**
   * @deprecated
   */
  iconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  iconClassName?: string;
}

export interface SelectFieldComponent extends React.ComponentClass<SelectFieldProps> {
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

declare const SelectField: SelectFieldComponent;
export default SelectField;

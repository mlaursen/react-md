import * as React from 'react';
import { IdPropType, Props } from '../index';
import { SharedTextFieldProps } from '../TextFields';

import {
  LayoverPositions,
  HorizontalAnchors,
  VerticalAnchors,
} from '../Helpers/Layover';
import { BaseMenuProps } from '../Menus/Menu';

export interface FieldDataProps {
  id: string;
  name: string;
  value: number | string;
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
  menuItems?: Array<number | string | Object | React.ReactElement<any>>;
  keyboardMatchingTimeout?: number;
  itemLabel?: string;
  itemValue?: string;
  itemProps?: string;
  name?: string;
  getItemProps?: (data: Object) => Object;
  defaultValue?: number | string;
  value?: number | string;
  onChange?: (value: number | string, selectedIndex: number, event: React.MouseEvent<HTMLElement>, data: FieldDataProps) => void;
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

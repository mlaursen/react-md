import * as React from 'react';
import { IdPropType, Props } from '../index';
import { SharedTextFieldProps } from '../TextFields';

import {
  LayoverPositions,
  HorizontalAnchors,
  VerticalAnchors,
} from '../Helpers/Layover';
import { BaseMenuProps } from '../Menus/Menu';

export interface SelectFieldProps extends BaseMenuProps, SharedTextFieldProps {
  id: IdPropType;
  menuId?: IdPropType;
  listId?: IdPropType;
  listStyle?: React.CSSProperties;
  listClassName?: string;
  toggleStyle?: React.CSSProperties;
  toggleClassName?: string;
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean, event: React.MouseEvent<HTMLElement>) => void;
  menuItems?: Array<number | string | Object>;
  keyboardMatchingTimeout?: number;
  itemLabel?: string;
  itemValue?: string;
  defaultValue?: number | string;
  value?: number | string;
  onChange?: (value: number | string, selectedIndex: number, event: React.MouseEvent<HTMLElement>) => void;
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

declare const SelectField: React.ComponentClass<SelectFieldProps>;
export default SelectField;

import * as React from 'react';
import { Props } from '../index';
import { TextFieldLineDirections } from '../TextFields';

import {
  LayoverPositions,
  LayoverPositionsEnum,
  HorizontalAnchors,
  HorizontalAnchorsEnum,
  VerticalAnchors,
  VerticalAnchorsEnum,
} from '../Helpers';
import { SharedMenuProps } from '../Menus';

interface SelectFieldProps extends SharedMenuProps {
  id: number | string;
  menuId?: number | string;
  listId?: number | string;
  listStyle?: React.CSSProperties;
  listClassName?: string;
  toggleStyle?: React.CSSProperties;
  toggleClassName?: string;
  inputStyle?: React.CSSProperties;
  inputClassName?: string;
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
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorText?: React.ReactNode;
  helpText?: React.ReactNode;
  helpOnFocus?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  iconChildren?: React.ReactNode;
  iconClassName?: string;
  toolbar?: boolean;
  stripActiveItem?: boolean;
  transitionName?: string;
  transitionTime?: number;
  menuTransitionName?: string;
  menuTransitionEnterTimeout?: number;
  menuTransitionLeaveTiemout?: number;

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
}

export default class SelectField extends React.Component<SelectFieldProps, {}> { }

import * as React from 'react';
import { IdPropType, Props } from '../index';

import { InjectedInkProps } from '../Inks';

interface AccessibleFakeButtonProps {
  tabbedClassName?: string;
  onTabFocus?: (event: Event) => void;
  component?: Function | string;
  tabIndex?: number;
  disabled?: boolean;
  role?: string;
  children?: React.ReactNode;
}

interface AccessibleFakeButtonPropsFull extends AccessibleFakeButtonProps, Props {
}

interface AccessibleFakeInkedButtonProps extends AccessibleFakeButtonProps, InjectedInkProps {
}

interface CollapseProps extends Props {
  defaultStyle?: React.CSSProperties;
  collapsed: boolean;
  springConfig: Object;
  children?: React.ReactElement<any>;
  animate?: boolean;
}

interface FocusContainerProps extends Props {
  component?: Function | string;
  children?: React.ReactNode;
  initialFocus?: string;
  focusOnMount?: boolean;
  additionalFocusKeys?: Array<number>;
  containFocus?: boolean;
}

interface IconSeparatorProps extends Props {
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  children?: React.ReactNode;
  iconBefore?: boolean;
  component?: Function | string;
}

type toggleQueryFn = () => string;

type HorizontalAnchors = 'left' | 'inner left' | 'center' | 'right' | 'inner right';
export enum HorizontalAnchorsEnum {
  LEFT,
  INNER_LEFT,
  CENTER,
  RIGHT,
  INNER_RIGHT
}

type VerticalAnchors = 'top' | 'center' | 'overlap' | 'bottom';
export enum VerticalAnchorsEnum {
  TOP,
  CENTER,
  OVERLAP,
  BOTTOM
}

type LayoverPositions = 'tl' | 'tr' | 'bl' | 'br' | 'below';

export enum LayoverPositionsEnum {
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  BELOW
}

interface LayoverProps extends Props {
  id?: IdPropType;
  style?: React.CSSProperties;
  className?: string;
  visible: boolean;
  fixedTo?: {} | { x?: {}, y?: {} };
  toggle?: React.ReactNode;
  toggleQuery?: string | {} | toggleQueryFn;
  children?: React.ReactElement<any>;
  block?: boolean;
  centered?: boolean;
  sameWidth?: boolean;
  onClose: Function;
  component?: string | Function;
  transitionName?: string;
  transitionEnterTimeout?: number;
  transitionLeaveTimeout?: number;
  xThreshold?: number;
  yThreshold?: number;
  closeOnOutsideClick?: boolean;
  anchor?: { x: HorizontalAnchors | HorizontalAnchorsEnum, y: VerticalAnchors | VerticalAnchorsEnum };
  animationPosition?: string | LayoverPositions | LayoverPositionsEnum;
}

interface PortalProps extends Props {
  visible: boolean;
  children?: React.ReactElement<any>;
  component?: string;
  onOpen?: Function;
  onClose?: Function;
  renderNode?: Object;
  lastChild?: boolean;
}

export class AccessibleFakeButton extends React.Component<AccessibleFakeButtonPropsFull, {}> {
  focus: () => void;
  blur: () => void;
}
export class AccessibleFakeInkedButton extends React.Component<AccessibleFakeInkedButtonProps, {}> {
  focus: () => void;
  blur: () => void;
}
export class Collapse extends React.Component<CollapseProps, {}> { }
export class FocusContainer extends React.Component<FocusContainerProps, {}> { }
export class IconSeparator extends React.Component<IconSeparatorProps, {}> { }
export class Layover extends React.Component<LayoverProps, {}> {
  static LayoverPositions: LayoverPositions | LayoverPositionsEnum;
  static VerticalAnchors: VerticalAnchors | VerticalAnchorsEnum;
  static HorizontalAnchors: HorizontalAnchors | HorizontalAnchorsEnum;
}
export class Portal extends React.Component<PortalProps, {}> { }

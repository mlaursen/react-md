import * as React from 'react';
import { Props } from '../index';

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
  children: React.ReactElement<any>;
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
  children: React.ReactNode;
  iconBefore?: boolean;
  component?: Function | string;
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
export class Portal extends React.Component<PortalProps, {}> { }

import * as React from 'react';
import { Props } from '../index';

export interface BottomNavigationProps extends Props {
  links: Array<{
    label: React.ReactNode,
    iconChildren?: React.ReactNode,
    iconClassName?: string,
    component?: React.ReactType
  }>;
  colored?: boolean;
  dynamic?: boolean;
  dynamicThreshold?: number;
  onNavChange?: (activeIndex: number, event: React.MouseEvent<HTMLElement>) => void;
  activeIndex?: number;
  defaultActiveIndex?: number;
  defaultVisible?: boolean;
  component?: React.ReactType;
  renderNode?: Object;
  transitionDuration?: number;
  onVisibilityChange?: (visible: boolean) => void;
  lastChild?: boolean;
  animate?: boolean;
  portal?: boolean;
}

declare const BottomNavigation: React.ComponentClass<BottomNavigationProps>;
export default BottomNavigation;

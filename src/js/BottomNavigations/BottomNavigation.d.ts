import * as React from 'react';
import { Props } from '../index';

export interface BottomNavigationProps extends Props {
  // for the `component` prop until refactored out
  [key: string]: any;

  links: Array<{
    // for the `component` prop until refactored out
    [key: string]: any;

    label: React.ReactNode,
    icon?: React.ReactElement<any>,
    component?: React.ReactType,

    /**
     * @deprecated
     */
    iconChildren?: React.ReactNode,

    /**
     * @deprecated
     */
    iconClassName?: string
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

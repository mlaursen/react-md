import * as React from 'react';
import { Props } from '../index';

export type MobileDrawerType = 'temporary' | 'temporary-mini';
export type DrawerType = 'full-height' | 'clipped' | 'floating' | 'persistent' | 'persistent-mini' | MobileDrawerType;

export type MediaType = 'mobile' | 'tablet' | 'desktop';
export type DrawerPosition = 'left' | 'right';

export interface DrawerProps extends Props {
  // for the `component` prop until refactored out
  [key: string]: any;

  navStyle?: React.CSSProperties;
  navClassName?: string;
  overlayStyle?: React.CSSProperties;
  overlayClassName?: string;
  component?: React.ReactType;
  navItems?: Array<React.ReactElement<any> | { divider?: boolean, subheader?: boolean, primaryText?: string }>;
  autoclose?: boolean;
  header?: React.ReactNode;
  mobileType?: MobileDrawerType;
  mobileMinWidth?: number;
  tabletType?: DrawerType;
  tabletMinWidth?: number;
  desktopType?: DrawerType;
  desktopMinWidth?: number;
  type?: DrawerType;
  onMediaTypeChange?: (type: DrawerType, media: { mobile: boolean, tablet: boolean, desktop: boolean }) => void;
  onVisibilityChange?: (visible: boolean, event: React.MouseEvent<HTMLElement>) => void;
  defaultMedia?: MediaType;
  overlay?: boolean;
  portal?: boolean;
  renderNode?: Object;
  lastChild?: boolean;
  defaultVisible?: boolean;
  visible?: boolean;
  position?: DrawerPosition;
  inline?: boolean;
  transitionDuration?: number;
  clickableDesktopOverlay?: boolean;
  children?: React.ReactNode;
  constantType?: boolean;

  /**
   * @deprecated
   */
  onVisibilityToggle?: (visible: boolean, event: React.MouseEvent<HTMLElement>) => void;
}

interface DrawerComponent extends React.ComponentClass<DrawerProps> {
  DrawerTypes: {
    // Permanent drawers
    FULL_HEIGHT: 'full-height',
    CLIPPED: 'clipped',
    FLOATING: 'floating',

    // Persistent drawers
    PERSISTENT: 'persistent',
    PERSISTENT_MINI: 'persistent-mini',

    // Temporary
    TEMPORARY: 'temporary',
    TEMPORARY_MINI: 'temporary-mini',
  };
  getCurrentMedia(props?: {
    mobileMinWidth: number,
    tabletMinWidth: number,
    desktopMinWidth: number,
    mobileType: MobileDrawerType,
    tabletType: DrawerType,
    desktopType: DrawerType,
  }): { type: DrawerType, mobile: boolean, tablet: boolean, desktop: boolean };

  matchesMedia(min: number, max?: number): boolean;
}

declare const Drawer: DrawerComponent;
export default Drawer;

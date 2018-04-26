import * as React from 'react';
import { Props, IdPropType } from '../index';

export type MobileDrawerType = 'temporary' | 'temporary-mini';
export type DrawerType = 'full-height' | 'clipped' | 'floating' | 'persistent' | 'persistent-mini' | MobileDrawerType;

export type MediaType = 'mobile' | 'tablet' | 'desktop';
export type DrawerPosition = 'left' | 'right';

interface NavItem {
  // This is really any shape, but give some *hints* about additional formatting behind the scenes
  [key: string]: any;
  divider?: boolean;
  subheader?: boolean;
  primaryText?: React.ReactNode;
}

export interface SharedDrawerProps extends Props {
  navItemsId?: IdPropType;
  navStyle?: React.CSSProperties;
  navClassName?: string;
  overlayStyle?: React.CSSProperties;
  overlayClassName?: string;
  navItems?: Array<React.ReactElement<any> | NavItem>;
  children?: React.ReactNode;
  defaultMedia?: MediaType;
  onMediaTypeChange?: (type: DrawerType, media: { mobile: boolean, tablet: boolean, desktop: boolean }) => void;
  overlay?: boolean;
  portal?: boolean;
  renderNode?: Object;
  lastChild?: boolean;
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean, event: React.MouseEvent<HTMLElement>) => void;
  position?: DrawerPosition;
  inline?: boolean;
  clickableDesktopOverlay?: boolean;
  autocloseAfterInk?: boolean;

  autoclose?: boolean;
}

export interface DrawerProps extends SharedDrawerProps {
  // for the `component` prop until refactored out
  [key: string]: any;

  component?: React.ReactType;
  header?: React.ReactNode;
  mobileType?: MobileDrawerType;
  mobileMinWidth?: number;
  tabletType?: DrawerType;
  tabletMinWidth?: number;
  desktopType?: DrawerType;
  desktopMinWidth?: number;
  type?: DrawerType;
  transitionDuration?: number;
  constantType?: boolean;
  zDepth?: number;

  /**
   * @deprecated
   */
  onVisibilityToggle?: (visible: boolean, event: React.MouseEvent<HTMLElement>) => void;
}

export interface DrawerComponent extends React.ComponentClass<DrawerProps> {
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

import * as React from 'react';
import { Props } from '../index';

export enum DrawerTypes {
  // Permanent drawers
  FULL_HEIGHT,
  CLIPPED,
  FLOATING,

  // Persistent drawers
  PERSISTENT,
  PERSISTENT_MINI,

  // Temporary
  TEMPORARY,
  TEMPORARY_MINI,
}

export type DrawerTypesType = 'full-height' | 'clipped' | 'floating' | 'persistent' | 'persistent-mini' | 'temporary' | 'temporary-mini';

export type MediaTypes = 'mobile' | 'tablet' | 'desktop';
export type DrawerPositions = 'left' | 'right';

interface DrawerProps extends Props {
  navStyle?: React.CSSProperties;
  navClassName?: string;
  component?: Function | string;
  navItems?: Array<React.ReactElement<any> | { divider?: boolean, subheader?: boolean, primaryText?: string }>;
  autoclose?: boolean;
  header?: React.ReactNode;
  mobileType?: 'temporary' | 'temporary-mini';
  mobileMinWidth?: number;
  tabletType?: DrawerTypes | DrawerTypesType;
  tabletMinWidth?: number;
  desktopType?: DrawerTypes | DrawerTypesType;
  desktopMinWidth?: number;
  type?: DrawerTypes | DrawerTypesType;
  onMediaTypeChange?: (type: DrawerTypesType, media: { mobile: boolean, tablet: boolean, desktop: boolean }) => void;
  defaultMedia: MediaTypes;
  overlay?: boolean;
  renderNode?: Object;
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibilityToggle?: (visible: boolean, event: Event) => void;
  position?: DrawerPositions;
  inline?: boolean;
  transitionDuration?: number;
  clickableDesktopOverlay?: boolean;
  closeOnNavItemClick?: boolean;
  children?: React.ReactNode;
}

export default class Drawer extends React.Component<DrawerProps, {}> {
  static DrawerTypes: DrawerTypes;
  static getCurrentMedia(props?: {
    mobileMinWidth: number,
    tabletMinWidth: number,
    desktopMinWidth: number,
    mobileType: 'temporary' | 'temporary-mini',
    tabletType: DrawerTypes | DrawerTypesType,
    desktopType: DrawerTypes | DrawerTypesType,
  }): { type: DrawerTypesType, mobile: boolean, tablet: boolean, desktop: boolean };

  static matchesMedia(min: number, max?: number): boolean;
}

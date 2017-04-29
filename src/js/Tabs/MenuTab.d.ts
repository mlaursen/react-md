import * as React from 'react';
import { IdPropType, Props } from '../index';
import { TabProps as Tab } from './Tab';

export interface MenuTabProps extends Props {
  id: IdPropType;
  activeTabIndex: number;
  overflowAtIndex: number;
  tabs: Array<React.ReactElement<Tab> | string | { divider?: boolean, subheader?: boolean, primaryText?: string }>
  tabStyle?: React.CSSProperties;
  tabClassName?: string;
  label: React.ReactNode;
}

declare const MenuTab: React.ComponentClass<MenuTabProps>;
export default MenuTab;

import * as React from 'react';
import { IdPropType, Props } from '../index';
import { TabProps as Tab } from './Tab';
import { MediaType } from '../Drawers';

export interface TabsProps extends Props {
  // for the `component` prop until refactored out
  [key: string]: any;

  activeTabClassName?: string;
  inactiveTabClassName?: string;
  tabId: IdPropType;
  component?: React.ReactType;
  children?: React.ReactElement<Tab> | Array<React.ReactElement<Tab>>;
  centered?: boolean;
  alignToKeyline?: boolean;
  colored?: boolean;
  overflowMenu?: boolean;
  onTabChange?: (
    activeTabIndex : number,
    tabId: IdPropType,
    tabControlsId: IdPropType,
    tabChildren: React.ReactNode,
    event: Event
  ) => void;
  activeTabIndex?: number;
  defaultTabIndex?: number;
  defaultMedia?: MediaType;
  desktopMinWidth?: number;
  nextIcon?: React.ReactElement<any>;
  previousIcon?: React.ReactElement<any>;
  overflowMenuIcon?: React.ReactElement<any>;
  overflowMenuLabel?: React.ReactNode;

  /**
   * @deprecated
   */
  nextIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  nextIconClassName?: string;

  /**
   * @deprecated
   */
  previousIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  previousIconClassName?: string;

  /**
   * @deprecated
   */
  overflowMenuIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  overflowMenuIconClassName?: string;
}

declare const Tabs: React.ComponentClass<TabsProps>;
export default Tabs;

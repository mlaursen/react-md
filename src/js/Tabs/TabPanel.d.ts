import * as React from 'react';
import { IdPropType, Props } from '../index';

export interface TabPanelProps extends Props {
  // for the `component` prop until refactored out
  [key: string]: any;

  id: IdPropType;
  contolledById: IdPropType;
  component?: React.ReactType;
  active?: boolean;
  children?: React.ReactNode;
}

declare const TabPanel: React.ComponentClass<TabPanelProps>;
export default TabPanel;

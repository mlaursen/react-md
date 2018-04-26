import * as React from 'react';
import { Props } from '../index';

export interface FocusContainerProps extends Props {
  // for the `component` prop until refactored out
  [key: string]: any;

  component?: React.ReactType;
  children?: React.ReactNode;
  initialFocus?: string;
  focusOnMount?: boolean;
  additionalFocusKeys?: Array<number>;
  containFocus?: boolean;
}

declare const FocusContainer: React.ComponentClass<FocusContainerProps>;
export default FocusContainer;

import * as React from 'react';
import { Props } from '../index';

export interface FocusContainerProps extends Props {
  // for the `component` prop until refactored out
  [key: string]: any;

  component?: React.ReactType;
  componentRef?: React.Ref<any>;
  containerRef?: React.Ref<any>;
  children?: React.ReactNode;
  initialFocus?: string;
  focusOnMount?: boolean;
  additionalFocusKeys?: Array<number>;
  containFocus?: boolean;
}

interface FocusContainerComponent extends React.ComponentClass<FocusContainerProps> {
  getContainer(): React.ReactElement<any>;
}

declare const FocusContainer: FocusContainerComponent;
export default FocusContainer;

import * as React from 'react';

interface ResizeParams {
  height: number;
  width: number;
  scrollHeight: number;
  scrollWidth: number;
}

export interface ResizeObserverProps {
  watchHeight?: boolean;
  watchWidth?: boolean;
  target?: string | Object;
  component?: string;
  onResize: (nextSize: ResizeParams) => void;
}

declare const ResizeObserver: React.ComponentClass<ResizeObserverProps>;
export default ResizeObserver;

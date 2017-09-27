import * as React from 'react';
import { Props } from '../index';

export interface MediaOverlayProps extends Props {
  // for the `component` prop until refactored out
  [key: string]: any;

  children?: React.ReactNode;
  component?: React.ReactType;
}

declare const MediaOverlay: React.ComponentClass<MediaOverlayProps>;
export default MediaOverlay;

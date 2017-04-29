import * as React from 'react';
import { Props } from '../index';

export interface MediaOverlayProps extends Props {
  children?: React.ReactNode;
  component?: React.ReactType;
}

declare const MediaOverlay: React.ComponentClass<MediaOverlayProps>;
export default MediaOverlay;

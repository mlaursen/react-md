import * as React from 'react';
import { Props } from '../index';

export interface MediaProps extends Props {
  children?: React.ReactNode;
  forceAspect?: boolean;
  aspectRatio?: string;
  expandable?: string;
  component?: React.ReactType;
}

declare const Media: React.ComponentClass<MediaProps>;
export default Media;

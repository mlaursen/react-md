import * as React from 'react';
import { Props } from '../index';

interface MediaProps extends Props {
  children?: React.ReactNode;
  forceAspect?: boolean;
  aspectRatio?: string;
  expandable?: string;
  component?: Function | string;
}

interface MediaOverlayProps extends Props {
  children?: React.ReactNode;
  component?: Function | string;
}

export default class Media extends React.Component<MediaProps, {}> { }
export { Media };

export class MediaOverlay extends React.Component<MediaOverlayProps, {}> { }

import * as React from 'react';
import { Props } from '../index';

export interface PortalProps extends Props {
  visible: boolean;
  children?: React.ReactElement<any>;
  component?: string;
  onOpen?: Function;
  onClose?: Function;
  renderNode?: Object;
  lastChild?: boolean;
}

declare const Portal: React.ComponentClass<PortalProps>;
export default Portal;

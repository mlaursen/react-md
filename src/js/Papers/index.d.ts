import * as React from 'react';
import { Props } from '../index';

interface PaperProps extends Props {
  component?: Function | string;
  children?: React.ReactNode;
  zDepth?: number;
  raiseOnHover?: boolean;
}

export default class Paper extends React.Component<PaperProps, {}> { }

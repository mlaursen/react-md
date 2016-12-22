import * as React from 'react';
import { Props } from '../index';

interface SubheaderProps extends Props {
  primary?: boolean;
  inset?: boolean;
  primaryText: React.ReactNode;
  children?: React.ReactNode;
  component?: Function | string;
}

export default class Subheader extends React.Component<SubheaderProps, {}> { }

import * as React from 'react';
import { Props } from '../index';

export interface SubheaderProps extends Props {
  primary?: boolean;
  inset?: boolean;
  primaryText: React.ReactNode;
  children?: React.ReactNode;
  component?: React.ReactType;
}

export default class Subheader extends React.Component<SubheaderProps, {}> { }

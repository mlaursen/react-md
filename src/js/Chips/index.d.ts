import * as React from 'react';
import { Props } from '../index';

export interface ChipProps extends Props {
  iconClassName?: string;
  rotateIcon?: boolean;
  label: React.ReactNode;
  removable?: boolean;
  avatar?: React.ReactElement<any>;
  children?: React.ReactNode;
}

export default class Chip extends React.Component<ChipProps, {}> { }

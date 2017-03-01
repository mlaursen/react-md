import * as React from 'react';
import { Props } from '../index';

interface ChipProps extends Props {
  iconClassName?: string;
  rotateIcon?: boolean;
  label: string;
  removable?: boolean;
  avatar?: React.ReactElement<any>;
  children?: React.ReactNode;
}

export default class Chip extends React.Component<ChipProps, {}> { }

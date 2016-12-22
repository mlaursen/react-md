import * as React from 'react';
import { Props } from '../index';

interface FontIconProps extends Props {
  children?: React.ReactNode;
  iconClassName?: string;
  disabled?: boolean;
  forceSize?: boolean | number;
}

export default class FontIcon extends React.Component<FontIconProps, {}> { }

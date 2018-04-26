import * as React from 'react';
import { Props } from '../index';

type Role = 'presentation';

export interface AvatarProps extends Props {
  src?: string;
  alt?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  random?: boolean;
  suffixes?: Array<string>;
  suffix?: string;
  iconSized?: boolean;
  role?: Role;

  contentStyle?: React.CSSProperties;
  contentClassName?: string;
}

declare const Avatar: React.ComponentClass<AvatarProps>;
export default Avatar;

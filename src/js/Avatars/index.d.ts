import * as React from 'react';
import { Props } from '../index';

type Role = 'presentation';

interface AvatarProps extends Props {
  src?: string;
  alt?: string;
  icon?: React.ReactNode;
  children?: string;
  random?: boolean;
  suffixes?: Array<string>;
  suffix?: string;
  iconSized?: boolean;
  role?: Role;
}

export default class Avatar extends React.Component<AvatarProps, {}> { }

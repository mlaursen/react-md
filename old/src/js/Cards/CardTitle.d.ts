import * as React from 'react';
import { Props, IdPropType } from '../index';

export interface CardTitleProps extends Props {
  id?: IdPropType;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  avatar?: React.ReactElement<any>;
  expander?: boolean;
  children?: React.ReactNode;
}

declare const CardTitle: React.ComponentClass<CardTitleProps>;
export default CardTitle;

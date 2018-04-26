import * as React from 'react';
import { IdPropType, Props } from '../index';

export interface BaseProgressProps extends Props {
  id: IdPropType;
  value?: number;
  centered?: boolean;
}

export { default as CircularProgress, CircularProgressProps } from './CircularProgress';
export { default as LinearProgress, LinearProgressProps } from './LinearProgress';

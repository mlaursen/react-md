import * as React from 'react';
import { IdPropType, Props } from '../index';

interface CommonProps extends Props {
  id: IdPropType;
  value?: number;
  centered?: boolean;
}

export interface CircularProgressProps extends CommonProps {
  scale?: number;
  determinateDashoffset?: number;
}

export interface LinearProgressProps extends CommonProps {
  query?: boolean;
}

export class CircularProgress extends React.Component<CircularProgressProps, {}> { }
export class LinearProgress extends React.Component<LinearProgressProps, {}> { }

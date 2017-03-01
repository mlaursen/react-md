import * as React from 'react';
import { Props } from '../index';

interface CommonProps extends Props {
  id: number | string;
  value?: number;
  centered?: boolean;
}

interface CircularProgressProps extends CommonProps {
  scale?: number;
  determinateDashoffset?: number;
}

interface LinearProgressProps extends CommonProps {
  query?: boolean;
}

export class CircularProgress extends React.Component<CircularProgressProps, {}> { }
export class LinearProgress extends React.Component<LinearProgressProps, {}> { }

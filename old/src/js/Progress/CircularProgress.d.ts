import { BaseProgressProps } from './index';

export interface CircularProgressProps extends BaseProgressProps {
  scale?: number;
  determinateDashoffset?: number;
}

declare const CircularProgress: React.ComponentClass<CircularProgressProps>;
export default CircularProgress;

import { BaseProgressProps } from './index';

export interface LinearProgressProps extends BaseProgressProps {
  query?: number;
}

declare const LinearProgress: React.ComponentClass<LinearProgressProps>;
export default LinearProgress;

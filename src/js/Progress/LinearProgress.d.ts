import { BaseProgressProps } from './index';

export interface LinearProgressProps extends BaseProgressProps {
  query?: bool;
}

declare const LinearProgress: React.ComponentClass<LinearProgressProps>;
export default LinearProgress;

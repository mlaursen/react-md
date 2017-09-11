import { BaseProgressProps } from './index';

export interface LinearProgressProps extends BaseProgressProps {
  query?: boolean;
}

declare const LinearProgress: React.ComponentClass<LinearProgressProps>;
export default LinearProgress;

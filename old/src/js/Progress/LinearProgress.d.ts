import { BaseProgressProps } from './index';

type Progress = React.ComponentClass<LinearProgressProps>;

export interface LinearProgressProps extends BaseProgressProps {
  progressStyle?: React.CSSProperties | ((value: number, component: Progress) => React.CSSProperties);
  progressClassName?: string | ((value: number, component: Progress) => string);
  query?: boolean;
}

declare const LinearProgress: React.ComponentClass<LinearProgressProps>;
export default LinearProgress;

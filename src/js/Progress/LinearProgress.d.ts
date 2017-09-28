import { BaseProgressProps } from './index';

type Progress = React.ComponentClass<LinearProgressProps>;

export interface LinearProgressProps extends BaseProgressProps {
  progressClassName?: string | ((value: number, component: Progress) => string);
  progressStyle?: React.CSSProperties | ((value: number, component: Progress) => React.CSSProperties);
  query?: boolean;
}

declare const LinearProgress: React.ComponentClass<LinearProgressProps>;
export default LinearProgress;

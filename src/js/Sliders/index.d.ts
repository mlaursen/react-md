import * as React from 'react';
import { Props } from '../index';

interface SliderProps extends Props {
  id?: number | string;
  thumbStyle?: React.CSSProperties;
  thumbClassName?: string;
  trackStyle?: React.CSSProperties;
  trackClassName?: string;
  trackFillStyle?: React.CSSProperties;
  trackFillClassName?: string;
  discreteValueStyle?: React.CSSProperties;
  discreteValueClassName?: string;
  defaultValue?: number;
  value?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange?: (value: number, event: Event) => void;
  onDragChange?: (dragPercentage: number, value: number, event: Event) => void;
  leftIcon?: React.ReactElement<any>;
  rightIcon?: React.ReactElement<any>;
  label?: React.ReactNode;
  step?: number;
  editable?: boolean;
  inputWidth?: number | string;
  discrete?: boolean;
  tickWidth?: number | string;
  discreteTicks?: number;
  discreteInkTransitionTime?: number;
  valuePrecision?: number;
}

export default class Slider extends React.Component<SliderProps, {}> { }

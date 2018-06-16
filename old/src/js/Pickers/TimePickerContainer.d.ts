import * as React from 'react';
import { BasePickerProps, IntlTimeFormat } from './index';

export interface TimePickerProps extends BasePickerProps {
  hoverMode?: boolean;
  defaultTimeMode?: 'hour' | 'minute';
  value?: Date,
  defaultValue?: Date;
  onChange?: (formattedTime: string, date: Date, event: Event) => void;
  formatOptions?: IntlTimeFormat;
}

declare const TimePicker: React.ComponentClass<TimePickerProps>;
export default TimePicker;

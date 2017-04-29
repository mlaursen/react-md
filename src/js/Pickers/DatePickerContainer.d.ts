import * as React from 'react';
import { BasePickerProps, IntlFormat } from './index';

export interface DatePickerProps extends BasePickerProps {
  value?: string | Date,
  defaultValue?: string | Date;
  onChange?: (formattedDate: string, date: Date, event: Event) => void;
  defaultCalendarMode?: 'calendar' | 'year';
  previousIconChildren?: React.ReactNode;
  previousIconClassName?: string;
  nextIconChildren?: React.ReactNode;
  nextIconClassName?: string;
  minDate?: Date,
  maxDate?: Date,
  yearsDisplayed?: number;
  formatOptions?: IntlFormat;
  defaultCalendarDate?: string | Date;

  /**
   * @deprecated
   */
  initialCalendarDate?: string | Date;
}

declare const DatePicker: React.ComponentClass<DatePickerProps>;
export default DatePicker;

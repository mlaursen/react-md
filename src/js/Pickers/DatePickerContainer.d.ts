import * as React from 'react';
import { BasePickerProps, IntlFormat } from './index';

export interface DatePickerProps extends BasePickerProps {
  value?: string | Date,
  defaultValue?: string | Date;
  onChange?: (formattedDate: string, date: Date, event: Event) => void;
  defaultCalendarMode?: 'calendar' | 'year';
  minDate?: Date,
  maxDate?: Date,
  yearsDisplayed?: number;
  formatOptions?: IntlFormat;
  defaultCalendarDate?: string | Date;
  nextIcon?: React.ReactElement<any>;
  previousIcon?: React.ReactElement<any>;

  /**
   * @deprecated
   */
  initialCalendarDate?: string | Date;

  /**
   * @deprecated
   */
  previousIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  previousIconClassName?: string;

  /**
   * @deprecated
   */
  nextIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  nextIconClassName?: string;
}

declare const DatePicker: React.ComponentClass<DatePickerProps>;
export default DatePicker;

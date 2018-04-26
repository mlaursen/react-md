import * as React from 'react';
import { BasePickerProps, IntlFormat, CalendarTitleFormat, NSL } from './index';

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
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  calendarClassName?: string;
  yearPickerClassName?: string;
  calendarDateClassName?: string;
  calendarOuterDateClassName?: string;
  calendarTitleClassName?: string;
  calendarTitleFormat?: CalendarTitleFormat;
  calendarWeekdayClassName?: string;
  calendarWeekdayFormat?: NSL;
  showAllDays?: boolean;
  disableOuterDates?: boolean;
  timeZone?: string;

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

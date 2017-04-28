import * as React from 'react';
import { IdPropType, Props } from '../index';
import { SharedTextFieldProps } from '../TextFields';

type NSL = 'narrow' | 'short' | 'long';
type N2D = 'numeric' | '2-digit';

interface IntlTimeFormat {
  hour?: N2D;
  minute?: N2D;
  second?: N2D;
  timeZoneName?: 'short' | 'long';
}

interface IntlFormat extends IntlTimeFormat {
  weekday?: NSL;
  era?: NSL;
  year?: N2D;
  month?: NSL | N2D;
  day?: N2D;
}

type Locales = string | Array<string>;

interface CommonProps extends SharedTextFieldProps, Props {
  id: IdPropType;
  'aria-label'?: string;
  pickerStyle?: React.CSSProperties;
  pickerClassName?: string;
  textFieldStyle?: React.CSSProperties;
  textFieldClassName?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  DateTimeFormat?: (locales?: Locales | Array<Locales>, options?: IntlFormat) => { format(date: Date): string };
  locales?: Locales,
  okLabel?: string;
  okPrimary?: boolean;
  cancelLabel?: string;
  cancelPrimary?: boolean;
  inline?: boolean;
  displayMode?: 'landscape' | 'portrait';
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibilityChange?: (visible: boolean, event: Event) => void;
  autoOk?: boolean;
  closeOnEsc?: boolean;
  animateInline?: boolean;
  portal?: boolean;
  renderNode?: Object;
  lastChild?: boolean;
}

export interface DatePickerProps extends CommonProps {
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

export interface TimePickerProps extends CommonProps {
  hoverMode?: boolean;
  defaultTimeMode?: 'hour' | 'minute';
  value?: Date,
  defaultValue?: Date;
  onChange?: (formattedTime: string, date: Date, event: Event) => void;
}

export class DatePicker extends React.Component<DatePickerProps, {}> { }
export { DatePicker as DatePickerContainer };
export class TimePicker extends React.Component<TimePickerProps, {}> { }
export { TimePicker as TimePickerContainer };

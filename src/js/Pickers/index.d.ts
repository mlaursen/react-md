import * as React from 'react';
import { Props } from '../index';
import { TextFieldLineDirections } from '../TextFields';

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

interface CommonProps extends Props {
  id: number | string;
  'aria-label'?: string;
  pickerStyle?: React.CSSProperties;
  pickerClassName?: string;
  icon?: React.ReactNode;
  label?: string;
  placeholder?: string;
  DateTimeFormat?: (locales?: Locales | Array<Locales>, options?: IntlFormat) => { format(date: Date): string };
  locales?: Locales,
  okLabel?: string;
  okPrimary?: boolean;
  cancelLabel?: string;
  cancelPrimary?: boolean;
  inline?: boolean;
  displayMode?: 'landscape' | 'portrait';
  fullWidth?: boolean;
  lineDirection?: TextFieldLineDirections;
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibilityChange?: (visible: boolean, event: Event) => void;
  autoOk?: boolean;
  disabled?: boolean;
  closeOnEsc?: boolean;
}

interface DatePickerProps extends CommonProps {
  value?: string | Date,
  defaultValue?: string | Date;
  initialCalendarDate?: string | Date;
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
}

interface TimePickerProps extends CommonProps {
  defaultTimeMode?: 'hour' | 'minute';
  value?: Date,
  defaultValue?: Date;
}

export class DatePicker extends React.Component<DatePickerProps, {}> { }
export { DatePicker as DatePickerContainer };
export class TimePicker extends React.Component<TimePickerProps, {}> { }
export { TimePicker as TimePickerContainer };

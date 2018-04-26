import * as React from 'react';
import { IdPropType, Props } from '../index';
import { SharedTextFieldProps } from '../TextFields';

export type NSL = 'narrow' | 'short' | 'long';
export type N2D = 'numeric' | '2-digit';

export interface IntlTimeFormat {
  hour?: N2D;
  minute?: N2D;
  second?: N2D;
  timeZoneName?: 'short' | 'long';
}

export interface IntlFormat extends IntlTimeFormat {
  weekday?: NSL;
  era?: NSL;
  year?: N2D;
  month?: NSL | N2D;
  day?: N2D;
}

export interface CalendarTitleFormat {
  era?: NSL;
  year?: N2D;
  month?: NSL | N2D;
}

export type Locales = string | Array<string>;

export interface BasePickerProps extends SharedTextFieldProps, Props {
  id: IdPropType;
  'aria-label'?: string;
  pickerStyle?: React.CSSProperties;
  pickerClassName?: string;
  pickerHeaderClassName?: string;
  pickerContentClassName?: string;
  pickerFooterClassName?: string;
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
  disableScrollLocking?: boolean;
}

export { default as DatePicker, default as DatePickerContainer, DatePickerProps } from './DatePickerContainer';
export { default as TimePicker, default as TimePickerContainer, TimePickerProps } from './TimePickerContainer';

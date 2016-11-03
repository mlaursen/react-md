import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import DialogFooter from '../Dialogs/DialogFooter';
import DatePickerHeader from './DatePickerHeader';
import DatePickerCalendar from './DatePickerCalendar';
import YearPicker from './YearPicker';

export default class DatePicker extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    okLabel: PropTypes.string.isRequired,
    okPrimary: PropTypes.bool.isRequired,
    onOkClick: PropTypes.func.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    cancelPrimary: PropTypes.bool.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    DateTimeFormat: PropTypes.func.isRequired,
    locales: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    calendarDate: PropTypes.instanceOf(Date).isRequired,
    calendarTempDate: PropTypes.instanceOf(Date).isRequired,
    calendarMode: PropTypes.oneOf(['calendar', 'year']).isRequired,
    changeCalendarMode: PropTypes.func.isRequired,
    icon: PropTypes.bool,
    inline: PropTypes.bool,
    displayMode: PropTypes.oneOf(['landscape', 'portrait']),
  };

  render() {
    const {
      okLabel,
      okPrimary,
      onOkClick,
      cancelLabel,
      cancelPrimary,
      onCancelClick,
      DateTimeFormat,
      locales,
      calendarTempDate,
      calendarMode,
      changeCalendarMode,
      style,
      className,
      inline,
      icon,
      displayMode,
      ...props
    } = this.props;

    let picker;
    if (calendarMode === 'calendar') {
      picker = (
        <DatePickerCalendar
          {...props}
          key="calendar"
          calendarTempDate={calendarTempDate}
          DateTimeFormat={DateTimeFormat}
          locales={locales}
        />
      );
    } else {
      picker = (
        <YearPicker
          {...props}
          key="year"
          calendarTempDate={calendarTempDate}
          DateTimeFormat={DateTimeFormat}
          locales={locales}
        />
      );
    }

    const actions = [{
      key: cancelLabel,
      onClick: onCancelClick,
      primary: cancelPrimary,
      secondary: !cancelPrimary,
      label: cancelLabel,
    }, {
      key: okLabel,
      onClick: onOkClick,
      primary: okPrimary,
      secondary: !okPrimary,
      label: okLabel,
    }];

    return (
      <div
        style={style}
        className={cn('md-picker md-picker--date', {
          [`md-picker--${displayMode}`]: displayMode,
          'md-picker--inline': inline,
          'md-picker--inline-icon': inline && icon,
        }, className)}
      >
        <DatePickerHeader
          DateTimeFormat={DateTimeFormat}
          locales={locales}
          calendarTempDate={calendarTempDate}
          calendarMode={calendarMode}
          changeCalendarMode={changeCalendarMode}
        />
        <div className="md-picker-content-container">
          {picker}
          <DialogFooter actions={actions} />
        </div>
      </div>
    );
  }
}

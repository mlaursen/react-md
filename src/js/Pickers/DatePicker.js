import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import PickerFooter from './PickerFooter';
import DatePickerHeader from './DatePickerHeader';
import DatePickerCalendar from './DatePickerCalendar';
import YearPicker from './YearPicker';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string.isRequired,
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
      className,
      ...props,
    } = this.props;

    return (
      <div className={`${className} date-picker`}>
        <DatePickerHeader
          DateTimeFormat={DateTimeFormat}
          locales={locales}
          calendarTempDate={calendarTempDate}
          calendarMode={calendarMode}
          changeCalendarMode={changeCalendarMode}
        />
        <div className="md-picker-content-container">
          {calendarMode === 'calendar' ?
            <DatePickerCalendar
              {...props}
              calendarTempDate={calendarTempDate}
              DateTimeFormat={DateTimeFormat}
              locales={locales}
            /> :
            <YearPicker
              {...props}
              calendarTempDate={calendarTempDate}
              DateTimeFormat={DateTimeFormat}
              locales={locales}
            />
          }
          <PickerFooter
            okLabel={okLabel}
            okPrimary={okPrimary}
            onOkClick={onOkClick}
            cancelLabel={cancelLabel}
            cancelPrimary={cancelPrimary}
            onCancelClick={onCancelClick}
          />
        </div>
      </div>
    );
  }
}

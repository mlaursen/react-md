import React, { PropTypes } from 'react';
import classnames from 'classnames';

import DatePickerHeader from './DatePickerHeader';
import Calendar from './Calendar';

const DatePicker = (props) => {
  const {
    className,
    mode,
    selectedDate,
    onYearClick,
    onDateClick,
    ...calendarProps,
  } = props;

  return (
    <div className={classnames('md-date-picker', className)}>
      <DatePickerHeader
        onYearClick={onYearClick}
        onDateClick={onDateClick}
        selectedDate={selectedDate}
        mode={mode}
      />
      <Calendar
        {...calendarProps}
        selectedDate={selectedDate}
      />
    </div>
  );
};

DatePicker.propTypes = {
  className: PropTypes.string,
  previousIcon: PropTypes.node.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  nextIcon: PropTypes.node.isRequired,
  onNextClick: PropTypes.func.isRequired,
  selectedDate: PropTypes.object.isRequired,
  currentMonth: PropTypes.object.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  cancelLabel: PropTypes.string.isRequired,
  onOkClick: PropTypes.func.isRequired,
  okLabel: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['date', 'year']).isRequired,
  onDateClick: PropTypes.func.isRequired,
  onYearClick: PropTypes.func.isRequired,
  onCalendarDateClick: PropTypes.func.isRequired,
  slideDir: PropTypes.oneOf(['left', 'right']).isRequired,
};

export default DatePicker;

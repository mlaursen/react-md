import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { formatDate } from '../utils';

const DatePickerHeader = ({ onYearClick, onDateClick, selectedDate, mode }) => {
  return (
    <header className="md-date-picker-header">
      <button
        type="button"
        onClick={onYearClick}
        className={classnames('md-date-picker-year', {
          'active': mode === 'year',
        })}
        >
        <h6 className="md-subtitle">{selectedDate.getFullYear()}</h6>
      </button>
      <button
        type="button"
        onClick={onDateClick}
        className={classnames('md-date-picker-date', {
          'active': mode === 'date',
        })}
        >
        <h4 className="md-display-1">{formatDate(selectedDate, { weekday: 'short' })},</h4>
        <h4 className="md-display-1">{formatDate(selectedDate, { month: 'short', day: '2-digit' })}</h4>
      </button>
    </header>
  );
};

DatePickerHeader.propTypes = {
  onDateClick: PropTypes.func.isRequired,
  onYearClick: PropTypes.func.isRequired,
  selectedDate: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(['date', 'year']).isRequired,
};

export default DatePickerHeader;

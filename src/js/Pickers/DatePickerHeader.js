import React, { PropTypes } from 'react';
import classnames from 'classnames';

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
        <h6 className="md-subtitle">{selectedDate.format('YYYY')}</h6>
      </button>
      <button
        type="button"
        onClick={onDateClick}
        className={classnames('md-date-picker-date', {
          'active': mode === 'date',
        })}
        >
        <h4 className="md-display-1">{selectedDate.format('ddd,')}</h4>
        <h4 className="md-display-1">{selectedDate.format('MMM DD')}</h4>
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

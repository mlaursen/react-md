import React, { PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import { IconButton } from '../Buttons';
import Month from './Month';
import DatePickerFooter from './DatePickerFooter';
import { formatDate } from '../utils';

const Calendar = (props) => {
  const {
    previousIcon,
    onPreviousClick,
    nextIcon,
    onNextClick,
    currentMonth,
    slideDir,
    cancelLabel,
    onCancelClick,
    okLabel,
    onOkClick,
    selectedDate,
    onCalendarDateClick,
  } = props;

  const dows = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dow, i) => (
    <h4 className="dow" key={`dow-${dow}-${i}`}>{dow}</h4>
  ));
  return (
    <section className="md-date-picker-calendar">
      <header>
        <div className="md-date-picker-controls">
          <IconButton onClick={onPreviousClick}>{previousIcon}</IconButton>
          <h4 className="md-subtitle">{formatDate(currentMonth, { month: 'long', year: 'numeric' })}</h4>
          <IconButton onClick={onNextClick}>{nextIcon}</IconButton>
        </div>
        <div className="md-dows">
          {dows}
        </div>
      </header>
      <CSSTransitionGroup
        transitionName={`md-month-${slideDir}`}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        className="swipe-container"
        >
        <Month
          key={formatDate(currentMonth)}
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onCalendarDateClick={onCalendarDateClick}
        />
      </CSSTransitionGroup>
      <DatePickerFooter
        cancelLabel={cancelLabel}
        onCancelClick={onCancelClick}
        okLabel={okLabel}
        onOkClick={onOkClick}
      />
    </section>
  );
};

Calendar.propTypes = {
  previousIcon: PropTypes.node.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  nextIcon: PropTypes.node.isRequired,
  onNextClick: PropTypes.func.isRequired,
  cancelLabel: PropTypes.string.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  okLabel: PropTypes.string.isRequired,
  onOkClick: PropTypes.func.isRequired,
  onCalendarDateClick: PropTypes.func.isRequired,
  selectedDate: PropTypes.object.isRequired,
  currentMonth: PropTypes.object.isRequired,
  slideDir: PropTypes.oneOf(['left', 'right']).isRequired,
};

export default Calendar;

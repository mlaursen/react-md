import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import moment from 'moment';

import Dialog from '../Dialogs';
import { IconButton, FlatButton } from '../Buttons';

export default class CalendarDialog extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    previousIcon: PropTypes.node.isRequired,
    previousMonth: PropTypes.func.isRequired,
    nextIcon: PropTypes.node.isRequired,
    nextMonth: PropTypes.func.isRequired,
    selectedDate: PropTypes.object.isRequired,
    currentMonth: PropTypes.object.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    okLabel: PropTypes.string.isRequired,
    selectDate: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(['date', 'year']).isRequired,
    onDateClick: PropTypes.func.isRequired,
    onYearClick: PropTypes.func.isRequired,
    onCalendarDateClick: PropTypes.func.isRequired,
    slideDir: PropTypes.oneOf(['left', 'right']).isRequired,
  };

  /**
   * Jan 17 2016 -> Dec 27 2015
   * May 1 2016 -> May 1 2016 -- It starts on a Sunday
   *
   * Strips all time from the date and gets the current
   * date for the start of week.
   * @return A moment object with all time stripped
   */
  getCalendarStart = (date) => {
    return this.stripTime(date.clone().date(1).day(0));
  };

  getCalendarEnd = (date) => {
    return this.stripTime(date.clone().endOf('month').day(6));
  };

  stripTime = (date) => {
    return date.hour(0).minute(0).second(0).millisecond(0);
  };

  getCalendarDays = (startDate, endDate) => {
    const { currentMonth, selectedDate, onCalendarDateClick } = this.props;
    let days = [];
    let currentDate = startDate.clone();
    const activeDate = this.stripTime(selectedDate.clone());
    const today = this.stripTime(moment());
    while(currentDate.isSameOrBefore(endDate)) {
      const key = currentDate.format('YYYYMMDD');
      let date;
      if(currentDate.month() === currentMonth.month()) {
        date = (
          <button
            type="button"
            key={key}
            className={classnames('md-calendar-date', {
              'today': currentDate.isSame(today),
              'active': currentDate.isSame(activeDate),
            })}
            onClick={onCalendarDateClick.bind(this, currentDate.clone())}
            >
            <span className="date">{currentDate.format('D')}</span>
          </button>
        );
      } else {
        date = <div key={key} className="md-calendar-date-placeholder" />;
      }

      days.push(date);
      currentDate = currentDate.add(1, 'd');
    }

    return days;
  };

  render() {
    const {
      isOpen,
      close,
      className,
      previousIcon,
      previousMonth,
      nextIcon,
      nextMonth,
      currentMonth,
      selectedDate,
      selectDate,
      cancelLabel,
      okLabel,
      mode,
      onDateClick,
      onYearClick,
      slideDir,
    } = this.props;

    const dows = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dow, i) => (
      <h4 className="dow" key={`dow-${dow}-${i}`}>{dow}</h4>
    ));
    const days = this.getCalendarDays(this.getCalendarStart(currentMonth), this.getCalendarEnd(currentMonth));

    return (
      <Dialog
        isOpen={isOpen}
        close={close}
        onlyChildren={true}
        className={classnames('md-date-picker', className)}
        >
        <header className="md-date-picker-header">
          <button type="button" onClick={onYearClick} className={classnames('md-date-picker-year', { 'active': mode === 'year' })}>
            <h6 className="md-subtitle">{selectedDate.format('YYYY')}</h6>
          </button>
          <button type="button" onClick={onDateClick} className={classnames('md-date-picker-date', { 'active': mode === 'date' })}>
            <h4 className="md-display-1">{selectedDate.format('ddd,')}</h4>
            <h4 className="md-display-1">{selectedDate.format('MMM DD')}</h4>
          </button>
        </header>
        <section className="md-date-picker-calendar">
          <header>
            <div className="md-date-picker-controls">
              <IconButton onClick={previousMonth}>{previousIcon}</IconButton>
              <h4 className="md-subtitle">{currentMonth.format('MMMM YYYY')}</h4>
              <IconButton onClick={nextMonth}>{nextIcon}</IconButton>
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
            <section key={`month-${currentMonth.month()}`} className="md-calendar-month">
              {days}
            </section>
          </CSSTransitionGroup>
          <footer className="md-dialog-footer md-date-picker-footer">
            <FlatButton primary onClick={close} label={cancelLabel} />
            <FlatButton primary onClick={selectDate} label={okLabel} />
          </footer>
        </section>
      </Dialog>
    );
  }
}

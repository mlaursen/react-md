import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import PickerFooter from './PickerFooter';
import ClockFace from './ClockFace';
import TimePickerHeader from './TimePickerHeader';

/**
 * The `TimePicker` component is used to display a time picker
 * in the `TimePickerContainer` component.
 */
export default class TimePicker extends Component {
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

    /**
     * A function that will switch the state from hour to minute.
     */
    setTimeMode: PropTypes.func.isRequired,

    /**
     * A function that will update the time for the TimePicker before
     * the user selects ok. This function will be given a new Date object
     * with a modified time.
     */
    setTempTime: PropTypes.func.isRequired,

    /**
     * The current display mode of the time picker.
     */
    timeMode: PropTypes.oneOf(['hour', 'minute']).isRequired,

    /**
     * The current time as a date object that is being displayed in the
     * time picker.
     */
    tempTime: PropTypes.instanceOf(Date).isRequired,

    /**
     * A string that is a representation of the hours in the user's locale.
     */
    hours: PropTypes.string.isRequired,

    /**
     * A string that is a representation of the minutes in the user's locale.
     * This will also include any separator the locale uses.
     *
     * Example: ':15' in '3:15 PM' for 'en-US'
     */
    minutes: PropTypes.string.isRequired,

    /**
     * An optional time period if a user's locale uses it.
     */
    timePeriod: PropTypes.string,
  };

  updateTime = (timePart) => {
    const { tempTime, setTempTime, timeMode, timePeriod } = this.props;
    const time = new Date(tempTime);
    if(timeMode === 'hour') {
      const isAM = timePeriod === 'AM';
      const is12 = timePart === 12;
      if(timePeriod && isAM && is12) {
        timePart = 0;
      } else if(timePeriod && !isAM && !is12) {
        timePart += 12;
      }

      time.setHours(timePart);
    } else {
      time.setMinutes(timePart);
    }

    setTempTime(time);
  };

  render() {
    const {
      okLabel,
      okPrimary,
      onOkClick,
      cancelLabel,
      cancelPrimary,
      onCancelClick,
      className,
      setTimeMode,
      setTempTime,
      timeMode,
      tempTime,
      hours,
      minutes,
      timePeriod,
    } = this.props;

    const hoursInt = parseInt(hours);
    const minutesInt = parseInt(minutes.replace(/[^0-9]/g, ''));

    return (
      <div className={`${className} time-picker`}>
        <TimePickerHeader
          tempTime={tempTime}
          timeMode={timeMode}
          setTimeMode={setTimeMode}
          setTempTime={setTempTime}
          hours={hours}
          minutes={minutes}
          timePeriod={timePeriod}
        />
        <div className="md-picker-content-container">
          <div className="md-picker-content clock">
            <ClockFace
              time={timeMode === 'hour' ? hoursInt : minutesInt}
              minutes={timeMode === 'minute'}
              onClick={this.updateTime}
              timePeriod={timePeriod}
            />
          </div>
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

import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import ClockFace from './ClockFace';
import DialogFooter from '../Dialogs/DialogFooter';
import TimePickerHeader from './TimePickerHeader';

/**
 * The `TimePicker` component is used to display a time picker
 * in the `TimePickerContainer` component.
 */
export default class TimePicker extends PureComponent {
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
    icon: PropTypes.bool,
    inline: PropTypes.bool,
    displayMode: PropTypes.oneOf(['landscape', 'portrait']),

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

  constructor(props) {
    super(props);

    this._updateTime = this._updateTime.bind(this);
  }

  /**
   * Takes in the new time (number o'clock or minutes), updates the temp time
   * with that new time, and then calls the setTempTime prop.
   */
  _updateTime(newTime) {
    let timePart = newTime;
    const { tempTime, setTempTime, timeMode, timePeriod } = this.props;
    const time = new Date(tempTime);
    if (timeMode === 'hour') {
      const isAM = timePeriod === 'AM';
      const is12 = timePart === 12;
      if (timePeriod && isAM && is12) {
        timePart = 0;
      } else if (timePeriod && !isAM && !is12) {
        timePart += 12;
      }

      time.setHours(timePart);
    } else {
      time.setMinutes(timePart);
    }

    setTempTime(time);
  }

  render() {
    const {
      okLabel,
      okPrimary,
      onOkClick,
      cancelLabel,
      cancelPrimary,
      onCancelClick,
      style,
      className,
      setTimeMode,
      setTempTime,
      timeMode,
      tempTime,
      hours,
      minutes,
      timePeriod,
      displayMode,
      inline,
      icon,
    } = this.props;

    const hoursInt = parseInt(hours, 10);
    const minutesInt = parseInt(minutes.replace(/[^0-9]/g, ''), 10);
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
        className={cn('md-picker md-picker--time', {
          [`md-picker--${displayMode}`]: displayMode,
          'md-picker--inline': inline,
          'md-picker--inline-icon': inline && icon,
        }, className)}
      >
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
          <div className="md-picker-content md-picker-content--clock">
            <ClockFace
              time={timeMode === 'hour' ? hoursInt : minutesInt}
              minutes={timeMode === 'minute'}
              onChange={this._updateTime}
              timePeriod={timePeriod}
            />
          </div>
          <DialogFooter actions={actions} />
        </div>
      </div>
    );
  }
}

import React, { PureComponent, PropTypes } from 'react';

import TimePeriods from './TimePeriods';
import PickerControl from './PickerControl';

/**
 * The `TimePickerHeader` component is used for rendering the
 * current time for the `TimePicker` as well as switching between
 * the different views for the time picker.
 */
export default class TimePickerHeader extends PureComponent {
  static propTypes = {
    /**
     * The current time of the time picker.
     */
    tempTime: PropTypes.instanceOf(Date).isRequired,

    /**
     * The current time type that is being changed.
     */
    timeMode: PropTypes.oneOf(['hour', 'minute']).isRequired,

    /**
     * A function to update the time mode.
     */
    setTimeMode: PropTypes.func.isRequired,

    /**
     * A function to update the time for the time picker.
     */
    setTempTime: PropTypes.func.isRequired,

    /**
     * A formatted hours string for the user's locale. This
     * would be '3' for en-US if the time was '3:15'
     */
    hours: PropTypes.string.isRequired,

    /**
     * A formatted minutes string for the user's locale.
     * This would be ':15' for en-US if the time was '3:15'.
     */
    minutes: PropTypes.string.isRequired,

    /**
     * An optional time period to use for locales that use
     * 12 hour clocks and AM/PM.
     */
    timePeriod: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this._setHour = this._setHour.bind(this);
    this._setMinute = this._setMinute.bind(this);
  }

  _setHour() {
    this.props.setTimeMode('hour');
  }

  _setMinute() {
    this.props.setTimeMode('minute');
  }

  render() {
    const { timeMode, hours, minutes, timePeriod, setTempTime, tempTime } = this.props;
    let timePeriods;
    if (timePeriod) {
      timePeriods = <TimePeriods tempTime={tempTime} setTempTime={setTempTime} timePeriod={timePeriod} />;
    }

    return (
      <header className="md-picker-header md-text-right">
        <PickerControl onClick={this._setHour} active={timeMode === 'hour'}>
          <h4 className="md-display-3">
            {hours}
          </h4>
        </PickerControl>
        <PickerControl onClick={this._setMinute} active={timeMode === 'minute'}>
          <h4 className="md-display-3">
            {minutes}
          </h4>
        </PickerControl>
        {timePeriods}
      </header>
    );
  }
}

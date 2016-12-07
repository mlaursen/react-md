import React, { PureComponent, PropTypes } from 'react';

import addHours from '../utils/DateUtils/addHours';
import PickerControl from './PickerControl';

/**
 * This component displays a section for switching between the AM
 * and PM time periods.
 */
export default class TimePeriods extends PureComponent {
  static propTypes = {
    /**
     * The current time for the time picker.
     */
    tempTime: PropTypes.instanceOf(Date).isRequired,

    /**
     * A function to update the time for the time picker.
     */
    setTempTime: PropTypes.func.isRequired,

    /**
     * The current time period.
     */
    timePeriod: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this._setAM = this._setAM.bind(this);
    this._setPM = this._setPM.bind(this);
  }

  _setAM() {
    if (this.props.timePeriod !== 'AM') {
      this.props.setTempTime(addHours(this.props.tempTime, 12));
    }
  }

  _setPM() {
    if (this.props.timePeriod !== 'PM') {
      this.props.setTempTime(addHours(this.props.tempTime, -12));
    }
  }

  render() {
    const { timePeriod } = this.props;
    return (
      <div className="md-time-periods">
        <PickerControl onClick={this._setAM} active={timePeriod === 'AM'}>
          <h6 className="md-time-period">AM</h6>
        </PickerControl>
        <PickerControl onClick={this._setPM} active={timePeriod === 'PM'}>
          <h6 className="md-time-period">PM</h6>
        </PickerControl>
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { addHours, subtractHours } from '../utils/dates';
import PickerControl from './PickerControl';

/**
 * This component displays a section for switching between the AM
 * and PM time periods.
 */
export default class TimePeriods extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

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

  setAM = () => {
    if(this.props.timePeriod !== 'AM') {
      this.props.setTempTime(addHours(this.props.tempTime, 12));
    }
  };

  setPM = () => {
    if(this.props.timePeriod !== 'PM') {
      this.props.setTempTime(subtractHours(this.props.tempTime, 12));
    }
  };

  render() {
    const { timePeriod } = this.props;
    return (
      <div className="md-time-periods">
        <PickerControl onClick={this.setAM} active={timePeriod === 'AM'}>
          <h6 className="md-subtitle">AM</h6>
        </PickerControl>
        <PickerControl onClick={this.setPM} active={timePeriod === 'PM'}>
          <h6 className="md-subtitle">PM</h6>
        </PickerControl>
      </div>
    );
  }
}

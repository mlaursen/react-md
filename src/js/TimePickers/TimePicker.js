import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { PickerFooter } from '../Pickers';
import ClockFace from './ClockFace';
import TimePickerHeader from './TimePickerHeader';

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
    setTimeMode: PropTypes.func.isRequired,
    setTempTime: PropTypes.func.isRequired,
    timeMode: PropTypes.oneOf(['hour', 'minute']).isRequired,
    tempTime: PropTypes.instanceOf(Date).isRequired,
    hour: PropTypes.string.isRequired,
    minute: PropTypes.string.isRequired,
    timePeriod: PropTypes.string,
  };

  updateTime = (timePart) => {
    const { tempTime, setTempTime, timeMode, timePeriod } = this.props;
    const time = new Date(tempTime);
    if(timeMode === 'hour') {
      if(timePeriod && timePeriod === 'PM') {
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
      DateTimeFormat,
      locales,
      className,
      setTimeMode,
      setTempTime,
      timeMode,
      tempTime,
      hour,
      minute,
      timePeriod,
      ...props,
    } = this.props;

    const hourInt = parseInt(hour);
    const minuteInt = parseInt(minute.replace(':', ''));

    return (
      <div className={`${className} time-picker`}>
        <TimePickerHeader
          tempTime={tempTime}
          timeMode={timeMode}
          setTimeMode={setTimeMode}
          setTempTime={setTempTime}
          hour={hour}
          minute={minute}
          timePeriod={timePeriod}
        />
        <div className="md-picker-content-container">
          <div className="md-picker-content clock">
            <ClockFace
              time={timeMode === 'hour' ? hourInt : minuteInt}
              minutes={timeMode === 'minute'}
              onClick={this.updateTime}
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

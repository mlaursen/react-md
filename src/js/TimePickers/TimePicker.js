import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { getTimeString } from '../utils';
import { PickerFooter } from '../Pickers';
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
  };

  updateTime = (hour) => {
    const time = new Date(this.props.tempTime);
    time.setHours(hour);
    this.props.setTempTime(time);
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
      ...props,
    } = this.props;

    let [hour] = getTimeString(DateTimeFormat, locales, tempTime).split(/(?=[^0-9])/);
    hour = parseInt(hour);

    const timeParts = Array.apply(null, new Array(12)).map((_, i) => {
      const time = i + 1;
      const r = (Math.PI / 2) - time * (Math.PI / 6);
      return (
        <div
          key={`time-${time}`}
          className={classnames('md-clock-time', {
            'active': time === hour,
          })}
          onClick={this.updateTime.bind(this, time)}
          style={{
            top: 118 - 114 * Math.sin(r),
            left: 118 + 114 * Math.cos(r),
          }}
        >
          <span className="md-time">{time}</span>
        </div>
      );
    });

    let rotate = (hour - 3) * 30;
    if(hour < 3) {
      rotate += 360;
    }
    return (
      <div className={`${className} time-picker`}>
        <TimePickerHeader
          DateTimeFormat={DateTimeFormat}
          locales={locales}
          tempTime={tempTime}
          timeMode={timeMode}
          setTimeMode={setTimeMode}
          setTempTime={setTempTime}
        />
        <div className="md-picker-content-container">
          <div className="md-picker-content clock">
            <div className="md-clock">
              {timeParts}
              <div
                className="md-clock-handle"
                style={{
                  left: 136,
                  top: 136,
                  transform: `rotateZ(${rotate}deg)`,
                }}
              />
            </div>
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

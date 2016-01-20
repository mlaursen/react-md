import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import FontIcon from '../FontIcons';
import { PickerContainer } from '../Pickers';
import TimePicker from './TimePicker';
import { DateTimeFormat } from '../utils';

export default class TimePickerContainer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    initiallyOpen: false,
    previousIcon: <FontIcon>chevron_left</FontIcon>,
    nextIcon: <FontIcon>chevron_right</FontIcon>,
    autoOk: false,
    icon: <FontIcon>access_time</FontIcon>,
    initialYearsDisplayed: 100,
    initialCalendarMode: 'hour',
    DateTimeFormat: DateTimeFormat,
    locales: navigator.language,
    okLabel: 'Ok',
    okPrimary: true,
    cancelLabel: 'Cancel',
    cancelPrimary: true,
  };

  render() {
    return (
      <PickerContainer {...this.props} type="time" component={TimePicker} />
    );
  }
}

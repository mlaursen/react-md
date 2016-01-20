import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import FontIcon from '../FontIcons';
import { PickerContainer } from '../Pickers';
import DatePicker from './DatePicker';

import { DateTimeFormat } from '../utils';

export default class DatePickerContainer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.node,
    defaultValue: PropTypes.string,
    initiallyOpen: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    floatingLabel: PropTypes.bool,
    DateTimeFormat: PropTypes.func.isRequired,
    locales: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    okLabel: PropTypes.string.isRequired,
    okPrimary: PropTypes.bool,
    cancelLabel: PropTypes.string.isRequired,
    cancelPrimary: PropTypes.bool,
    initialCalendarMode: PropTypes.oneOf(['calendar', 'year']),
    previousIcon: PropTypes.node.isRequired,
    nextIcon: PropTypes.node.isRequired,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    autoOk: PropTypes.bool,
    type: PropTypes.oneOf(['date', 'time']),
    initialYearsDisplayed: PropTypes.number,
    inline: PropTypes.bool,
    displayMode: PropTypes.oneOf(['landscape', 'portrait']),
  };

  static defaultProps = {
    initiallyOpen: false,
    previousIcon: <FontIcon>chevron_left</FontIcon>,
    nextIcon: <FontIcon>chevron_right</FontIcon>,
    autoOk: false,
    icon: <FontIcon>date_range</FontIcon>,
    initialYearsDisplayed: 100,
    initialCalendarMode: 'calendar',
    DateTimeFormat: DateTimeFormat,
    locales: navigator.language,
    okLabel: 'Ok',
    okPrimary: true,
    cancelLabel: 'Cancel',
    cancelPrimary: true,
  };

  render() {
    return (
      <PickerContainer {...this.props} type="date" component={DatePicker} />
    );
  }
}

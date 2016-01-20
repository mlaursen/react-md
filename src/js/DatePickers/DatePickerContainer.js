import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import FontIcon from '../FontIcons';
import { PickerContainer } from '../Pickers';
import DatePicker from './DatePicker';

export default class DatePickerContainer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.node,
  };

  static defaultProps = {
    icon: <FontIcon>date_range</FontIcon>,
  };

  render() {
    return (
      <PickerContainer {...this.props} type="date" component={DatePicker} />
    );
  }
}

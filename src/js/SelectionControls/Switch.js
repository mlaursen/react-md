import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Control from './Control';

export default class Switch extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    isInitiallyChecked: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  render() {
    return <Control type="switch" {...this.props} />;
  }
}

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Button from './Button.jsx';

export default class FloatingButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    icon: PropTypes.string.isRequired,
  }

  render() {
    return <Button floating {...this.props} />;
  }
}

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import Button from './Button';

export default class FlatButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    iconBefore: PropTypes.bool,
  };

  static defaultProps = {
    iconBefore: true,
  };

  render() {
    const { className, ...props } = this.props;
    return <Button {...props} className={classnames('md-flat-btn', className)} />;
  }
}

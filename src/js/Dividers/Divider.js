import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class Divider extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    inset: PropTypes.bool,
    vertical: PropTypes.bool,
  };

  render() {
    const { className, inset, vertical, ...props } = this.props;
    const dividerProps = {
      role: 'divider',
      className: classnames('md-divider', className, { inset, vertical }),
      ...props,
    };

    return React.createElement(vertical ? 'div' : 'hr', dividerProps);
  }
}

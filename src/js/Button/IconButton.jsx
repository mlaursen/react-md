import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import FontIcon from '../FontIcon';
import { rippleComponent } from '../utils/Wrappers';

class IconButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { mouseDownTime: null };
  }

  static propTypes = {
    iconClassName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    tooltipPosition: PropTypes.string,
    tooltip: PropTypes.string,
  }

  render() {
    const { iconClassName, children, className, ...props } = this.props;
    const btnProps = {
      ...props,
      className: classnames(className, 'md-btn', 'md-btn-icon'),
    };
    return (
      <button {...btnProps}>
        <FontIcon iconClassName={iconClassName}>{children}</FontIcon>
      </button>
    );
  }
}

export default rippleComponent(true, 1)(IconButton);

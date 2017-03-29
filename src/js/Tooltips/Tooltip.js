import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import TICK from '../constants/CSSTransitionGroupTick';

export default class Tooltip extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    children: PropTypes.node.isRequired,
    enterTimeout: PropTypes.number.isRequired,
    leaveTimeout: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      entering: false,
      leaving: false,
      active: false,
      visible: false,
    };

    this._timeout = null;
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  componentWillEnter(cb) {
    this._timeout = setTimeout(() => {
      this._timeout = setTimeout(() => {
        this._timeout = null;

        cb();
      }, this.props.enterTimeout);
      this.setState({ active: true });
    }, TICK);

    this.setState({ entering: true });
  }

  componentDidEnter() {
    this.setState({ entering: false, active: false, visible: true });
  }

  componentWillLeave(cb) {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(() => {
      this._timeout = setTimeout(() => {
        this._timeout = null;

        cb();
      }, this.props.leaveTimeout);

      this.setState({ active: true, visible: false });
    }, TICK);

    this.setState({ leaving: true });
  }

  render() {
    const { active, entering, leaving, visible } = this.state;
    const { style, className, children, position } = this.props;

    const direction = position === 'top' || position === 'bottom' ? 'horizontal' : 'vertical';
    return (
      <span
        style={style}
        className={cn(`md-tooltip md-tooltip--${position} md-tooltip--${direction}`, {
          'md-tooltip--active': active,
          'md-tooltip--enter': entering,
          'md-tooltip--enter-active': entering && active,
          'md-tooltip--leave': leaving,
          'md-tooltip--leave-active': leaving && active,
          [`md-tooltip--${position}-active`]: visible || (entering && active),
        }, className)}
      >
        {children}
      </span>
    );
  }
}

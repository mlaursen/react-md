import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import TICK from '../constants/CSSTransitionGroupTick';

export default class Ink extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    aborted: PropTypes.bool,
    onRemove: PropTypes.func,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    transitionOverlap: PropTypes.number.isRequired,
    transitionEnterTimeout: PropTypes.number.isRequired,
    transitionLeaveTimeout: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      expanded: false,
      pulsing: false,
      leaving: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.aborted && nextProps.aborted) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }

      if (this._abort) {
        this._abort();
      }

      this.setState({ active: false, expanding: false, pulsing: false, leaving: false });
    }
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  componentWillEnter(cb) {
    if (this.props.aborted) {
      cb();
      return;
    }

    const { transitionOverlap, transitionEnterTimeout } = this.props;
    this._abort = cb;

    this._timeout = setTimeout(() => {
      this._timeout = setTimeout(() => {
        this._timeout = null;
        this._abort = null;

        cb();
      }, transitionEnterTimeout - transitionOverlap);

      this.setState({ expanded: true });
    }, TICK);

    this.setState({ active: true });
  }

  componentDidEnter() {
    this._timeout = setTimeout(() => {
      this._timeout = null;

      this.setState({ pulsing: true });
    }, this.props.transitionEnterTimeout);
  }

  componentWillLeave(cb) {
    if (this.props.aborted) {
      cb();
      return;
    }

    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._abort = cb;
    this._timeout = setTimeout(() => {
      this._timeout = null;

      cb();
    }, this.props.transitionLeaveTimeout);


    this.setState({ pulsing: false, leaving: true });
  }

  componentDidLeave() {
    if (!this.props.aborted && this.props.onRemove) {
      this.props.onRemove();
    }
  }

  render() {
    const {
      style,
      className,
      left,
      top,
      size,
    } = this.props;
    const { active, expanded, pulsing, leaving } = this.state;

    return (
      <span
        style={Object.assign({}, style, {
          left,
          top,
          height: size,
          width: size,
        })}
        className={cn('md-ink', {
          'md-ink--active': active,
          'md-ink--expanded': expanded,
          'md-ink--pulsing': pulsing,
          'md-ink--leaving': leaving,
        }, className)}
      />
    );
  }
}

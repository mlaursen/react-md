import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import { TAB } from '../constants/keyCodes';
import AccessibleFakeButton from '../Helpers/AccessibleFakeButton';

/**
 * This is the `Thumb` for the switch. The `ink` in the Thumb is only active on touch and keyboard
 * interactions, so the `AccessibleFakeInkButton` does not work for this case.
 *
 * This component really just is used for custom inkage.
 */
export default class SwitchThumb extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onKeyUp: PropTypes.func,
    onKeyDown: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = { active: false, expanded: false, leaving: false };
    this._setSwitch = this._setSwitch.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.leaving && nextState.leaving && !this._timeout) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }

      this._timeout = setTimeout(() => {
        this._timeout = null;
        this.setState({ active: false }, () => this.setState({ leaving: false, expanded: false }));
      }, 300);
    }
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    if (this.state.expanded) {
      window.removeEventListener('click', this._handleOutsideClick);
    }
  }

  _setSwitch(switchEl) {
    if (switchEl !== null) { // triggers when unmounting
      this._switch = findDOMNode(switchEl);

      // When testing in jest, it does not exist
      if (this._switch && this._switch.parentNode) {
        this._switch = this._switch.parentNode.parentNode;
      }
    }
  }

  _handleOutsideClick(e) {
    if (!this._switch.contains(e.target)) {
      this.setState({ leaving: true });
    }
  }

  _handleKeyUp(e) {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }

    if ((e.which || e.keyCode) === TAB) {
      window.addEventListener('click', this._handleOutsideClick);
      this.setState({ active: true }, () => this.setState({ expanded: true }));
    }
  }

  _handleKeyDown(e) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    if ((e.which || e.keyCode) === TAB) {
      window.removeEventListener('click', this._handleOutsideClick);
      this.setState({ leaving: true });
    }
  }

  _handleTouchStart(e) {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    this._touchStartTime = Date.now();
    this.setState({ active: true }, () => this.setState({ expanded: true }));
  }

  _handleTouchEnd(e) {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(e);
    }

    const timeDiff = Date.now() - this._touchStartTime;
    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.setState({ leaving: true });
    }, timeDiff > 300 ? 0 : 300 - timeDiff);
  }

  render() {
    const { active, expanded, leaving } = this.state;
    const { disabled, checked, className, ...props } = this.props;
    return (
      <AccessibleFakeButton
        ref={this._setSwitch}
        {...props}
        onKeyUp={this._handleKeyUp}
        onKeyDown={this._handleKeyDown}
        onTouchStart={this._handleTouchStart}
        onTouchEnd={this._handleTouchEnd}
        disabled={disabled}
        className={cn('md-switch-thumb', {
          'md-switch-thumb--disabled': disabled,
          'md-switch-thumb--on': checked,
          'md-switch-thumb--off': !checked,
        }, className)}
      >
        <div className="md-ink-container md-ink-container--switch">
          <span
            className={cn('md-ink', {
              'md-ink--active': active,
              'md-ink--expanded': expanded,
              'md-ink--leaving': leaving,
            })}
          />
        </div>
      </AccessibleFakeButton>
    );
  }
}

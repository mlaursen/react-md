import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import themeColors from '../utils/themeColors';

/**
 * This is a component for rendering a year in the Date Picker's Year picker
 * list.
 */
export default class Year extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    year: PropTypes.number.isRequired,
  };

  state = { desktopActive: false };

  _setActiveFocus = (btn) => {
    if (btn && this.props.active) {
      btn.focus();
    }
  };

  _setActive = () => {
    this.setState({ desktopActive: true });
  };

  _setInactive = () => {
    this.setState({ desktopActive: false });
  };

  _handleClick = (e) => {
    this.props.onClick(this.props.year, e);
  };

  render() {
    const { desktopActive } = this.state;
    const { active, className, year } = this.props;
    return (
      <button
        type="button"
        ref={this._setActiveFocus}
        className={cn('md-year', { 'md-year--active': active }, themeColors({
          text: !active && !desktopActive,
          primary: active || desktopActive,
        }), 'md-btn md-pointer--hover md-full-width', className)}
        onClick={this._handleClick}
      >
        {year}
      </button>
    );
  }
}

import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

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

  constructor(props) {
    super(props);

    this.state = { desktopActive: false };
    this._handleClick = this._handleClick.bind(this);
    this._setActive = this._setActive.bind(this);
    this._setInactive = this._setInactive.bind(this);
  }

  _setActive() {
    this.setState({ desktopActive: true });
  }

  _setInactive() {
    this.setState({ desktopActive: false });
  }

  _handleClick(e) {
    this.props.onClick(this.props.year, e);
  }

  render() {
    const { desktopActive } = this.state;
    const { active, className, year } = this.props;
    return (
      <button
        type="button"
        className={cn('md-btn md-pointer--hover md-full-width md-year', {
          'md-color--text': !active && !desktopActive,
          'md-color--primary': active || desktopActive,
          'md-year--active': active,
        }, className)}
        onClick={this._handleClick}
      >
        {year}
      </button>
    );
  }
}

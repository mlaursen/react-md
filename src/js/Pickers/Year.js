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

    this._handleClick = this._handleClick.bind(this);
  }


  _handleClick(e) {
    this.props.onClick(this.props.year, e);
  }

  render() {
    const { active, className, year } = this.props;
    return (
      <button
        type="button"
        className={cn('md-year', className, { active })}
        onClick={this._handleClick}
      >
        {year}
      </button>
    );
  }
}

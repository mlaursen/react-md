import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

/**
 * This is a component for rendering a year in the Date Picker's Year picker
 * list.
 */
export default class Year extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    year: PropTypes.number.isRequired,
  };

  handleClick = (e) => {
    this.props.onClick(this.props.year, e);
  };

  render() {
    const { active, className, year } = this.props;
    return (
      <button
        type="button"
        className={classnames('md-year', className, { active })}
        onClick={this.handleClick}
      >
        {year}
      </button>
    );
  }
}

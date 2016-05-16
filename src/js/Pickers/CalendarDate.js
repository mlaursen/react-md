import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

/**
 * This component renders a selectable date in the `CalendarMonth` component.
 */
export default class CalendarDate extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = this.getFormattedDate(props);
  }

  static propTypes = {
    className: PropTypes.string,
    date: PropTypes.instanceOf(Date).isRequired,
    DateTimeFormat: PropTypes.func.isRequired,
    locales: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  componentWillUpdate(nextProps) {
    const { DateTimeFormat, locales, date } = this.props;
    if(DateTimeFormat !== nextProps.DateTimeFormat || locales !== nextProps.locales || date !== nextProps.date) {
      this.setState(this.getFormattedDate(nextProps));
    }
  }

  handleClick = (e) => {
    this.props.onClick(new Date(this.props.date), e);
  };

  getFormattedDate = ({ DateTimeFormat, locales, date }) => {
    return {
      date: DateTimeFormat(locales, { day: 'numeric' }).format(date),
    };
  };

  render() {
    const { date } = this.state;
    const { disabled, className } = this.props;
    return (
      <button
        type="button"
        className={classnames('md-calendar-date', className)}
        onClick={this.handleClick}
        disabled={disabled}
      >
        <span className="date">{date}</span>
      </button>
    );
  }
}

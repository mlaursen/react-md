import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class YearPicker extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    const year = props.calendarTempDate.getFullYear();
    const halfed = parseInt(props.initialYearsDisplayed / 2);
    this.state = {
      startYear: props.minDate ? props.minDate.getFullYear() : year - halfed,
      endYear: props.maxDate ? props.maxDate.getFullYear() : year + halfed,
    };
  }

  static propTypes = {
    calendarTempDate: PropTypes.instanceOf(Date).isRequired,
    onCalendarYearClick: PropTypes.func.isRequired,
    initialYearsDisplayed: PropTypes.number.isRequired,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
  };

  componentDidMount() {
    const { container } = this.refs;
    const active = container.querySelector('.md-year.active');

    // Position the active year in the center of the picker
    let scrollTop = active.offsetTop - (container.offsetHeight * 1.5);
    if(container.offsetHeight < container.offsetWidth) {
      // Landscape is off by a bit for some reason
      scrollTop -= (active.offsetHeight / 2);
    }

    container.scrollTop = scrollTop;
  }

  render() {
    const { startYear, endYear } = this.state;

    const currentYear = this.props.calendarTempDate.getFullYear();
    let years = [];
    for(let year = startYear; year <= endYear; year++) {
      years.push(
        <button
          type="button"
          key={`year-${year}`}
          className={classnames('md-year', { 'active': year === currentYear })}
          onClick={this.props.onCalendarYearClick.bind(this, year)}
          >
          {year}
        </button>
      );
    }
    return (
      <section className="md-picker-content md-year-picker" ref="container">
        <ol className="md-years">
          {years}
        </ol>
      </section>
    );
  }
}

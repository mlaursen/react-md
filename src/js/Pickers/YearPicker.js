import React, { PureComponent, PropTypes } from 'react';

import Year from './Year';

/**
 * The `YearPicker` component is the Year view in a `DatePicker`. This
 * will display a list of years to select from within the given range.
 */
export default class YearPicker extends PureComponent {
  static propTypes = {
    calendarTempDate: PropTypes.instanceOf(Date).isRequired,
    onCalendarYearClick: PropTypes.func.isRequired,
    yearsDisplayed: PropTypes.number.isRequired,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
  };

  constructor(props) {
    super(props);

    this.state = this._getYearRange(props);
    this._setContainer = this._setContainer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.yearsDisplayed !== nextProps.yearsDisplayed) {
      this.setState(this._getFullYear(nextProps));
    }
  }

  /**
   * Gets the current start and end years for the year picker.
   *
   * @param {Object} props - The current props to extract the year range from.
   * @return {Object} an object containign the start and end years
   */
  _getYearRange({ minDate, maxDate, yearsDisplayed, calendarTempDate }) {
    const year = calendarTempDate.getFullYear();
    const range = !minDate && !maxDate
      ? parseInt(yearsDisplayed / 2, 10)
      : yearsDisplayed;

    let startYear;
    let endYear;
    if (minDate && maxDate) {
      startYear = minDate.getFullYear();
      endYear = maxDate.getFullYear();
    } else if (!minDate && !maxDate) {
      startYear = year - range;
      endYear = year + range;
      if (yearsDisplayed % 2 === 0) {
        endYear -= 1;
      }
    } else if (!maxDate) {
      startYear = minDate.getFullYear();
      endYear = startYear + yearsDisplayed - 1;
    } else {
      endYear = maxDate.getFullYear();
      startYear = endYear - yearsDisplayed + 1;
    }

    return { startYear, endYear };
  }

  _setContainer(container) {
    if (container === null) {
      return;
    }

    const { offsetHeight, offsetWidth } = container;
    const { offsetTop: top, offsetHeight: height } = container.querySelector('.md-year--active');

    // Portrait seems to be 3/4 of the way while landscape is about 1/2
    if (offsetHeight > offsetWidth) {
      container.scrollTop = top - (offsetHeight * 3 / 4);
    } else {
      container.scrollTop = top - (offsetHeight / 2) + (height / 2);
    }
  }

  render() {
    const { startYear, endYear } = this.state;

    const currentYear = this.props.calendarTempDate.getFullYear();
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(
        <Year
          key={year}
          year={year}
          active={year === currentYear}
          onClick={this.props.onCalendarYearClick}
        />
      );
    }

    return (
      <section className="md-picker-content md-picker-content--year" ref={this._setContainer}>
        <ol className="md-years">
          {years}
        </ol>
      </section>
    );
  }
}

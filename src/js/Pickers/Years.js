import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import DatePickerFooter from './DatePickerFooter';

export default class Years extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      years: this.generateYears(props),
    };
  }

  static propTypes = {
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    initialYearsDisplayed: PropTypes.number,
    onCalendarYearClick: PropTypes.func.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    okLabel: PropTypes.string.isRequired,
    onOkClick: PropTypes.func.isRequired,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
  };

  componentDidMount() {
    setTimeout(() => {
      const { years } = this.refs;
      const { offsetTop } = years.querySelector('.md-year.active');

      years.scrollTop = years.scrollHeight - offsetTop;
    }, 15); // need a better way. right on mount is off by 200px when switching modes
  }

  generateYears = ({ selectedDate, initialYearsDisplayed, minDate, maxDate }) => {
    const currentYear = selectedDate.getFullYear();
    let startYear = minDate ? minDate.getFullYear() : parseInt(currentYear - initialYearsDisplayed / 2);
    let endYear = maxDate ? maxDate.getFullYear() : parseInt(currentYear + initialYearsDisplayed / 2);

    let years = [];
    for(let i = startYear; i <= endYear; i++) {
      years.push(i);
    }
    return years;
  };

  render() {
    const { cancelLabel, onCancelClick, okLabel, onOkClick, selectedDate } = this.props;
    const currentYear = selectedDate.getFullYear();
    return (
      <section className="md-year-picker">
        <ol className="md-years" ref="years">
          {this.state.years.map(year => {
            return (
              <button
                type="button"
                key={`year-${year}`}
                className={classnames('md-year', {
                  'active': year === currentYear,
                })}
                onClick={this.props.onCalendarYearClick.bind(this, year)}
                >
                {year}
              </button>
            );
          })}
        </ol>
        <DatePickerFooter
          cancelLabel={cancelLabel}
          onCancelClick={onCancelClick}
          okLabel={okLabel}
          onOkClick={onOkClick}
        />
      </section>
    );
  }
}

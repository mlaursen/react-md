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
    selectedDate: PropTypes.object.isRequired,
    initialYearsDisplayed: PropTypes.number,
    onCalendarYearClick: PropTypes.func.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    okLabel: PropTypes.string.isRequired,
    onOkClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    initialYearsDisplayed: 20,
  };

  componentDidMount() {
    const { years } = this.refs;
    const { offsetHeight, offsetTop } = years.querySelector('.md-year.active');

    years.scrollTop = offsetTop / 2 - offsetHeight;
  }

  generateYears = ({ selectedDate, initialYearsDisplayed }) => {
    const currentYear = selectedDate.getFullYear();
    return Array.apply(null, new Array(initialYearsDisplayed)).map((_, i) => {
      return currentYear - initialYearsDisplayed / 2 + i;
    });
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

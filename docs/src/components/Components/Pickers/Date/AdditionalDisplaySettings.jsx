import React from 'react';
import { DatePicker } from 'react-md';

const DEFAULT_DATE = new Date(2017, 3, 15, 0, 0, 0);
const TWO_MONTHS_BEFORE = new Date(DEFAULT_DATE);
TWO_MONTHS_BEFORE.setMonth(DEFAULT_DATE.getMonth() - 2);

const ONE_YEAR_AFTER = new Date(DEFAULT_DATE);
ONE_YEAR_AFTER.setYear(DEFAULT_DATE.getFullYear() + 1);

const AdditionalDisplaySettings = () => (
  <div className="md-grid">
    <DatePicker
      id="show-all-days"
      label="Show all days"
      className="md-cell"
      showAllDays
    />
    <DatePicker
      id="show-all-days-disabled-outer"
      label="All days, others disabled"
      className="md-cell"
      showAllDays
      disableOuterDates
    />
    <DatePicker
      id="setting-first-day-of-week"
      label="Custom first day of week"
      className="md-cell"
      showAllDays
      firstDayOfWeek={1}
    />
    <DatePicker
      id="disable-week-ends"
      label="Disable weekends"
      className="md-cell"
      disableWeekEnds
    />
    <DatePicker
      id="date-picker-min-max"
      label="Min and Max Dates"
      className="md-cell"
      defaultValue={DEFAULT_DATE}
      minDate={TWO_MONTHS_BEFORE}
      maxDate={ONE_YEAR_AFTER}
    />
    <DatePicker
      id="date-picker-auto-ok"
      label="Auto OK"
      autoOk
      className="md-cell"
    />
  </div>
);
export default AdditionalDisplaySettings;

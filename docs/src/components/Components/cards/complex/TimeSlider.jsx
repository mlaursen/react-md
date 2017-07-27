/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { CardText } from 'react-md/lib/Cards';
import Slider from 'react-md/lib/Sliders';

const ticks = [...new Array(11)].map((_, i) => (
  <span key={i} className="cards__weather__time-tick" />
));

const TimeSlider = ({ onChange }) => (
  <CardText>
    <Slider id="weather-card-time-slider" defaultValue={7.5} onChange={onChange} max={18} step={0.5} />
    <div className="cards__weather__ticks">
      {ticks}
    </div>
  </CardText>
);

TimeSlider.propTypes = {
  onChange: PropTypes.func,
};
export default TimeSlider;

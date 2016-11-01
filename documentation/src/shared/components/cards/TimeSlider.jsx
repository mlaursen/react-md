import React from 'react';
import cn from 'classnames';
import CardText from 'react-md/lib/Cards/CardText';
import Slider from 'react-md/lib/Sliders';


const ticks = [...new Array(11)].map((_, i) => (
  <span key={i} className={cn('time-tick', { 'time-tick--valued': i % 2 !== 0 })} />
));

const times = [8, 11, 2, 5, 8].map((time, i) => (
  <span
    key={i}
    style={{
      left: `${(i + 1) / 5 * 100 - 10}%`,
    }}
    className="time-value md-color--secondary-text"
  >
    {`${time} ${i > 1 ? 'P' : 'A'}M`}
  </span>
));
const TimeSlider = () => (
  <CardText>
    <Slider id="weatherAtTime" defaultValue={40} />
    <div className="time-ticks">
      {ticks}
      {times}
    </div>
  </CardText>
);

export default TimeSlider;

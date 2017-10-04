import React, { PureComponent } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardText,
  CardTitle,
  List,
  ListItem,
} from 'react-md';

import { CELCIUS } from 'constants/unicode';
import './_styles.scss';
import TimeSlider from './TimeSlider';
import WeatherIcon from './WeatherIcon';
import WeatherTemperatureIcon from './WeatherTemperatureIcon';

const makeWeather = (temperature, wind, rain) => ({ temperature, wind, rain });

/**
 * A really simple _data source_ for getting weather data at a specific time. I'm
 * too lazy to make amazing data and different time points, so it will only update
 * each hour. The hours are also on a 24h scale for simplicity.
 */
const DATA_SOURCE = {
  5: makeWeather(17, 10, 8),
  6: makeWeather(17, 12, 12),
  7: makeWeather(17, 12, 36),
  8: makeWeather(18, 14, 29),
  9: makeWeather(19, 15, 29),
  10: makeWeather(20, 19, 57),
  11: makeWeather(21, 19, 48),
  12: makeWeather(23, 21, 48),
  13: makeWeather(23, 21, 48),
  14: makeWeather(22, 18, 48),
  15: makeWeather(21, 18, 10),
  16: makeWeather(21, 17, 10),
  17: makeWeather(20, 17, 10),
  18: makeWeather(19, 10, 48),
  19: makeWeather(18, 15, 33),
  20: makeWeather(17, 14, 10),
  21: makeWeather(16, 19, 8),
  22: makeWeather(16, 13, 5),
  23: makeWeather(16, 13, 0),
};

export default class WeatherCard extends PureComponent {
  constructor() {
    super();

    this.state = {
      time: null,
      ...DATA_SOURCE[12],
    };
  }

  componentWillMount() {
    let language = 'en-US';
    if (__CLIENT__) {
      language = window.navigator.userLanguage || window.navigator.languages || 'en-US';
    }

    this._formatter = new Intl.DateTimeFormat(language, {
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });

    const today = new Date();
    today.setDate(1);
    today.setSeconds(0);
    today.setMinutes(30);
    today.setHours(12);
    this.setState({ time: today });
  }

  updateWeather = (v) => {
    const value = v + 5;
    const hour = Math.floor(value);
    const minute = value % 1 ? 30 : 0;
    const time = new Date(this.state.time);
    time.setHours(hour);
    time.setMinutes(minute);

    this.setState({ time, ...DATA_SOURCE[hour] });
  };

  render() {
    const { time, temperature, wind, rain } = this.state;
    return (
      <Card className="cards__weather">
        <CardTitle title="San Francisco" subtitle={`${this._formatter.format(time)}, Mostly Sunny`} />
        <CardText className="cards__weather__temperature">
          <h4 className="md-display-4 cards__weather__degrees">{temperature}</h4>
          <h5 className="md-display-2 cards__weather__celcius">{CELCIUS}</h5>
          <WeatherIcon icon="day-cloudy" big />
        </CardText>
        <List>
          <ListItem primaryText={`${wind} km/h`} leftIcon={<WeatherIcon icon="strong-wind" yellow={false} />} />
          <ListItem primaryText={`${rain}%`} leftIcon={<WeatherIcon icon="rain" yellow={false} />} />
        </List>
        <TimeSlider onChange={this.updateWeather} />
        <List ordered className="weather-list">
          <ListItem primaryText="Tuesday" rightIcon={<WeatherTemperatureIcon min={12} max={24} />} />
          <ListItem primaryText="Wednesday" rightIcon={<WeatherTemperatureIcon min={14} max={22} />} />
          <ListItem primaryText="Thursday" rightIcon={<WeatherTemperatureIcon min={15} max={25} sunny={false} />} />
        </List>
        <CardActions className="md-divider-border md-divider-border--top">
          <Button flat secondary>Full Report</Button>
        </CardActions>
      </Card>
    );
  }
}

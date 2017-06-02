import React, { PureComponent } from 'react';
import WebFont from 'webfontloader';
import Button from 'react-md/lib/Buttons/Button';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import CardActions from 'react-md/lib/Cards/CardActions';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import FontIcon from 'react-md/lib/FontIcons';

import './_weather.scss';
import TimeSlider from './TimeSlider';

const degree = '\u00B0';
WebFont.load({
  custom: {
    families: ['WeatherIcons'],
    urls: ['https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css'],
  },
});

function makeIcon(min, max, sunny = true) {
  return [
    <FontIcon
      key="icon"
      iconClassName={`wi wi-day-${sunny ? 'sunny' : 'cloudy'}`}
      className="icon-yellow"
      style={{ marginRight: 24 }}
    />,
    <span key="max" className="md-color--text">{`${max}${degree}`}</span>,
    '/',
    <span key="min" className="md-color--secondary-text">{`${min}${degree}`}</span>,
  ];
}

const tuesday = makeIcon(12, 24);
const wednesday = makeIcon(14, 22);
const thursday = makeIcon(15, 25, false);

export default class CardWeather extends PureComponent {
  render() {
    return (
      <Card className="weather-card">
        <CardTitle title="San Francisico" subtitle="Mon, 12:30 PM, Mostly Sunny" />
        <CardText className="weather-block">
          <h2 className="md-display-4 display-override">23</h2>
          <span className="celcius md-display-2 display-override">{'\u00B0C'}</span>
          <FontIcon iconClassName="wi wi-day-cloudy" className="icon-yellow icon-big" />
        </CardText>
        <List>
          <ListItem
            leftIcon={<FontIcon iconClassName="wi wi-strong-wind" />}
            primaryText="23 km/h"
          />
          <ListItem
            leftIcon={<FontIcon iconClassName="wi wi-rain" />}
            primaryText="48%"
          />
        </List>
        <TimeSlider />
        <List ordered className="weather-list">
          <ListItem primaryText="Tuesday" rightIcon={tuesday} />
          <ListItem primaryText="Wednesday" rightIcon={wednesday} />
          <ListItem primaryText="Thursday" rightIcon={thursday} />
        </List>
        <CardActions className="md-divider-border md-divider-border--top">
          <Button flat secondary>Full Report</Button>
        </CardActions>
      </Card>
    );
  }
}

import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Divider from 'react-md/lib/Dividers';
import { Card, CardMedia, CardTitle, CardActions } from 'react-md/lib/Cards';
import { FlatButton } from 'react-md/lib/Buttons';

import { randomImages } from 'utils/RandomUtils';

const data = [{
  title: 'The Flight',
  subtitle: 'By Scott Masterson',
}, {
  title: 'Room of Plates',
  subtitle: 'By Ali Conners',
}, {
  title: 'The Sleek Boot',
  subtitle: 'By Sandra Adams',
}, {
  title: 'Night Hunting',
  subtitle: 'Janet Perkins',
}, {
  title: 'Rain and Coffee',
  subtitle: 'By Peter Calsson',
}, {
  title: 'Ocean View',
  subtitle: 'By Trevor Hansen',
}, {
  title: 'Lovers on the Roof',
  subtitle: 'By Britta Holt',
}, {
  title: 'Lessons from Delhi',
  subtitle: 'By Mary Johnson',
}, {
  title: 'Mountaineers',
  subtitle: 'By Abbey Christensen',
}, {
  title: 'Plains in the Night',
  subtitle: 'By David Park',
}, {
  title: 'Dear Olivia',
  subtitle: 'By Slyvia S\u00f8rensen',
}, {
  title: 'Driving Lessons',
  subtitle: 'By Halimer Carver',
}];

const imgs = randomImages(data.length, { width: 100, height: 150 });
data.forEach((datum, i) => {
  datum.img = imgs[i];
});

export default class Books extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const cards = data.map(({ img, ...titleProps }, i) => (
      <Card raise={false} key={i} className="book-card">
        <CardMedia forceAspect={false}>
          <img src={img} role="presentation" />
        </CardMedia>
        <div className="action-right">
          <CardTitle {...titleProps} />
          <Divider />
          <CardActions>
            <FlatButton label="Free Sample" primary />
            <FlatButton label="Review" primary />
          </CardActions>
        </div>
      </Card>
    ));

    return (
      <section className="md-card-list books">
        {cards}
      </section>
    );
  }
}

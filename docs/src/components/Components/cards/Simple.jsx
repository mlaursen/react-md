import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import Slider from 'react-md/lib/Sliders';

const style = { maxWidth: 320 };

const Simple = () => (
  <Card style={style} className="md-block-centered">
    <CardTitle title="Using CardTitle" subtitle="With CardText" />
    <CardText>
      <p>
        The <code>CardText</code> component is really just usefull for displaying any
        content with some additional padding.
      </p>
      <Slider id="example-card-slider" />
    </CardText>
  </Card>
);

export default Simple;

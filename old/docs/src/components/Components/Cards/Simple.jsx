import React from 'react';
import { Card, CardTitle, CardText, Slider } from 'react-md';

const style = { maxWidth: 320 };

const Simple = () => (
  <Card style={style} className="md-block-centered">
    <CardTitle title="Using CardTitle" subtitle="With CardText" />
    <CardText>
      <p>
        The <code>CardText</code> component is really just useful for displaying any
        content with some additional padding.
      </p>
      <Slider id="example-card-slider" />
    </CardText>
  </Card>
);

export default Simple;

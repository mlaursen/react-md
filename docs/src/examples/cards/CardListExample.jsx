import React from 'react';
import { Card, CardMedia, CardTitle, CardActions } from 'react-md/lib/Cards';
import Button from 'react-md/lib/Buttons';

import { randomImage } from 'utils/RandomUtils';

const CardListExample = () => {
  const cards = Array.apply(null, new Array(10)).map((_, i) => (
    <Card key={i} className="md-cell md-cell--2 md-cell--4-tablet">
      <CardMedia
        aspectRatio={CardMedia.aspect.equal}
        overlay={<CardTitle title="Title" />}
      >
        <img
          className="md-media-embedded"
          src={randomImage({ width: 220, time: i })}
          role="presentation"
        />
      </CardMedia>
      <CardActions centered>
        <Button icon>favorite</Button>
        <Button icon>bookmark</Button>
        <Button icon>reply</Button>
      </CardActions>
    </Card>
  ));

  return (
    <div className="md-grid">
      {cards}
    </div>
  );
};

export default CardListExample;

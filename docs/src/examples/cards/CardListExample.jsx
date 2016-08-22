import React from 'react';
import { Card, CardMedia, CardTitle, CardActions } from 'react-md/lib/Cards';
import { IconButton } from 'react-md/lib/Buttons';

import { randomImage } from 'utils/RandomUtils';

const CardListExample = () => {
  const cards = Array.apply(null, new Array(10)).map((_, i) => (
    <Card key={i} className="demo-list-card">
      <CardMedia
        aspectRatio={CardMedia.aspect.equal}
        overlay={<CardTitle title="Title" />}
      >
        <img
          src={randomImage({ width: 220, time: i })}
          role="presentation"
        />
      </CardMedia>
      <CardActions centered>
        <IconButton>favorite</IconButton>
        <IconButton>bookmark</IconButton>
        <IconButton>reply</IconButton>
      </CardActions>
    </Card>
  ));

  return (
    <div className="md-card-list">
      {cards}
    </div>
  );
};

export default CardListExample;
